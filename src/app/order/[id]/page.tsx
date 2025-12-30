'use client';

import { fetchOrderById } from "@/Api/Apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "@/atoms/cartAtom";
import { selectedShippingOptionAtom } from "@/atoms/shippingAtom";
import { appliedDiscountsAtom } from "@/atoms/discountAtom";
import { selectedAddressesAtom } from "@/atoms/checkoutSelectionAtom";
import { versapayCardSummaryAtom, versapayTokenAtom, versapayValidAtom } from "@/atoms/paymentAtom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { checkoutContactEmailAtom } from "@/atoms/checkoutAtom";
import { useParams } from "next/navigation";
import Image from "next/image";
import FallBackImage from "@/components/shared/FallBackImage";
import Button from "@/components/shared/Button";
import Rating from "@mui/material/Rating";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { LuPhone, LuMapPin, LuMap } from "react-icons/lu";
import router from "next/router";

export default function OrderPage() {
    const { id } = useParams() as { id: string };
    const contactEmail = useAtomValue(checkoutContactEmailAtom) ?? '';

    // Reset checkout-related state after arriving on the order page
    const setCart = useSetAtom(cartAtom);
    const setSelectedShipping = useSetAtom(selectedShippingOptionAtom);
    const setAppliedDiscounts = useSetAtom(appliedDiscountsAtom);
    const setSelectedAddresses = useSetAtom(selectedAddressesAtom);
    const setVersapayToken = useSetAtom(versapayTokenAtom);
    const setVersapayValid = useSetAtom(versapayValidAtom);
    const setVersapaySummary = useSetAtom(versapayCardSummaryAtom);
    const [reviewRating, setReviewRating] = useState<number | null>(null);

    useEffect(() => {
        try {
            setCart([]);
            setSelectedShipping(null);
            setAppliedDiscounts([]);
            setSelectedAddresses(null);
            setVersapayToken(null);
            setVersapayValid(false);
            setVersapaySummary(null);
        } catch {
        }
    }, []);

    const {
        data: fetchedOrder,
        isLoading: isOrderLoading,
        isError,
    } = useQuery({
        queryKey: ['order', id, contactEmail],
        queryFn: () =>
            fetchOrderById(id as string, contactEmail),
        enabled: Boolean(id) && String(contactEmail).trim() !== '',
        // Poll every 2 seconds while payment is pending (waiting for webhook)
        refetchInterval: (query) => {
            const order = query.state.data;
            // Keep polling if order exists but payment is not yet confirmed
            // Order starts as PENDING, then moves to IN_FULFILLMENT after payment webhook
            if (order && !order.payment) {
                return 2000; // Poll every 2 seconds
            }
            return false; // Stop polling once payment exists
        },
    });

    const groupedItems = useMemo(() => {
        const groups: Record<string, OrderItem[]> = {
            pickup: [],
            delivery: [],
            shipping: [],
            undefined: [],
        };
        (fetchedOrder?.items ?? []).forEach((it) => {
            const key = (it.fulfillmentMethod as keyof typeof groups) ?? 'undefined';
            if (key in groups) {
                groups[key].push(it);
            } else {
                groups.undefined.push(it);
            }
        });
        return groups;
    }, [fetchedOrder?.items]);

    const hasAnyShipping = useMemo(
        () => (fetchedOrder?.items ?? []).some((it) => it.fulfillmentMethod === 'shipping'),
        [fetchedOrder?.items]
    );
    const hasAnyDelivery = useMemo(
        () => (fetchedOrder?.items ?? []).some((it) => it.fulfillmentMethod === 'delivery'),
        [fetchedOrder?.items]
    );
    const hasAnyPickup = useMemo(
        () => (fetchedOrder?.items ?? []).some((it) => it.fulfillmentMethod === 'pickup'),
        [fetchedOrder?.items]
    );

    const money = (val?: number) => `$${Number(val ?? 0).toFixed(2)}`;

    function SkeletonLine({ className = "" }: { className?: string }) {
        return <div className={`animate-pulse rounded bg-[var(--Colors-Neutral-100)] ${className}`} />;
    }

    function HeaderSkeleton() {
        return (
            <div className="flex flex-col items-center justify-center gap-[1rem]">
                <div className="h-16 w-16 rounded-full bg-[var(--Colors-Neutral-100)] animate-pulse" />
                <SkeletonLine className="h-5 w-40" />
                <SkeletonLine className="h-8 w-[70%] max-w-[30rem]" />
                <SkeletonLine className="h-4 w-[80%] max-w-[40rem]" />
                <SkeletonLine className="h-4 w-[70%] max-w-[32rem]" />
                <div className="h-10 w-44 rounded bg-[var(--primary-500-main)]/20 animate-pulse" />
            </div>
        );
    }

    function ItemRowSkeleton() {
        return (
            <div className="flex items-start gap-[0.75rem] rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-[0.75rem] bg-white">
                <div className="h-14 w-14 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] bg-[var(--Colors-Neutral-100)] animate-pulse shrink-0" />
                <div className="flex-1 flex items-start justify-between gap-[0.5rem] min-w-0">
                    <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
                        <SkeletonLine className="h-4 w-[70%]" />
                        <SkeletonLine className="h-3 w-[40%]" />
                        <SkeletonLine className="h-3 w-[60%]" />
                    </div>
                    <div className="flex flex-col items-end gap-[0.4rem] shrink-0">
                        <SkeletonLine className="h-3 w-12" />
                        <SkeletonLine className="h-4 w-16" />
                    </div>
                </div>
            </div>
        );
    }

    function ItemsSkeleton() {
        return (
            <section className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                <div className="mb-[0.75rem]">
                    <SkeletonLine className="h-5 w-28" />
                </div>
                <div className="flex flex-col gap-[0.75rem]">
                    <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)]">
                        <header className="flex items-center justify-between gap-[0.75rem] p-[0.75rem]">
                            <SkeletonLine className="h-4 w-28" />
                            <SkeletonLine className="h-4 w-16" />
                        </header>
                        <div className="p-[0.75rem] border-t border-[var(--Colors-Neutral-100)] flex flex-col gap-[0.75rem]">
                            <ItemRowSkeleton />
                            <ItemRowSkeleton />
                            <ItemRowSkeleton />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    function OrderSummarySkeleton() {
        return (
            <div className="flex-1 sticky top-[2rem] h-fit p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[1rem]">
                <SkeletonLine className="h-5 w-40" />
                <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between">
                        <SkeletonLine className="h-4 w-24" />
                        <SkeletonLine className="h-4 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                        <SkeletonLine className="h-4 w-24" />
                        <SkeletonLine className="h-4 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                        <SkeletonLine className="h-4 w-16" />
                        <SkeletonLine className="h-4 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                        <SkeletonLine className="h-4 w-20" />
                        <SkeletonLine className="h-4 w-16" />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--Colors-Neutral-100)]">
                        <SkeletonLine className="h-5 w-16" />
                        <SkeletonLine className="h-5 w-20" />
                    </div>
                </div>
            </div>
        );
    }

    function FulfillmentSkeleton() {
        return (
            <section className="order-1 lg:order-2 flex-1 p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[0.75rem]">
                <SkeletonLine className="h-5 w-40" />
                <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-[0.75rem] flex flex-col gap-[0.75rem]">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <SkeletonLine className="h-6 w-10" />
                            <SkeletonLine className="h-4 w-40" />
                        </div>
                        <div className="flex items-center gap-3">
                            <SkeletonLine className="h-4 w-16" />
                            <SkeletonLine className="h-4 w-20" />
                        </div>
                    </div>
                    <div className="border-t border-[var(--Colors-Neutral-100)] pt-[0.75rem]">
                        <div className="grid grid-cols-1 gap-[0.5rem] sm:grid-cols-2">
                            <SkeletonLine className="h-9 w-full rounded-xl" />
                            <SkeletonLine className="h-9 w-full rounded-xl" />
                            <SkeletonLine className="h-9 w-full rounded-xl" />
                            <SkeletonLine className="h-9 w-full rounded-xl" />
                            <SkeletonLine className="h-9 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    function RatingSkeleton() {
        return (
            <section className="order-2 lg:order-1 flex-1 p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col items-center gap-[1rem]">
                <SkeletonLine className="h-6 w-[80%] max-w-[28rem]" />
                <div className="flex items-center justify-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    <div className="h-10 w-10 rounded-full bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    <div className="h-10 w-10 rounded-full bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    <div className="h-10 w-10 rounded-full bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    <div className="h-10 w-10 rounded-full bg-[var(--Colors-Neutral-100)] animate-pulse" />
                </div>
                <div className="h-10 w-32 rounded bg-[var(--primary-500-main)]/20 animate-pulse" />
            </section>
        );
    }

    const isPending = isOrderLoading || !fetchedOrder;

    // Check if payment is still being processed (waiting for webhook)
    // Payment is pending if order exists but has no payment record yet
    const isPaymentPending = fetchedOrder && !fetchedOrder.payment;

    if (isPending) {
        return (
            <div className="baseContainer py-[2.5rem]">
                <div className="maxWidth flex flex-col gap-[2rem]">
                    <HeaderSkeleton />

                    <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                        <div className="flex-[2] flex flex-col gap-[1rem]">
                            <ItemsSkeleton />
                        </div>
                        <aside className="w-full lg:w-[28rem] flex-shrink-0">
                            <OrderSummarySkeleton />
                        </aside>
                    </div>

                    <div className="border-t border-[var(--Colors-Neutral-100)]" />

                    <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                        <RatingSkeleton />
                        <FulfillmentSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="maxWidth flex flex-col gap-[2rem]">
                <div className="flex flex-col items-center justify-center gap-[1rem]">
                    {isPaymentPending ? (
                        <>
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--primary-500-main)] border-t-transparent" />
                            <div className="flex items-center justify-center gap-[1rem]">
                                <div className="flex items-center justify-center gap-[0.5rem]">
                                    <p className="text-[1.25rem] text-[var(--Colors-Neutral-700)]">Order ID</p>
                                    <p className="text-[1rem] text-[var(--primary-500-main)]">{fetchedOrder?.reducedId}</p>
                                </div>
                            </div>
                            <h1 className="text-[2.5rem] font-bold text-center">Processing Payment...</h1>
                            <p className="text-[var(--Colors-Neutral-500)] w-[90%] text-center lg:w-[60%]">
                                Your payment is being processed. This usually takes just a few seconds. Please don&apos;t close this page.
                            </p>
                        </>
                    ) : (
                        <>
                            <IoIosCheckmarkCircleOutline className="text-[4rem] text-[var(  --secondary-500-main)]" />
                            <div className="flex items-center justify-center gap-[1rem]">
                                <div className="flex items-center justify-center gap-[0.5rem]">
                                    <p className="text-[1.25rem] text-[var(--Colors-Neutral-700)] ">Order ID</p>
                                    <p className="text-[1rem] text-[var(--primary-500-main)]">{fetchedOrder?.reducedId}</p>
                                </div>
                            </div>
                            <h1 className="text-[2.5rem] font-bold text-center">Thank you for the order </h1>
                            <p className="text-[var(--Colors-Neutral-500)] w-[90%] text-center lg:w-[60%]">Thank you for your purchase! Your payment has been successfully processed, and your order is now being prepared for delivery. We appreciate your trust in Home Central Stores.</p>
                            <p className="text-[var(--Colors-Neutral-500)] w-[90%] text-center lg:w-[60%]">We have sent the order confirmation details to <span className="text-[black]  font-medium">{contactEmail}</span>.</p>
                            <Button variant="primary" href="/shop/catalogue">Continue Shopping</Button>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                    <div className="flex-[2] flex flex-col gap-[1rem]">
                        <section className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                            <h2 className="text-[1.125rem] font-semibold mb-[0.75rem]">
                                Items <span className="text-[0.95rem] font-normal text-[var(--Colors-Neutral-600)]">({fetchedOrder?.items?.length ?? 0})</span>
                            </h2>

                            <div className="flex flex-col gap-[0.75rem]">
                                {(['pickup', 'delivery', 'shipping', 'undefined'] as const).map((key) => {
                                    const items = groupedItems[key] ?? [];
                                    if (!items.length) return null;
                                    const title =
                                        key === 'pickup' ? 'Pickup' :
                                            key === 'delivery' ? 'Delivery' :
                                                key === 'shipping' ? 'Shipping' : 'Unspecified';
                                    return (
                                        <section key={key} className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)]">
                                            <header className="flex items-center justify-between gap-[0.75rem] p-[0.75rem]">
                                                <span className="text-[0.95rem] font-medium">{title} Items</span>
                                                <span className="text-[0.85rem] text-[var(--Colors-Neutral-600)]">Count: {items.length}</span>
                                            </header>
                                            <div className="p-[0.75rem] border-t border-[var(--Colors-Neutral-100)] flex flex-col gap-[0.75rem]">
                                                {items.map((it, idx) => {
                                                    const v = it.productVariantData;
                                                    const thumb = (v?.productMedia?.[0] as any)?.file;
                                                    return (
                                                        <div key={`${v?._id}-${idx}`} className="flex items-start gap-[0.75rem] rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-[0.75rem] bg-white">
                                                            <div className="relative h-14 w-14 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] overflow-hidden bg-white shrink-0">
                                                                {thumb ? (
                                                                    <Image src={thumb} alt={v?.name ?? 'Item'} fill className="object-contain" />
                                                                ) : (
                                                                    <FallBackImage />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 flex flex-col items-start gap-[0.5rem] min-w-0">
                                                                <div className="w-full flex items-center justify-between gap-[0.5rem]">
                                                                    <div className="flex flex-col gap-[0.25rem] min-w-0">
                                                                        <p className="text-[1rem] font-medium truncate">{v?.name}</p>
                                                                        {v?.sku ? (
                                                                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-500)] font-medium">
                                                                                SKU: <span className="!text-black font-normal">{v.sku}</span>
                                                                            </p>
                                                                        ) : null}
                                                                        {v?.attribute ? (
                                                                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                                                                {Object.entries(v.attribute).map(([k, val]) => (
                                                                                    <p key={k} className="text-[0.75rem] text-[var(--Colors-Neutral-700)] font-medium">
                                                                                        {k}: {String(val)}
                                                                                    </p>
                                                                                ))}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 shrink-0">
                                                                        <span className="text-[0.875rem] text-[var(--Colors-Neutral-600)]">Qty: {it.quantity}</span>
                                                                        <span className="text-[1rem] font-semibold">
                                                                            {money(it?.calculatedPrice)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    <aside className="w-full lg:w-[28rem] flex-shrink-0">
                        <div className="flex-1 sticky top-[2rem] h-fit p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[1rem]">
                            <h2 className="text-[1.125rem] font-semibold">Order Summary</h2>
                            <div className="flex flex-col gap-2 pt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[var(--Colors-Neutral-700)]">Subtotal</span>
                                    <span className="text-sm font-medium">
                                        {money((fetchedOrder?.subTotal ?? 0) + (fetchedOrder?.discountedAmount ?? 0))}
                                    </span>
                                </div>
                                {(fetchedOrder?.discountedAmount ?? 0) > 0 ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Discount</span>
                                        <span className="text-sm font-medium">-{money(fetchedOrder?.discountedAmount)}</span>
                                    </div>
                                ) : null}

                                {(fetchedOrder?.deliveryCost ?? 0) > 0 ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Delivery</span>
                                        <span className="text-sm font-medium">{money(fetchedOrder?.deliveryCostBase)}</span>
                                    </div>
                                ) : null}
                                {(fetchedOrder?.shippingCost ?? 0) > 0 ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Shipping</span>
                                        <span className="text-sm font-medium">{money(fetchedOrder?.shippingCostBase)}</span>
                                    </div>
                                ) : null}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[var(--Colors-Neutral-700)]">Taxes</span>
                                    <span className="text-sm font-medium">
                                        {money(fetchedOrder?.tax + fetchedOrder?.deliveryTax + fetchedOrder?.shippingTax)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-[var(--Colors-Neutral-100)]">
                                    <span className="text-base font-bold">Total</span>
                                    <span className="text-base font-bold">
                                        {money(fetchedOrder?.grandTotal)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="border-t border-[var(--Colors-Neutral-100)]" />

                <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                    <section className="order-2 lg:order-1 flex-1 p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col items-center gap-[1rem]">
                        <h3 className="text-[1.25rem] font-bold text-black text-center">
                            How satisfied are you with the speed of the checkout process?
                        </h3>
                        <div className="flex items-center justify-center">
                            <Rating
                                name="checkout-speed-rating"
                                value={reviewRating}
                                onChange={(_, val) => setReviewRating(val)}
                                size="large"
                                sx={{ fontSize: 48 }}
                            />
                        </div>
                        <Button variant="primary" onClick={() => { /* connect later */ }}>
                            Submit
                        </Button>
                    </section>

                    <section className="order-1 lg:order-2 flex-1 p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[0.75rem]">
                        <h3 className="text-[1.125rem] font-semibold">Fulfillment Details</h3>

                        {(fetchedOrder?.shipments?.length ?? 0) > 0 ? (
                            <div className="flex flex-col gap-[0.75rem]">
                                {fetchedOrder?.shipments?.map((s) => (
                                    <div key={s._id} className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-[0.75rem] flex flex-col gap-[0.75rem]">
                                        <header className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                {s.rate?.providerImage200 ? (
                                                    <div className="relative h-6 w-10">
                                                        <Image src={s.rate.providerImage200} alt={s.rate.provider ?? 'Provider'} fill className="object-contain" />
                                                    </div>
                                                ) : null}
                                                <span className="text-[0.95rem] font-medium">{s.rate?.provider ?? 'Shipping Provider'}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {(() => {
                                                    const anyRate: any = s.rate as any;
                                                    const inferred =
                                                        anyRate?.price ??
                                                        anyRate?.amount ??
                                                        anyRate?.shipmentCost ??
                                                        anyRate?.metadata?.price ??
                                                        null;
                                                    const fallbackSingle =
                                                        (fetchedOrder?.shipments?.length ?? 0) === 1
                                                            ? (fetchedOrder?.shippingCost ?? null)
                                                            : null;
                                                    const valueToShow = inferred ?? fallbackSingle;
                                                    return valueToShow !== null ? (
                                                        <span className="text-[0.95rem] font-semibold">
                                                            {money(Number(valueToShow))}
                                                        </span>
                                                    ) : null;
                                                })()}
                                                <span className="text-[0.85rem] text-[var(--Colors-Neutral-600)]">{s.rate?.serviceCode ?? ''}</span>
                                            </div>
                                        </header>

                                        <div className="border-t border-[var(--Colors-Neutral-100)] pt-[0.75rem]">
                                            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--Colors-Neutral-600)] mb-2">
                                                Shipping Address
                                            </p>
                                            <div className="grid grid-cols-1 gap-[0.5rem] sm:grid-cols-2">
                                                {s.shippingAddress?.name ? (
                                                    <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                        <FaRegCircleUser className="text-[1.1rem]" />
                                                        <div className="text-[0.95rem] font-medium">{s.shippingAddress.name}</div>
                                                    </div>
                                                ) : null}
                                                {s.shippingAddress?.street1 ? (
                                                    <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                        <HiOutlineHome className="text-[1.1rem]" />
                                                        <div className="text-[0.95rem] font-medium">{s.shippingAddress.street1}</div>
                                                    </div>
                                                ) : null}
                                                {(s.shippingAddress?.city || s.shippingAddress?.state || s.shippingAddress?.country) ? (
                                                    <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                        <LuMapPin className="text-[1.1rem]" />
                                                        <div className="text-[0.95rem] font-medium">
                                                            {[s.shippingAddress?.city, s.shippingAddress?.state, s.shippingAddress?.country].filter(Boolean).join(', ')}
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {s.shippingAddress?.zip ? (
                                                    <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                        <LuMap className="text-[1.1rem]" />
                                                        <div className="text-[0.95rem] font-medium">{s.shippingAddress.zip}</div>
                                                    </div>
                                                ) : null}
                                                {s.shippingAddress?.phone ? (
                                                    <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                        <LuPhone className="text-[1.1rem]" />
                                                        <div className="text-[0.95rem] font-medium">{s.shippingAddress.phone}</div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        {hasAnyPickup || hasAnyDelivery ? (
                            <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-[0.75rem] flex flex-col gap-[0.5rem]">
                                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--Colors-Neutral-600)]">
                                    {hasAnyPickup ? 'Pickup Location' : 'Delivery From'}
                                </p>
                                {fetchedOrder?.inventoryAddress ? (
                                    <div className="grid grid-cols-1 gap-[0.5rem] sm:grid-cols-2">
                                        {fetchedOrder.inventoryAddress.name ? (
                                            <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                <FaRegCircleUser className="text-[1.1rem]" />
                                                <div className="text-[0.95rem] font-medium">{fetchedOrder.inventoryAddress.name}</div>
                                            </div>
                                        ) : null}
                                        {fetchedOrder.inventoryAddress.street1 ? (
                                            <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                <HiOutlineHome className="text-[1.1rem]" />
                                                <div className="text-[0.95rem] font-medium">{fetchedOrder.inventoryAddress.street1}</div>
                                            </div>
                                        ) : null}
                                        {(fetchedOrder.inventoryAddress.city || fetchedOrder.inventoryAddress.state || fetchedOrder.inventoryAddress.country) ? (
                                            <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                <LuMapPin className="text-[1.1rem]" />
                                                <div className="text-[0.95rem] font-medium">
                                                    {[fetchedOrder.inventoryAddress.city, fetchedOrder.inventoryAddress.state, fetchedOrder.inventoryAddress.country].filter(Boolean).join(', ')}
                                                </div>
                                            </div>
                                        ) : null}
                                        {fetchedOrder.inventoryAddress.zip ? (
                                            <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                <LuMap className="text-[1.1rem]" />
                                                <div className="text-[0.95rem] font-medium">{fetchedOrder.inventoryAddress.zip}</div>
                                            </div>
                                        ) : null}
                                        {fetchedOrder.inventoryAddress.phone ? (
                                            <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[0.75rem]">
                                                <LuPhone className="text-[1.1rem]" />
                                                <div className="text-[0.95rem] font-medium">{fetchedOrder.inventoryAddress.phone}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <p className="text-[0.9rem] text-[var(--Colors-Neutral-600)]">Location details unavailable.</p>
                                )}
                            </div>
                        ) : null}
                    </section>
                </div>
            </div>
        </div>
    )
}