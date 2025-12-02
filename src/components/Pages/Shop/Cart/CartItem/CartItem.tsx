import { type CartItem, increaseQuantityAtom, decreaseQuantityAtom, deleteFromCartAtom, updateFulfillmentAtom } from "@/atoms/cartAtom";
import FallBackImage from "@/components/shared/FallBackImage";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { selectedStoreAtom } from "@/atoms/storeAtom";
import { computeFulfillmentAvailability, formatFulfillmentMethodLabel, resolveFulfillmentMethod } from "@/util/fulfillmentInventory";

export default function CartItem({ item, isLoading }: { item: CartItem; isLoading: boolean }) {
    const increaseQuantity = useSetAtom(increaseQuantityAtom);
    const decreaseQuantity = useSetAtom(decreaseQuantityAtom);
    const deleteFromCartAction = useSetAtom(deleteFromCartAtom);
    const updateFulfillment = useSetAtom(updateFulfillmentAtom);
    const router = useRouter();
    const [quantity, setQuantity] = useState(item.quantity);
    const debouncedQuantity = useDebounce(quantity, 2000);
    const selectedStoreId = useAtomValue(selectedStoreAtom);
    const fulfillmentAvailability = useMemo(
        () => computeFulfillmentAvailability(item.variant, selectedStoreId),
        [item.variant, selectedStoreId]
    );
    const normalizedMethod = resolveFulfillmentMethod(item.variant, item.fulfillmentMethod);
    const methodAvailability = normalizedMethod ? fulfillmentAvailability[normalizedMethod] : undefined;
    const methodLimit = useMemo(
        () =>
            item.variant.trackQuantity
                ? (methodAvailability?.available ? methodAvailability.ceiling : 0)
                : Number.POSITIVE_INFINITY,
        [item.variant.trackQuantity, methodAvailability]
    );
    const finiteMethodLimit = Number.isFinite(methodLimit) ? Number(methodLimit) : null;
    const isFulfillmentUnavailable =
        Boolean(item.variant.trackQuantity) && (!methodAvailability || !methodAvailability.available);
    const isQuantityOverLimit =
        Boolean(item.variant.trackQuantity) &&
        Boolean(methodAvailability?.available) &&
        finiteMethodLimit !== null &&
        item.quantity > finiteMethodLimit;
    const showFulfillmentWarning = Boolean(normalizedMethod) && (isFulfillmentUnavailable || isQuantityOverLimit);
    const fulfillmentWarningMessage = showFulfillmentWarning
        ? isFulfillmentUnavailable
            ? `${formatFulfillmentMethodLabel(normalizedMethod)} is unavailable at the selected location. Please choose a different fulfillment method.`
            : `Only ${finiteMethodLimit} available for ${formatFulfillmentMethodLabel(normalizedMethod)}. Reduce the quantity or pick another method.`
        : '';
    const handleProductClick = () => {
        router.push(`/product/${item.variant.parentProduct}?variant_Id=${item.variant._id}`);
    }
    // Keep local quantity in sync with store updates
    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    // Debounced "apply" to the store
    useEffect(() => {
        if (debouncedQuantity === item.quantity) return;

        const diff = debouncedQuantity - item.quantity;
        if (diff > 0) {
            increaseQuantity({
                variantId: item.variant._id,
                fulfillmentMethod: normalizedMethod ?? item.fulfillmentMethod,
                amount: diff,
            });
        } else {
            decreaseQuantity({
                variantId: item.variant._id,
                fulfillmentMethod: normalizedMethod ?? item.fulfillmentMethod,
                amount: -diff,
            });
        }
    }, [
        debouncedQuantity,
    ]);

    const handleDelete = () => {
        deleteFromCartAction({
            variantId: item.variant._id,
            fulfillmentMethod: item.fulfillmentMethod,
        });
    };

    const canDecrement = quantity > 1;
    const canIncrement = finiteMethodLimit !== null ? quantity < finiteMethodLimit : true;
    const thumbnail = item.variant.productMedia[0]?.file || item.variant.thumbnail?.file;
    return (
        <div
            className={`flex flex-col gap-[0.5rem] p-[1rem] border rounded-[var(--Radius-xs)] ${showFulfillmentWarning ? 'border-[var(--Colors-Error-300)]' : 'border-[var(--Colors-Neutral-100)]'
                }`}
        >
            <div className="flex gap-[0.5rem]">
                <div className="flex-1 relative cursor-pointer" onClick={handleProductClick}>
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={item.variant.name}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <FallBackImage />
                    )}
                </div>

                <div className="flex-[4] flex flex-col items-start gap-[0.5rem]">
                    {/* Price and Name */}
                    <div className="w-full flex items-center justify-between gap-[0.5rem]">
                        <div className="flex flex-col gap-[0.25rem]">
                            <p className="text-[1rem] font-medium">{item.variant.name}</p>
                            <p className="text-[0.75rem] text-[var(--Colors-Neutral-500)] font-medium">
                                SKU: <span className="!text-black font-normal">{item.variant.sku}</span>
                            </p>
                        </div>

                        <div className="flex-[1] flex items-center justify-end">
                            {isLoading ? (
                                <span
                                    className="inline-block h-[1rem] w-[4.5rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse"
                                    aria-busy="true"
                                />
                            ) : (
                                <span className="text-[1rem] font-semibold">
                                    ${item.variant.finalPrice}/
                                    <span className="text-[0.75rem] text-[var(--Colors-Neutral-500)] font-normal">each</span>
                                </span>
                            )}
                        </div>
                    </div>

                    {item.variant.attribute && <div>
                        {Object.entries(item.variant.attribute).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-[0.75rem] text-[var(--Colors-Neutral-700)] font-medium">
                                    {key}: {value as any}
                                </p>
                            </div>
                        ))}
                    </div>}

                    {/* Fulfillment Method */}
                    {item.variant.supportedFulfillmentMethods?.length ? (
                        <div className="flex items-center gap-[0.5rem] flex-wrap">
                            {item.variant.supportedFulfillmentMethods.map((method) => {
                                const isSelected = item.fulfillmentMethod === method;
                                return (
                                    <button
                                        key={method}
                                        type="button"

                                        onClick={() => {
                                            if (isSelected) return;
                                            updateFulfillment({
                                                variantId: item.variant._id,
                                                fromFulfillmentMethod: item.fulfillmentMethod,
                                                toFulfillmentMethod: method,
                                            });
                                        }}
                                        className={`text-[0.875rem] cursor-pointer ${isSelected ? "bg-[var(--primary-500-main)] text-white" : "text-black"
                                            } py-[0.25rem] px-[0.5rem] rounded-[var(--Radius-md)] border border-[var(--Colors-Neutral-100)]`}
                                        aria-pressed={isSelected}
                                    >
                                        {method}
                                    </button>
                                );
                            })}
                        </div>
                    ) : null}

                    {/* Fulfillment warnings */}
                    {showFulfillmentWarning ? (
                        <div className="w-full rounded-[var(--Radius-xs)] border border-[var(--Colors-Error-200)] bg-[var(--Colors-Error-50)] px-3 py-2">
                            <p className="text-[0.75rem] font-medium text-[var(--Colors-Error-700)]">
                                {fulfillmentWarningMessage}
                            </p>
                        </div>
                    ) : item.isValid === false ? (
                        <div className="w-full rounded-[var(--Radius-xs)] border border-[var(--Colors-Error-200)] bg-[var(--Colors-Error-50)] px-3 py-2">
                            <p className="text-[0.75rem] font-medium text-[var(--Colors-Error-700)]">
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
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={!canDecrement}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <FiMinusCircle className="text-xl cursor-pointer" />
                    </button>

                    <div className="w-10 h-10 flex items-center justify-center select-none">
                        <span className="text-base font-semibold">{quantity}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setQuantity((q) => {
                                if (finiteMethodLimit !== null && q >= finiteMethodLimit) {
                                    return q;
                                }
                                return q + 1;
                            })
                        }
                        disabled={!canIncrement}
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
