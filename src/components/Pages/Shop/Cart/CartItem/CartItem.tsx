import { type CartItem, increaseQuantityAtom, decreaseQuantityAtom, deleteFromCartAtom } from "@/atoms/cartAtom";
import FallBackImage from "@/components/shared/FallBackImage";
import Image from "next/image";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import useDebounce from "@/hooks/useDebounce";

export default function CartItem({ item, isLoading }: { item: CartItem, isLoading: boolean }) {
    const increaseQuantity = useSetAtom(increaseQuantityAtom);
    const decreaseQuantity = useSetAtom(decreaseQuantityAtom);
    const deleteFromCartAction = useSetAtom(deleteFromCartAtom);
    const handleIncrement = () => {
        increaseQuantity({
            variantId: item.variant._id,
            fulfillmentMethod: item.fulfillmentMethod,
            amount: 1,
        });
    };

    const handleDecrement = () => {
        decreaseQuantity({
            variantId: item.variant._id,
            fulfillmentMethod: item.fulfillmentMethod,
            amount: 1,
        });
    };

    const handleDelete = () => {
        deleteFromCartAction({
            variantId: item.variant._id,
            fulfillmentMethod: item.fulfillmentMethod,
        });
    };
    return (
        <div className="flex flex-col gap-[0.5rem] p-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)]">
            <div className="flex  gap-[0.5rem]">
                <div className="flex-1">
                    {item.variant.thumbnail?.file ? <Image src={item.variant.thumbnail.file} alt={item.variant.name} fill className="object-contain !relative" /> : <FallBackImage />}
                </div>
                <div className="flex-[4] flex flex-col items-start gap-[0.5rem]">
                    {/* Price and Name */}
                    <div className="w-full flex items-center justify-between gap-[0.5rem]">
                        <div className="flex flex-col gap-[0.25rem]">
                            <p className="text-[1rem] font-medium">{item.variant.name}</p>
                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-500)] font-medium">SKU: <p className="inline !text-black font-normal">{item.variant.sku}</p></p>
                        </div>
                        <div className="flex-[1] flex items-center justify-end">
                            {isLoading ? (
                                <span
                                    className="inline-block h-[1rem] w-[4.5rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse"
                                    aria-busy="true"
                                ></span>
                            ) : (
                                <span className="text-[1rem] font-semibold">
                                    ${item.variant.finalPrice}/<p className="inline text-[0.75rem] text-[var(--Colors-Neutral-500)] font-normal">each</p>
                                </span>
                            )}
                        </div>

                    </div>
                    <div>
                        {Object.entries(item.variant.attribute).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-[0.75rem] text-[var(--Colors-Neutral-700)] font-medium">{key}: {value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Fulfillment Method */}
                    {item.variant.supportedFulfillmentMethods?.length ? (
                        <div className="flex items-center gap-[0.5rem] flex-wrap">
                            {item.variant.supportedFulfillmentMethods.map((method) => {
                                const isSelected = item.fulfillmentMethod === method;
                                return (
                                    <span
                                        key={method}
                                        className={`text-[0.875rem] ${isSelected ? 'bg-[var(--primary-500-main)] text-white' : 'text-black'} py-[0.25rem] px-[0.5rem] rounded-[var(--Radius-md)]`}
                                    >
                                        {method}
                                    </span>
                                );
                            })}
                        </div>
                    ) : null}


                    {/* Invalid indicator */}
                    {item.isValid === false ? (
                        <div className="w-full">
                            <p className="text-[0.75rem] font-medium text-[var(--Colors-Error-600)]">
                                This item may be unavailable or not allowed for the selected fulfillment method.
                            </p>
                        </div>
                    ) : null}
                </div>

            </div>
            <div className="flex items-center justify-between">
                <div className="w-fit p-[0.25rem] border border-[var(--Colors-Neutral-100)] rounded-[1rem] flex justify-center items-center gap-[0.5rem]">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <FiMinusCircle className="text-xl cursor-pointer" />
                    </button>

                    <div className="w-10 h-10 flex items-center justify-center select-none">
                        <span className="text-base font-semibold">{item.quantity}</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={item.variant.trackQuantity && item.quantity >= item.variant.inventoryCount}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Increase quantity"
                    >
                        <FiPlusCircle className="text-xl cursor-pointer" />
                    </button>
                </div>
                <GoTrash className="text-xl cursor-pointer" onClick={handleDelete} />

            </div>

        </div>
    );
}