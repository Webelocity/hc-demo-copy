'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cartAtom, type CartState } from '@/atoms/cartAtom';
import { fetchCartTotals, type CartTotals } from '@/Api/Apis';
import { appliedDiscountIdsAtom } from '@/atoms/discountAtom';
import { selectedStoreAtom } from '@/atoms/storeAtom';

function fingerprintCart(cart: CartState) {
    // Create a stable key for caching. Include only fields that affect pricing.
    return JSON.stringify(
        cart.map((item) => ({
            variantId: item.variant._id,
            quantity: item.quantity,
            fulfillmentMethod: item.fulfillmentMethod,
        }))
    );
}


export function useCartTotals() {
    const cart = useAtomValue(cartAtom);
    const appliedDiscountIds = useAtomValue(appliedDiscountIdsAtom);
    const setCart = useSetAtom(cartAtom);
    const selectedStore = useAtomValue(selectedStoreAtom);
    const fp = useMemo(() => fingerprintCart(cart), [cart]);

    const query = useQuery({
        queryKey: ['cartTotals', fp, appliedDiscountIds],
        queryFn: () => fetchCartTotals(cart, appliedDiscountIds),
        enabled: cart.length > 0,
        // Cache for 10 minutes so subsequent views use cached values
        staleTime: 10 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 0,
    });

    // When totals resolve, update per-item latest price in the cart atom
    useEffect(() => {
        if (!query.data) return;
        const mapVariantIdToPrice = new Map<string, number>();
        for (const p of query.data.productItems) {
            mapVariantIdToPrice.set(p.productVariantId, p.calculatedPrice);
        }
        setCart((prev) =>
            prev.map((ci) => {
                const price = mapVariantIdToPrice.get(ci.variant._id);
                if (price == null) return ci;
                return {
                    ...ci,
                    variant: {
                        ...ci.variant,
                        finalPrice: price,
                        retailPrice: Math.max(ci.variant.retailPrice, price),
                    },
                };
            })
        );
    }, [query.data, setCart]);

    return query;
}


