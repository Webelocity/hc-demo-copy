'use client';

import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { cartAtom } from '@/atoms/cartAtom';
import FulfillmentItem from './FulfillmentItem';

type FulfillmentSectionProps = {
    isCompleted: boolean;
    onComplete: () => void;
};

export default function FulfillmentSection({ isCompleted, onComplete }: FulfillmentSectionProps) {
    const cart = useAtomValue(cartAtom);
    const shippingItems = useMemo(() => cart.filter(ci => ci.fulfillmentMethod === 'shipping'), [cart]);
    const deliveryItems = useMemo(() => cart.filter(ci => ci.fulfillmentMethod === 'delivery'), [cart]);
    const pickupItems = useMemo(() => cart.filter(ci => ci.fulfillmentMethod === 'pickup'), [cart]);

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
        </div>
    );
}


