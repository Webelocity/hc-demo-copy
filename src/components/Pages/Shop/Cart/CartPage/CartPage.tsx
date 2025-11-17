'use client';

import { useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/atoms/cartAtom";
import CartItem from "../CartItem/CartItem";
import Button from "@/components/shared/Button";
import { useCartTotals } from "@/hooks/useCartTotals";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import PromoCode from "./PromoCode";
import CartSummary from "./CartSummary";

const FULFILLMENT_LABELS: Record<string, string> = {
    undefined: "No fulfillment selected",
    pickup: "Pickup",
    delivery: "Delivery",
    shipping: "Shipping",
};

export default function CartPage() {
    const cart = useAtomValue(cartAtom);
    const { data: totals, isLoading } = useCartTotals();

    const router = useRouter();

    const groups = useMemo(() => {
        const byKey: Record<string, typeof cart> = {
            undefined: [],
            pickup: [],
            delivery: [],
            shipping: [],
        };
        for (const item of cart) {
            const key = (item.fulfillmentMethod ?? 'undefined') as keyof typeof byKey;
            byKey[key].push(item);
        }
        return byKey;
    }, [cart]);

    const hasShipping = useMemo(() => {
        return cart.some((ci) => ci.fulfillmentMethod === 'shipping');
    }, [cart]);

    const hasUnfulfilled = useMemo(() => groups.undefined.length > 0, [groups]);
    if (cart.length === 0) {
        return (
            <div className="baseContainer py-[2.5rem]">
                <div className="flex flex-col items-center justify-center gap-[1rem] py-[4rem]">
                    <h1 className="text-[1.75rem] font-bold">No Products Yet in cart</h1>
                    <Button variant="primary" onClick={() => router.push('/shop')}>
                        Browse Shop
                    </Button>
                </div>
            </div>
        );
    }



    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                <motion.div className="flex-1 flex flex-col gap-[1rem]" layout>
                    <h1 className="text-[1.75rem] font-bold">Cart</h1>
                    <AnimatePresence initial={false}>
                        {(['undefined', 'pickup', 'delivery', 'shipping'] as const).map((key) => {
                            const items = groups[key];
                            if (!items?.length) return null;
                            return (
                                <motion.section
                                    key={key}
                                    className={`flex flex-col gap-[0.75rem] p-[1rem] flex flex-col gap-[1rem] border ${key !== 'undefined' ? 'border-[var(--Colors-Neutral-100)]' : 'border-[red]'}  rounded-[var(--Radius-xs)]`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    layout
                                >
                                    {key === 'undefined' ? (
                                        <h2 className="text-[1.25rem] font-semibold  flex items-center gap-2">
                                            <FiAlertTriangle className="text-[red]" />
                                            Some Items need attention! Please select a fulfillment method for each item
                                        </h2>
                                    ) : key === 'pickup' ? (
                                        <h2 className="text-[1.25rem] font-semibold">
                                            Pickup from store, as soon as Today
                                        </h2>
                                    ) : key === 'delivery' ? (
                                        <h2 className="text-[1.25rem] font-semibold">
                                            Delivery from store, as soon as Today
                                        </h2>
                                    ) : (
                                        <h2 className="text-[1.25rem] font-semibold">
                                            Shipping Options and Pricing available at checkout
                                        </h2>
                                    )}
                                    <motion.div className="flex flex-col gap-[0.75rem]" layout>
                                        <AnimatePresence initial={false}>
                                            {items.map((item) => (
                                                <motion.div
                                                    key={`${item.variant._id}-${item.fulfillmentMethod ?? 'undefined'}`}
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ duration: 0.15 }}
                                                    layout
                                                >
                                                    <CartItem item={item} isLoading={!!isLoading} />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.section>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
                <aside className="w-full lg:w-[28rem] flex-shrink-0">
                    <div className="p-[1.5rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] flex flex-col gap-[1rem]">
                        <h3 className="text-[1.25rem]">Prices</h3>
                        <PromoCode cart={cart} subTotal={totals?.subTotal} />
                        <CartSummary
                            totals={totals}
                            isLoading={!!isLoading}
                            hasShipping={hasShipping}
                            hasUnfulfilled={hasUnfulfilled}
                        />

                    </div>
                </aside>
            </div>
        </div>
    )
}