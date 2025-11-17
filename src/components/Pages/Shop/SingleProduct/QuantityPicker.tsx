'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import { Input } from '@mui/material';
import Button from '@/components/shared/Button';
import { LuShoppingCart } from 'react-icons/lu';
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import Image from 'next/image';
import { useAtom, useSetAtom } from 'jotai';
import { cartAtom, addToCartAtom } from '@/atoms/cartAtom';

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
    const [selectedFulfillmentMethod, setSelectedFulfillmentMethod] = useState<FulfillmentMethodEnum | null>(selectedVariant?.supportedFulfillmentMethods[0] ?? null);
    const [cart] = useAtom(cartAtom);
    const addToCartAction = useSetAtom(addToCartAtom);
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

    const addToCart = () => {

        if (!selectedVariant) {
            console.warn('No selectedVariant to add to cart');
            return;
        }

        addToCartAction({
            productId,
            variant: selectedVariant,
            quantity: localQty,
            fulfillmentMethod: selectedFulfillmentMethod,
        });
    }

    return (
        <>
            <div className='flex flex-col gap-[1rem]'>
                <p className='text-[1rem] font-medium'>How you’ll get this item</p>
                <div className="flex items-center gap-[0.5rem]">
                    {selectedVariant?.supportedFulfillmentMethods.map((method) => (
                        <div
                            key={method}
                            onClick={() => setSelectedFulfillmentMethod(method)}
                            className={`cursor-pointer flex-1 flex flex-col items-center justify-center p-[0.5rem] py-[1rem] border rounded-[var(--Radius-xs)] relative overflow-hidden min-h-full text-center ${selectedFulfillmentMethod === method ? 'border-[var(--secondary-500-main)]' : 'border-[var(--Colors-Neutral-100)]'}`}
                        >
                            <p className={`text-[1rem] font-medium ${selectedFulfillmentMethod === method ? 'text-[var(--Colors-Neutral-800)]' : 'text-[var(--Colors-Neutral-700)]'}`}>
                                {method.charAt(0).toUpperCase() + method.slice(1)}
                            </p>
                            {method === 'pickup' ? <p className='text-[var(--Colors-Success-800)] text-[0.75rem] font-medium'>Free</p> : <p className='text-[var(--Colors-Neutral-700)] text-[0.75rem] font-medium'>Calculated at checkout</p>}
                        </div>
                    ))}
                </div>

            </div>
            <div className=' flex gap-[0.5rem] items-center'>
                <div className="flex-[1.1] p-[0.25rem] border border-[var(--Colors-Neutral-100)] rounded-[1rem] flex justify-center items-center gap-[0.5rem]">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={localQty <= 1}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <FiMinusCircle className="text-xl cursor-pointer" />
                    </button>

                    <Input
                        id="qty"
                        type="number"
                        className="[&_input]:text-center [&_input::-webkit-outer-spin-button]:appearance-none [&_input::-webkit-inner-spin-button]:appearance-none [&_input[type=number]]:[-moz-appearance:textfield]"
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
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Increase quantity"
                    >
                        <FiPlusCircle className="text-xl cursor-pointer" />
                    </button>
                </div>
                <Button className='flex-[1.5]' variant="primary" onClick={addToCart}>   <LuShoppingCart className="text-xl cursor-pointer" />Add to cart</Button>
                <Button className='flex-[0.3]' variant="primary" >  <Image className='!relative !w-[1.5rem] !h-[1.5rem]' src="/assets/image/Shop/clipboard.svg" alt="heart" fill /> </Button>
            </div>
        </>

    );
}
