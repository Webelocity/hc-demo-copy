'use client';

import Image from 'next/image';
import FallBackImage from '@/components/shared/FallBackImage';
import type { CartItem } from '@/atoms/cartAtom';

type FulfillmentItemProps = {
    item: CartItem;
};

export default function FulfillmentItem({ item }: FulfillmentItemProps) {
    return (
        <div className="flex flex-col gap-[0.5rem]">
            <div className="flex gap-[0.5rem]">
                <div className="relative h-16 w-16 rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] overflow-hidden bg-white shrink-0">
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

                <div className="flex-1 flex flex-col items-start gap-[0.5rem] min-w-0">
                    <div className="w-full flex items-center justify-between gap-[0.5rem]">
                        <div className="flex flex-col gap-[0.25rem] min-w-0">
                            <p className="text-[1rem] font-medium truncate">{item.variant.name}</p>
                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-500)] font-medium">
                                SKU: <span className="!text-black font-normal">{item.variant.sku}</span>
                            </p>
                            {item.variant.attribute ? (
                                <div className="flex flex-wrap gap-x-2 gap-y-1">
                                    {Object.entries(item.variant.attribute).map(([key, value]) => (
                                        <p key={key} className="text-[0.75rem] text-[var(--Colors-Neutral-700)] font-medium">
                                            {key}: {String(value)}
                                        </p>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[0.875rem] text-[var(--Colors-Neutral-600)]">Qty: {item.quantity}</span>
                            <span className="text-[1rem] font-semibold">
                                ${Number(item.variant.finalPrice ?? 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


