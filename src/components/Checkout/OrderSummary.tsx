'use client';

import Image from 'next/image';
import FallBackImage from '@/components/shared/FallBackImage';
import type { CartItem } from '@/atoms/cartAtom';
import type { CartTotals } from '@/Api/Apis';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedShippingOptionAtom } from '@/atoms/shippingAtom';
import Button from '../shared/Button';
import { appliedDiscountIdsAtom, appliedDiscountsAtom } from '@/atoms/discountAtom';
import { selectedAddressesAtom } from '@/atoms/checkoutSelectionAtom';
import type { CheckoutContactFormData } from '@/components/Checkout/ContactSection.schema';
import { versapayCardSummaryAtom, versapayTokenAtom, versapayValidAtom } from '@/atoms/paymentAtom';
import { useEffect, useState } from 'react';
import { processVersapayPayment } from '@/Api/Apis';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { cartAtom } from '@/atoms/cartAtom';
import { selectedStoreAtom } from '@/atoms/storeAtom';

type OrderSummaryProps = {
    cart: CartItem[];
    totals?: CartTotals;
    isLoading: boolean;
    hasShippingOrDelivery: boolean;
    hasShipping: boolean;
    hasDelivery: boolean;
    totalsError?: Error | null;
    onTotalsErrorDetails?: () => void;
    contact?: CheckoutContactFormData | null;
    allCompleted?: boolean;
    cap?: number;
};

