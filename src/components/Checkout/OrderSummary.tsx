'use client';

import Image from 'next/image';
import FallBackImage from '@/components/shared/FallBackImage';
import type { CartItem } from '@/atoms/cartAtom';
import type { CartTotals } from '@/Api/Apis';

type OrderSummaryProps = {
    cart: CartItem[];
    totals?: CartTotals;
    isLoading: boolean;
    hasShippingOrDelivery: boolean;
    hasShipping: boolean;
    hasDelivery: boolean;
    cap?: number;
};

export default function OrderSummary({
    cart,
    totals,
    isLoading,
    hasShippingOrDelivery,
    hasShipping,
    hasDelivery,
    cap = 5,
}: OrderSummaryProps) {
    return (
        <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[1rem]">
            <h2 className="text-[1.125rem] font-semibold">Order Summary</h2>

            <div className="flex flex-col gap-[0.75rem]">
                {cart.slice(0, cap).map((item: CartItem) => (
                    <div key={`${item.variant._id}-${item.fulfillmentMethod ?? 'none'}`} className="flex items-center gap-[0.75rem]">
                        <div className="relative h-14 w-14 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] overflow-hidden bg-white">
                            {item.variant.thumbnail?.file ? (
                                <Image
                                    src={item.variant.thumbnail.file}
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
                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-600)]">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-[0.95rem] font-semibold">
                            ${Number(item.variant.finalPrice ?? 0).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

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
                {hasDelivery ? (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Delivery</span>
                        <span className="text-sm font-medium">
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                'Calculated at checkout'
                            )}
                        </span>
                    </div>
                ) : null}

                {hasShipping ? (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Shipping</span>
                        <span className="text-sm font-medium">
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                'Calculated at checkout'
                            )}
                        </span>
                    </div>
                ) : null}

                <div className="flex items-center justify-between pt-2 border-t border-[var(--Colors-Neutral-100)]">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-base font-bold">
                        ${Number(((totals?.subTotal ?? 0) + (totals?.taxAmount ?? 0) + (totals?.deliveryCost ?? 0))).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}


