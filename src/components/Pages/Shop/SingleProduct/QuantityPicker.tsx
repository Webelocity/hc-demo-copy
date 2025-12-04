'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import { Input } from '@mui/material';
import Button from '@/components/shared/Button';
import { LuShoppingCart } from 'react-icons/lu';
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { addToCartAtom } from '@/atoms/cartAtom';
import { selectedStoreAtom } from '@/atoms/storeAtom';
import {
    computeFulfillmentAvailability,
    formatFulfillmentMethodLabel,
    resolveFulfillmentMethod,
} from '@/util/fulfillmentInventory';
import { wishlistAtom, toggleWishlistAtom } from '@/atoms/wishlistAtom';
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { toast } from 'react-toastify';

const DO_IT_BEST_ADDRESS_ID = process.env.NEXT_PUBLIC_DO_IT_BEST_ID ?? '';

export default function QuantityPicker({
    productId,
    variantId,
    quantity,
    selectedVariant,
    product
}: {
    productId: string;
    variantId: string;
    quantity: number;
    selectedVariant: ProductVariant | undefined;
    product: Product;
}) {
    const router = useRouter();
    const params = useSearchParams();
    const [localQty, setLocalQty] = useState<number>(quantity);
    const selectedStoreId = useAtomValue(selectedStoreAtom);
    const addToCartAction = useSetAtom(addToCartAtom);
    const [selectedFulfillmentMethod, setSelectedFulfillmentMethod] = useState<FulfillmentMethodEnum | null>(() =>
        resolveFulfillmentMethod(selectedVariant, selectedVariant?.supportedFulfillmentMethods?.[0] ?? null)
    );
    const [wishlist] = useAtom(wishlistAtom);
    const toggleWishlist = useSetAtom(toggleWishlistAtom);
    const isWishlisted = wishlist.some((item) => item._id === product?._id);
    useEffect(() => setLocalQty(quantity), [quantity]);
    useEffect(() => {
        setSelectedFulfillmentMethod((prev) => resolveFulfillmentMethod(selectedVariant, prev));
    }, [selectedVariant?._id]);
    const fulfillmentAvailability = useMemo(
        () => computeFulfillmentAvailability(selectedVariant, selectedStoreId, { doItBestId: DO_IT_BEST_ADDRESS_ID }),
        [selectedVariant, selectedStoreId]
    );
    console.log(fulfillmentAvailability);
    const activeFulfillmentMethod = resolveFulfillmentMethod(selectedVariant, selectedFulfillmentMethod);
    const activeMethodInfo = activeFulfillmentMethod ? fulfillmentAvailability[activeFulfillmentMethod] : undefined;
    const methodLimit = !selectedVariant?.trackQuantity
        ? Number.POSITIVE_INFINITY
        : activeMethodInfo?.available
            ? activeMethodInfo.ceiling
            : 0;
    const maxQtyForInput = Number.isFinite(methodLimit) ? Math.max(1, methodLimit) : undefined;
    const canIncrement = Number.isFinite(methodLimit) ? localQty < methodLimit : true;
    const fulfillmentInventoryLabel = (() => {
        if (!selectedVariant?.trackQuantity) {
            return 'Unlimited';
        }
        if (!activeFulfillmentMethod) {
            return 'Select a fulfillment method';
        }
        if (!activeMethodInfo?.available) {
            return 'Unavailable for the selected location';
        }
        return `${activeMethodInfo.ceiling} available`;
    })();
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
        if (Number.isFinite(methodLimit) && localQty >= methodLimit) {
            return;
        }
        setLocalQty((qty) => qty + 1);
    };

    const handleDecrement = () => {
        if (localQty > 1) {
            setLocalQty(localQty - 1);
        }
    };

    const addToCart = () => {

        if (!selectedVariant) {
            toast.error('No selected variant to add to cart');
            return;
        }
        const methodForCart = activeFulfillmentMethod;
        if (!methodForCart) {
            toast.error('Select a fulfillment method to continue');
            return;
        }

        addToCartAction({
            productId,
            variant: selectedVariant,
            quantity: localQty,
            fulfillmentMethod: methodForCart,
        });
    }

    const handleWishlistToggle = () => {
        if (product) {
            toggleWishlist(product);
        }
    }

    return (
        <>
            <div className='flex flex-col gap-[1rem]'>
                <p className='text-[1rem] font-medium'>How you’ll get this item</p>
                <div className="flex items-center gap-[0.5rem]">
                    {selectedVariant?.supportedFulfillmentMethods?.map((method) => (
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
                <p className="text-[0.75rem] text-[var(--Colors-Neutral-600)]">
                    Fulfillment inventory for {formatFulfillmentMethodLabel(activeFulfillmentMethod)}: {fulfillmentInventoryLabel}
                </p>
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
                        inputProps={{ min: 1, max: maxQtyForInput }}
                        value={localQty}
                        onChange={(e) => {
                            const next = Number(e.target.value);
                            if (!Number.isFinite(next) || next <= 0) {
                                setLocalQty(1);
                                return;
                            }
                            const normalized = Math.floor(next);
                            if (typeof maxQtyForInput === 'number') {
                                setLocalQty(Math.min(normalized, maxQtyForInput));
                            } else {
                                setLocalQty(normalized);
                            }
                        }}
                    />

                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={!canIncrement}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Increase quantity"
                    >
                        <FiPlusCircle className="text-xl cursor-pointer" />
                    </button>
                </div>
                <Button className='flex-[1.5]' variant="primary" onClick={addToCart}>   <LuShoppingCart className="text-xl cursor-pointer" />Add to cart</Button>
                <Button className='flex-[0.3]' variant="primary" onClick={handleWishlistToggle}>
                    {isWishlisted ? (
                        <FaHeart className="text-xl text-red-500" />
                    ) : (
                        <LuHeart className="text-xl text-white" />
                    )}
                </Button>
            </div>
        </>

    );
}