export default function OrderSummary({
    cart,
    totals,
    isLoading,
    hasShippingOrDelivery,
    hasShipping,
    hasDelivery,
    totalsError,
    onTotalsErrorDetails,
    contact,
    allCompleted = false,
    cap = 5,
}: OrderSummaryProps) {
    const selectedShipping = useAtomValue(selectedShippingOptionAtom);
    const discountIds = useAtomValue(appliedDiscountIdsAtom);
    const selectedAddresses = useAtomValue(selectedAddressesAtom);
    const versapayToken = useAtomValue(versapayTokenAtom);
    const versapayValid = useAtomValue(versapayValidAtom);
    const storeAddressId = useAtomValue(selectedStoreAtom);
    const setCart = useSetAtom(cartAtom);
    const setSelectedShipping = useSetAtom(selectedShippingOptionAtom);
    const setAppliedDiscounts = useSetAtom(appliedDiscountsAtom);
    const setSelectedAddresses = useSetAtom(selectedAddressesAtom);
    const setVersapayToken = useSetAtom(versapayTokenAtom);
    const setVersapayValid = useSetAtom(versapayValidAtom);
    const setVersapaySummary = useSetAtom(versapayCardSummaryAtom);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // Clear any selected shipping option if no items require shipping
    useEffect(() => {
        if (!hasShipping && selectedShipping) {
            setSelectedShipping(null);
        }
    }, [hasShipping, selectedShipping, setSelectedShipping]);

    const handlePlaceOrder = async () => {
        const items = cart.map((ci) => ({
            quantity: ci.quantity,
            product: { productVariantId: ci.variant._id },
            fulfillmentMethod: ci.fulfillmentMethod ?? 'pickup',
        }));

        const shipping = selectedAddresses?.shipping;
        const billing = selectedAddresses?.billing ?? (selectedAddresses?.billingSameAsShipping ? selectedAddresses?.shipping : undefined);

        // For pickup orders, we need minimal billing address for payment processing
        // Use contact info if no explicit billing address


        // Build the order payload matching the backend DTO structure
        const payload = {
            // Profile type
            profileType: 'personal',

            // User information
            firstName: contact?.firstName,
            lastName: contact?.lastName,
            email: contact?.email,
            phone: contact?.phoneNumber,

            // Address information (only for shipping orders)
            country: shipping?.country ?? 'CA',
            province: shipping?.state,
            city: shipping?.city,
            address: shipping ? `${shipping.streetAddress}${shipping.streetAddress2 ? `, ${shipping.streetAddress2}` : ''}` : undefined,
            zipCode: shipping?.zipCode,

            // Billing address - always include for payment processing
            billingCountry: billing?.country,
            billingProvince: billing?.state,
            billingCity: billing?.city,
            billingAddress: billing?.streetAddress,
            billingZipCode: billing?.zipCode,

            // Order details
            selectedProducts: items,
            bundles: [],
            customProducts: [],
            discountsApplied: discountIds.map(id => ({ _id: id })),
            shippingOption: selectedShipping ? {
                carrierCode: selectedShipping.carrierCode,
                serviceCode: selectedShipping.serviceCode,
                metadata: selectedShipping.metadata,
                objectId: selectedShipping.objectId,
                shipmentGateway: selectedShipping.shipmentGateway,
                version: selectedShipping.version,
            } : undefined,


            // Payment information
            // Use 'Card' for VersaPay payments as it's a card-based gateway
            orderPaymentMethod: versapayValid ? 'Card' : 'Cash',
            // Pass payment provider so backend knows to skip Stripe-specific logic for VersaPay
            paymentProvider: versapayValid ? 'Versapay' : undefined,
            isSameAsShipping: selectedAddresses?.billingSameAsShipping ?? true,
            pickupAddressId: storeAddressId
        };


        setIsProcessing(true);

        try {
            // Import CreateGuestOrder dynamically to avoid SSR issues
            const { CreateGuestOrder } = await import('@/Api/Apis');

            // Create the order first
            const order = await CreateGuestOrder(payload);

            if (!order?._id) {
                throw new Error('Failed to create order - no order ID returned');
            }


            // If VersaPay payment is selected and token is available, process payment
            if (versapayValid && versapayToken) {
                // The backend automatically calculates the amount from the order
                // and fetches billing address if not provided
                const paymentResult = await processVersapayPayment(
                    versapayToken,
                    order._id,
                );

                if (!paymentResult.success) {
                    throw new Error(paymentResult.message || 'VersaPay payment failed');
                }

                // For VersaPay, payment is processed via webhook
                // If the result indicates pending, show appropriate message
                if (paymentResult.data?.pending) {
                    toast.info('Payment submitted. Confirming your order...');
                } else {
                    toast.success('Order placed successfully!');
                }
            } else {
                // Non-VersaPay payment (e.g., Cash)
                toast.success('Order placed successfully!');
            }

            // Redirect to order confirmation page
            // The order page will show the current order status
            router.push(`/order/${order._id}`);

        } catch (error: any) {
            console.error('Error placing order:', error);

            // IMPORTANT: Clear VersaPay token after any error
            // VersaPay tokens are single-use, so we must clear it to force re-validation
            // This prevents "Duplicate transaction" errors on retry
            setVersapayToken(null);
            setVersapayValid(false);
            setVersapaySummary(null);

            // Show appropriate error message
            const errorMessage = error?.message || 'Failed to place order. Please try again.';
            if (errorMessage.includes('Duplicate') || errorMessage.includes('Token')) {
                toast.error('Please re-enter your card details and try again.');
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setIsProcessing(false);
        }
    };
    return (
        <div className="flex-1 sticky top-[2rem] h-fit p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[1rem]">
            <h2 className="text-[1.125rem] font-semibold">Order Summary</h2>

            <div className="flex flex-col gap-[0.75rem]">
                {cart.slice(0, cap).map((item: CartItem) => (
                    <div key={`${item.variant._id}-${item.fulfillmentMethod ?? 'none'}`} className="flex items-center gap-[0.75rem]">
                        <div className="relative h-14 w-14 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] overflow-hidden bg-white">
                            {item.variant.productMedia[0]?.file ? (
                                <Image
                                    src={item.variant.productMedia[0].file}
                                    alt={item.variant.name}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <FallBackImage />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[0.95rem] font-medium truncate">{item.variant.name}</p>
                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-600)]">
                                SKU: <span className="!text-black font-normal">{item.variant.sku}</span>
                            </p>
                            {item.variant.attribute ? (
                                <div className="flex flex-wrap gap-x-2">
                                    {Object.entries(item.variant.attribute).map(([key, value]) => (
                                        <p key={key} className="text-[0.75rem] text-[var(--Colors-Neutral-700)]">
                                            {key}: {String(value)}
                                        </p>
                                    ))}
                                </div>
                            ) : null}
                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-600)]">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-[0.95rem] font-semibold">
                            ${Number(item.variant.finalPrice ?? 0).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            {!totalsError ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-[var(--Colors-Neutral-100)]">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Subtotal</span>
                        {isLoading ? (
                            <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                        ) : (
                            <span className="text-sm font-medium">
                                ${(((totals?.subTotal ?? 0) + (totals?.subTotalDiscount ?? 0))).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {(totals?.subTotalDiscount ?? 0) > 0 ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Discount</span>
                            <span className="text-sm font-medium">-${(totals?.subTotalDiscount ?? 0).toFixed(2)}</span>
                        </div>
                    ) : null}


                    {hasDelivery ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Delivery</span>
                            <span className="text-sm font-medium">
                                {isLoading ? (
                                    <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                ) : (
                                    totals?.deliveryCosts && `$${totals?.deliveryCosts.toFixed(2)}`
                                )}
                            </span>
                        </div>
                    ) : null}

                    {hasShipping ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Shipping</span>
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : selectedShipping ? (
                                <span className="text-sm font-medium">${Number(selectedShipping.price ?? 0).toFixed(2)}</span>
                            ) : (
                                <span className="text-sm font-medium text-[var(--Colors-Neutral-600)]">Choose Shipping Option</span>
                            )}
                        </div>
                    ) : null}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Taxes</span>
                        <span className="text-sm font-medium">
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                totals?.taxAmount ? `$${totals?.taxAmount.toFixed(2)}` : 'Calculated at checkout'
                            )}
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--Colors-Neutral-100)]">
                        <span className="text-base font-bold">Total</span>
                        <span className="text-base font-bold">
                            ${Number(((totals?.subTotal ?? 0) + (totals?.taxAmount ?? 0) + (totals?.deliveryCosts ?? 0) + (hasShipping ? (selectedShipping?.price ?? 0) : 0))).toFixed(2)}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-[var(--Colors-Neutral-100)]">
                    <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-4 text-[0.95rem] text-[var(--Colors-Error-600)]">
                        An error occurred while calculating totals.
                        {onTotalsErrorDetails ? (
                            <button
                                type="button"
                                className="ml-2 underline text-[var(--primary-600-main)] cursor-pointer"
                                onClick={onTotalsErrorDetails}
                            >
                                View more
                            </button>
                        ) : null}
                    </div>
                </div>
            )}

            <Button
                variant="primary"
                size="small"
                onClick={handlePlaceOrder}
                disabled={isLoading || !!totalsError || isProcessing || !allCompleted}
            >
                {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
        </div>
    );
}


