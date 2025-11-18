'use client';

import { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { cartAtom } from '@/atoms/cartAtom';
import FulfillmentItem from './FulfillmentItem';
import { useQuery } from '@tanstack/react-query';
import { fetchShippingOptions, type ShippingOption } from '@/Api/Apis';
import { useSetAtom, useAtom, useAtomValue as useJotaiAtomValue } from 'jotai';
import { selectedShippingOptionAtom } from '@/atoms/shippingAtom';
import ErrorModal from '@/components/shared/ErrorModal';
import Image from 'next/image';
import { selectedAddressesAtom } from '@/atoms/checkoutSelectionAtom';
import { toast } from 'react-toastify';
import Button from '../shared/Button';

type FulfillmentSectionProps = {
    isCompleted: boolean;
    onComplete: () => void;
    setOpenById: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    selectedShippingAddress?: SavedAddress | null;
};

export default function FulfillmentSection({ isCompleted, onComplete, setOpenById, selectedShippingAddress }: FulfillmentSectionProps) {
    const cart = useAtomValue(cartAtom);
    const shippingItems = useMemo(() => cart.filter(ci => ci.fulfillmentMethod === 'shipping'), [cart]);
    const deliveryItems = useMemo(() => cart.filter(ci => ci.fulfillmentMethod === 'delivery'), [cart]);
    const pickupItems = useMemo(() => cart.filter(ci => ci.fulfillmentMethod === 'pickup'), [cart]);

    const handleProceedToPayment = () => {
        // Require shipping option selection when there are shipping items
        if (shippingItems.length > 0 && !selectedOption) {
            toast.error('Please choose a shipping option to continue.');
            return;
        }
        onComplete();
        setOpenById((prev) => ({ ...prev, payment: true }));
    };

    const [selectedOption, setSelectedOption] = useAtom(selectedShippingOptionAtom);
    const [errorOpen, setErrorOpen] = useState(false);
    const selectedAddresses = useJotaiAtomValue(selectedAddressesAtom);
    const effectiveShippingAddress = selectedShippingAddress ?? selectedAddresses?.shipping ?? null;

    const requestBody = useMemo(() => {
        if (!effectiveShippingAddress || shippingItems.length === 0) return null;
        const addressLine = [effectiveShippingAddress.streetAddress, effectiveShippingAddress.streetAddress2].filter(Boolean).join(' ');
        return {
            selectedProducts: shippingItems.map((item) => ({
                quantity: item.quantity,
                product: { productVariantId: item.variant._id },
            })),
            address: {
                address: addressLine,
                city: effectiveShippingAddress.city,
                country: effectiveShippingAddress.country,
                province: effectiveShippingAddress.state,
                zipCode: String(effectiveShippingAddress.zipCode ?? '').replace(/\s/g, ''),
                name: effectiveShippingAddress.label,
            },
        };
    }, [effectiveShippingAddress, shippingItems]);
    const shippingQuery = useQuery({
        queryKey: ['shippingOptions', requestBody],
        queryFn: async () => {
            if (!requestBody) return [] as ShippingOption[];
            return fetchShippingOptions(requestBody);
        },
        enabled: !!requestBody,
        refetchOnWindowFocus: false,
        retry: 0,
    });

    const showAddressNotice = shippingItems.length > 0 && !effectiveShippingAddress;

    return (
        <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[1.5rem]">
            {shippingItems.length > 0 ? (
                <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                    <div className="pb-[0.75rem] mb-[0.75rem] border-b border-[var(--Colors-Neutral-100)]">
                        <h3 className="text-[1.25rem] font-semibold text-black">Shipping</h3>
                    </div>
                    <div className="flex flex-col gap-[0.75rem]">
                        {shippingItems.map((item) => (
                            <FulfillmentItem key={`${item.variant._id}-ship`} item={item} />
                        ))}
                    </div>

                    {/* Shipping options chooser */}
                    <div className="mt-[1rem]">
                        {showAddressNotice ? (
                            <div className="rounded-[var(--Radius-xs)] border border-dashed border-[var(--Colors-Neutral-200)] p-4 text-[0.95rem] text-[var(--Colors-Neutral-700)]">
                                Please choose an address to fetch your shipping options.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {shippingQuery.isLoading ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <div key={idx} className="h-24 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] bg-[var(--Colors-Neutral-50)] animate-pulse" />
                                        ))}
                                    </div>
                                ) : shippingQuery.isError ? (
                                    <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-4 text-[0.95rem] text-[var(--Colors-Error-600)]">
                                        Failed to load shipping options.
                                        <button
                                            type="button"
                                            className="ml-2 underline text-[var(--primary-600-main)] cursor-pointer"
                                            onClick={() => setErrorOpen(true)}
                                        >
                                            View details
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-3 underline text-[var(--primary-600-main)] cursor-pointer"
                                            onClick={() => shippingQuery.refetch()}
                                        >
                                            Retry
                                        </button>
                                    </div>
                                ) : (shippingQuery.data?.length ?? 0) === 0 ? (
                                    <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-4 text-[0.95rem] text-[var(--Colors-Neutral-700)]">
                                        No shipping options available for the selected location.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {shippingQuery.data?.map((opt) => {
                                            const isSelected = selectedOption?.objectId === opt.objectId;
                                            return (
                                                <button
                                                    key={opt.objectId}
                                                    type="button"
                                                    onClick={() => setSelectedOption(isSelected ? null : opt)}
                                                    className={`cursor-pointer text-left rounded-[var(--Radius-xs)] border p-3 flex flex-col gap-2 transition-colors ${isSelected ? 'border-[var(--primary-600-main)] bg-[var(--primary-50-main)]' : 'border-[var(--Colors-Neutral-100)] bg-white hover:bg-[var(--Colors-Neutral-50)]'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {opt.image ? (
                                                            <div className="relative h-6 w-6 overflow-hidden">
                                                                <Image src={opt.image} alt={opt.name} fill className="object-contain" />
                                                            </div>
                                                        ) : null}
                                                        <span className="font-semibold">{opt.name}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-[0.9rem]">
                                                        <span className="font-medium">${Number(opt.price ?? 0).toFixed(2)}</span>
                                                        <span className="text-[var(--Colors-Neutral-700)]">{opt.estimatedDays} days</span>
                                                    </div>
                                                    {opt.duration ? (
                                                        <div className="text-[0.75rem] text-[var(--Colors-Neutral-600)]">{opt.duration}</div>
                                                    ) : null}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            {deliveryItems.length > 0 ? (
                <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                    <div className="pb-[0.75rem] mb-[0.75rem] border-b border-[var(--Colors-Neutral-100)]">
                        <h3 className="text-[1.25rem] font-semibold text-black">Delivery</h3>
                    </div>
                    <div className="flex flex-col gap-[0.75rem]">
                        {deliveryItems.map((item) => (
                            <FulfillmentItem key={`${item.variant._id}-del`} item={item} />
                        ))}
                    </div>
                </div>
            ) : null}

            {pickupItems.length > 0 ? (
                <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                    <div className="pb-[0.75rem] mb-[0.75rem] border-b border-[var(--Colors-Neutral-100)]">
                        <h3 className="text-[1.25rem] font-semibold text-black">Pickup</h3>
                    </div>
                    <div className="flex flex-col gap-[0.75rem]">
                        {pickupItems.map((item) => (
                            <FulfillmentItem key={`${item.variant._id}-pick`} item={item} />
                        ))}
                    </div>
                </div>
            ) : null}

            {!isCompleted ? (
                <div className="mt-1">
                    <button
                        type="button"
                        onClick={onComplete}
                        className="px-3 py-2 rounded-md bg-[var(--primary-600-main)] text-white text-sm"
                    >
                        Mark Fulfillment Complete
                    </button>
                </div>
            ) : null}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    variant="primary"
                    size="small"
                    onClick={handleProceedToPayment}
                >
                    Proceed to Payment
                </Button>
            </div>

            {/* Error modal for shipping options */}
            <ErrorModal
                open={errorOpen}
                onClose={() => setErrorOpen(false)}
                title="Shipping Options Error"
                message={shippingQuery.error instanceof Error ? shippingQuery.error.message : 'No shipping options available for the selected location.'}
            />
        </div>
    );
}


