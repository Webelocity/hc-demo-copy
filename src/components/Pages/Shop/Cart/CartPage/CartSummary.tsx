'use client';

import Button from "@/components/shared/Button";
import type { CartTotals } from "@/Api/Apis";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
    totals?: CartTotals;
    isLoading: boolean;
    hasShipping: boolean;
    hasUnfulfilled: boolean;
}

export default function CartSummary({ totals, isLoading, hasShipping, hasUnfulfilled }: CartSummaryProps) {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--Neutral-100)]">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--Colors-Neutral-700)]">Subtotal</span>
                    {isLoading ? (
                        <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    ) : (
                        <span className="text-sm font-medium">${((totals?.subTotal ?? 0) + (totals?.subTotalDiscount ?? 0)).toFixed(2)}</span>
                    )}
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-between">
                        <span className="inline-block h-[1rem] w-[5rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                        <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    </div>
                ) : (
                    (totals?.subTotalDiscount ?? 0) > 0 ? (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Discount</span>
                            <span className="text-sm font-medium">-${(totals?.subTotalDiscount ?? 0).toFixed(2)}</span>
                        </div>
                    ) : null
                )}

                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--Colors-Neutral-700)]">Taxes</span>
                    {isLoading ? (
                        <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    ) : (
                        <span className="text-sm font-medium">Calculated at checkout</span>
                    )}
                </div>

                {hasShipping ? (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--Colors-Neutral-700)]">Shipping</span>
                        {isLoading ? (
                            <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                        ) : (
                            <span className="text-sm font-medium">Calculated at checkout</span>
                        )}
                    </div>
                ) : null}

                <div className="flex items-center justify-between pt-2 border-t border-[var(--Neutral-100)]">
                    <span className="text-base font-bold"> Total</span>
                    {isLoading ? (
                        <span className="inline-block h-[1.25rem] w-[7rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                    ) : (
                        <span className="text-base font-bold">
                            ${((totals?.subTotal ?? 0)).toFixed(2)}
                        </span>
                    )}
                </div>
            </div>

            <Button variant="primary" onClick={() => router.push('/checkout')} fullWidth disabled={hasUnfulfilled} aria-disabled={hasUnfulfilled}>
                Proceed to Checkout
            </Button>
        </>
    );
}


