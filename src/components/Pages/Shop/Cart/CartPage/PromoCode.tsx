'use client';

import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import Button from "@/components/shared/Button";
import { validatePromoCode } from "@/Api/Apis";
import { appliedDiscountsAtom } from "@/atoms/discountAtom";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";
import type { CartState } from "@/atoms/cartAtom";

interface PromoCodeProps {
    cart: CartState;
    subTotal?: number;
}

export default function PromoCode({ cart, subTotal }: PromoCodeProps) {
    const [appliedDiscounts, setAppliedDiscounts] = useAtom(appliedDiscountsAtom);

    const [promoCode, setPromoCode] = useState<string>("");
    const [isValidating, setIsValidating] = useState<boolean>(false);

    const displayedPromos = useMemo<AppliedDiscount[]>(() => {
        return appliedDiscounts ?? [];
    }, [appliedDiscounts]);

    const handleApplyPromo = async () => {
        if (!promoCode?.trim()) {
            toast.error("Please enter a promo code");
            return;
        }
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        const normalizedCode = promoCode.trim().toLowerCase();
        if (appliedDiscounts.some((d) => d.code?.toLowerCase() === normalizedCode)) {
            toast.info("Promo code already applied");
            return;
        }
        setIsValidating(true);
        try {
            const totalPrice = subTotal ?? cart.reduce((sum, ci) => sum + (ci.variant.finalPrice * ci.quantity), 0);
            const result = await validatePromoCode(promoCode.trim(), totalPrice, cart.length);
            const id = result._id as string;
            if (!id) {
                throw new Error("Invalid discount response");
            }
            const codeFromApi = result.code ?? normalizedCode;
            const nameFromApi = result.discountName ?? "Discount";
            setAppliedDiscounts((prev) => {
                if (prev.some((d) => d._id === id)) return prev;
                return [...prev, { _id: id, code: codeFromApi.toLowerCase(), discountName: nameFromApi }];
            });
            toast.success("Promo code applied");
            setPromoCode("");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to apply promo code";
            toast.error(msg);
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemovePromo = (id: string) => {
        setAppliedDiscounts((prev) => prev.filter((d) => d._id !== id));
        toast.info("Promo removed");
    };

    return (
        <>
            <div className="flex items-center ">
                <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 py-[1rem] px-[1.2rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] outline-none"
                />
                <Button variant="primary" onClick={handleApplyPromo} className="!border-bottom-left-radius-[0]" disabled={isValidating}>
                    {isValidating ? 'Applying...' : 'Apply'}
                </Button>
            </div>
            {displayedPromos.length > 0 ? (
                <div className="flex flex-wrap gap-[0.5rem] w-full">
                    {displayedPromos.map((promo) => (
                        <div
                            key={promo._id}
                            className="flex items-center gap-[0.5rem] bg-[color:var(--Colors-Neutral-50)] p-[0.5rem] text-[0.875rem] rounded-[var(--Radius-xs)]"
                        >
                            <span className="text-[color:var(--Neutral-700)]">
                                {promo.discountName}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemovePromo(promo._id)}
                                aria-label={`Remove ${promo.discountName} promo`}
                                className="text-[color:var(--Neutral-300)] hover:text-[color:var(--Neutral-500)] transition-colors cursor-pointer"
                            >
                                <IoIosCloseCircleOutline className="text-[1.25rem]" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}


