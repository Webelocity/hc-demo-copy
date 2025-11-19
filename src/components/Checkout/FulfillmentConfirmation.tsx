'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import type { CartItem } from '@/atoms/cartAtom';
import { useAtomValue } from 'jotai';
import { selectedShippingOptionAtom } from '@/atoms/shippingAtom';
import FallBackImage from '../shared/FallBackImage';

type FulfillmentConfirmationProps = {
    cart: CartItem[];
    deliveryCost?: number;
};

export default function FulfillmentConfirmation({ cart, deliveryCost }: FulfillmentConfirmationProps) {
    const selectedShipping = useAtomValue(selectedShippingOptionAtom);

    const { shippingItems, deliveryItems, pickupItems } = useMemo(() => {
        const shippingItems = cart.filter((ci) => ci.fulfillmentMethod === 'shipping');
        const deliveryItems = cart.filter((ci) => ci.fulfillmentMethod === 'delivery');
        const pickupItems = cart.filter((ci) => ci.fulfillmentMethod === 'pickup');
        return { shippingItems, deliveryItems, pickupItems };
    }, [cart]);

    return (
        <div className="flex flex-col gap-[1rem]">
            {shippingItems.length > 0 ? (
                <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                    <div className="flex items-center justify-between pb-[0.75rem] mb-[0.75rem] border-b border-[var(--Colors-Neutral-100)]">
                        <h3 className="text-[1.1rem] font-semibold text-black">Shipping</h3>
                        {selectedShipping ? (
                            <div className="flex items-center gap-2">
                                {selectedShipping.image ? (
                                    <div className="relative h-6 w-6 overflow-hidden">
                                        <Image src={selectedShipping.image} alt={selectedShipping.name} fill className="object-contain" />
                                    </div>
                                ) : null}
                                <span className="text-sm font-medium">{selectedShipping.name}</span>
                                <span className="text-sm font-semibold">${Number(selectedShipping.price ?? 0).toFixed(2)}</span>
                                {selectedShipping.estimatedDays ? (
                                    <span className="text-xs text-[var(--Colors-Neutral-600)]">{selectedShipping.estimatedDays} days</span>
                                ) : null}
                            </div>
                        ) : (
                            <span className="text-sm text-[var(--Colors-Neutral-600)]">No option selected</span>
                        )}
                    </div>
                    <MiniItems items={shippingItems} />
                </div>
            ) : null}

            {deliveryItems.length > 0 ? (
                <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                    <div className="flex items-center justify-between pb-[0.75rem] mb-[0.75rem] border-b border-[var(--Colors-Neutral-100)]">
                        <h3 className="text-[1.1rem] font-semibold text-black">Delivery</h3>
                        <span className="text-sm font-semibold">
                            {deliveryCost != null ? `$${Number(deliveryCost).toFixed(2)}` : '—'}
                        </span>
                    </div>
                    <MiniItems items={deliveryItems} />
                </div>
            ) : null}

            {pickupItems.length > 0 ? (
                <div className="p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
                    <div className="pb-[0.75rem] mb-[0.75rem] border-b border-[var(--Colors-Neutral-100)]">
                        <h3 className="text-[1.1rem] font-semibold text-black">Pickup</h3>
                    </div>
                    <MiniItems items={pickupItems} />
                </div>
            ) : null}
        </div>
    );
}

function MiniItems({ items }: { items: CartItem[] }) {
    return (
        <div className="grid grid-cols-1 gap-[0.5rem]">
            {items.map((item) => (
                <div key={`${item.variant._id}-${item.fulfillmentMethod ?? 'none'}`} className="flex items-center gap-[0.5rem]">
                    <div className="relative h-10 w-10 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] overflow-hidden bg-white shrink-0">
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
                    <div className="min-w-0">
                        <p className="text-[0.95rem] font-medium truncate">{item.variant.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


