'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import { Input } from '@mui/material';

export default function QuantityPicker({
    productId,
    variantId,
    quantity,
    selectedVariant
}: {
    productId: string;
    variantId: string;
    quantity: number;
    selectedVariant: ProductVariant | undefined;
}) {
    const router = useRouter();
    const params = useSearchParams();
    const trackQuantity = selectedVariant?.trackQuantity ?? false;
    const inventoryCount = selectedVariant?.inventoryCount ?? 0;
    const [localQty, setLocalQty] = useState<number>(quantity);
    useEffect(() => setLocalQty(quantity), [quantity]);

    const debouncedQty = useDebounce(localQty, 2000);

    useEffect(() => {
        const safe = Math.max(1, Number.isFinite(debouncedQty) ? Number(debouncedQty) : 1);
        const usp = new URLSearchParams(params.toString());
        usp.set('variant_Id', selectedVariant?._id ?? ''); // keep variant pinned
        if (safe === 1) usp.delete('q'); else usp.set('q', String(safe));
        router.replace(`/product/${productId}?${usp.toString()}`, { scroll: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQty, productId, selectedVariant?._id]);

    const renderStock = () => {
        if (trackQuantity) {
            if (inventoryCount > 0) {
                return <div>In stock</div>
            }
        }
        else {
            return <div>Out of stock</div>
        }
    }
    const handleIncrement = () => {
        const newQty = localQty + 1;
        const maxQty = trackQuantity ? inventoryCount : Infinity;
        if (newQty <= maxQty) {
            setLocalQty(newQty);
        }
    };

    const handleDecrement = () => {
        if (localQty > 1) {
            setLocalQty(localQty - 1);
        }
    };

    return (
        <div>
            {renderStock()}
            <label htmlFor="qty" className="block mb-2">Quantity</label>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={localQty <= 1}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>

                <Input
                    id="qty"
                    type="number"
                    className="[&_input::-webkit-outer-spin-button]:appearance-none [&_input::-webkit-inner-spin-button]:appearance-none [&_input[type=number]]:[-moz-appearance:textfield] w-20 text-center"
                    inputProps={{ min: 1, max: inventoryCount }}
                    value={localQty}
                    onChange={(e) => {
                        const next = Number(e.target.value);
                        setLocalQty(Number.isFinite(next) && next > 0 ? Math.floor(next) : 1);
                    }}
                />

                <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={trackQuantity && localQty >= inventoryCount}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase quantity"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
}
