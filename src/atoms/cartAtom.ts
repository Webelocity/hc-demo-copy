import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { toast } from 'react-toastify';
import { cartDrawerOpenAtom } from './cartDrawerAtom';
import { selectedStoreAtom } from './storeAtom';
import {
    formatFulfillmentMethodLabel,
    resolveFulfillmentMethod,
    validateFulfillmentQuantity,
    type FulfillmentValidationReason,
} from '@/util/fulfillmentInventory';

export type CartItem = {
    productId: string;
    variant: ProductVariant;
    quantity: number;
    fulfillmentMethod: FulfillmentMethodEnum | null;
    isValid: boolean;
    addedAt: string;
};

export type CartState = CartItem[];

const CART_STORAGE_KEY = 'hc_cart';

export const cartAtom = atomWithStorage<CartState>(CART_STORAGE_KEY, []);

type AddToCartPayload = {
    productId: string;
    variant: ProductVariant;
    quantity: number;
    fulfillmentMethod: FulfillmentMethodEnum | null;
};

type IdentifyPayload = {
    variantId: string;
    fulfillmentMethod: FulfillmentMethodEnum | null;
};

type AdjustQuantityPayload = IdentifyPayload & { amount?: number };

const DO_IT_BEST_ADDRESS_ID = process.env.NEXT_PUBLIC_DO_IT_BEST_ID ?? '';

type QuantityValidation = ReturnType<typeof validateFulfillmentQuantity>;

const notifyFulfillmentError = (
    reason: FulfillmentValidationReason | undefined,
    method: FulfillmentMethodEnum | null,
    limit: number
) => {
    const label = formatFulfillmentMethodLabel(method);
    if (reason === 'UNAVAILABLE') {
        toast.error(`${label} is unavailable for the selected location.`);
        return;
    }
    if (reason === 'EXCEEDS') {
        toast.error(`The maximum available for ${label} is ${limit}.`);
        return;
    }
    toast.error(`Unable to determine a valid fulfillment option for this product.`);
};

const validateQuantityForMethod = ({
    variant,
    method,
    desiredQuantity,
    selectedStoreId,
}: {
    variant: ProductVariant;
    method: FulfillmentMethodEnum;
    desiredQuantity: number;
    selectedStoreId?: string | null;
}): QuantityValidation => {
    return validateFulfillmentQuantity({
        variant,
        method,
        desiredQuantity,
        selectedStoreId,
        doItBestId: DO_IT_BEST_ADDRESS_ID,
    });
};

const findCartItemIndex = (
    items: CartState,
    variantId: string,
    method?: FulfillmentMethodEnum | null
) =>
    items.findIndex((item) => {
        if (item.variant._id !== variantId) {
            return false;
        }
        if (method === undefined) {
            return true;
        }
        const normalizedExisting = resolveFulfillmentMethod(item.variant, item.fulfillmentMethod);
        const normalizedTarget = resolveFulfillmentMethod(item.variant, method);
        if (!normalizedExisting || !normalizedTarget) {
            return false;
        }
        return normalizedExisting === normalizedTarget;
    });

const findFulfillmentConflict = (
    items: CartState,
    variant: ProductVariant,
    fulfillmentMethod: FulfillmentMethodEnum | null
) => {
    const incomingMethod = resolveFulfillmentMethod(variant, fulfillmentMethod);
    if (!incomingMethod) {
        return undefined;
    }
    return items.find((item) => {
        if (item.variant._id !== variant._id) {
            return false;
        }
        const existingMethod = resolveFulfillmentMethod(item.variant, item.fulfillmentMethod);
        return existingMethod !== null && existingMethod !== incomingMethod;
    });
};

export const addToCartAtom = atom(null, (get, set, payload: AddToCartPayload) => {
    const { productId, variant, quantity, fulfillmentMethod } = payload;
    const selectedStoreId = get(selectedStoreAtom);
    let itemAdded = false;
    set(cartAtom, (prev) => {
        const resolvedMethod = resolveFulfillmentMethod(variant, fulfillmentMethod);
        if (!resolvedMethod) {
            toast.error(`No fulfillment option is available for ${variant.name}.`);
            return prev;
        }

        const conflictingItem = findFulfillmentConflict(prev, variant, resolvedMethod);
        if (conflictingItem) {
            toast.error(`${variant.name} has another fulfilment method chosen for it`);
            return prev;
        }

        const qtyToAdd = Math.max(1, Math.floor(quantity));
        const index = findCartItemIndex(prev, variant._id, resolvedMethod);
        const currentQty = index >= 0 ? prev[index].quantity : 0;
        const desiredQty = currentQty + qtyToAdd;

        const validation = validateQuantityForMethod({
            variant,
            method: resolvedMethod,
            desiredQuantity: desiredQty,
            selectedStoreId,
        });

        if (!validation.ok || !validation.method) {
            notifyFulfillmentError(validation.reason, validation.method, validation.limit);
            return prev;
        }
        const validMethod = validation.method;

        let next: CartState;
        if (index >= 0) {
            next = [...prev];
            const current = next[index];
            next[index] = {
                ...current,
                quantity: desiredQty,
                fulfillmentMethod: validMethod,
                isValid: true,
            };
        } else {
            next = [
                ...prev,
                {
                    productId,
                    variant,
                    quantity: qtyToAdd,
                    fulfillmentMethod: validMethod,
                    isValid: true,
                    addedAt: new Date().toISOString(),
                },
            ];
        }
        toast.success(`${variant.name} added to cart successfully`);
        itemAdded = true;
        return next;
    });
    if (itemAdded) {
        set(cartDrawerOpenAtom, true);
    }
});

export const addAllToCartAtom = atom(null, (get, set, items: AddToCartPayload[]) => {
    const selectedStoreId = get(selectedStoreAtom);
    let addedAny = false;
    let conflictDetected = false;
    set(cartAtom, (prev) => {
        const next = [...prev];
        for (const { productId, variant, quantity, fulfillmentMethod } of items) {
            if (conflictDetected) {
                break;
            }

            const resolvedMethod = resolveFulfillmentMethod(variant, fulfillmentMethod);
            if (!resolvedMethod) {
                toast.error(`No fulfillment option is available for ${variant.name}.`);
                conflictDetected = true;
                break;
            }

            const conflict = findFulfillmentConflict(next, variant, resolvedMethod);
            if (conflict) {
                toast.error(`${variant.name} has another fulfilment method chosen for it`);
                conflictDetected = true;
                break;
            }

            const qtyToAdd = Math.max(1, Math.floor(quantity));
            const index = findCartItemIndex(next, variant._id, resolvedMethod);
            const currentQty = index >= 0 ? next[index].quantity : 0;
            const desiredQty = currentQty + qtyToAdd;

            const validation = validateQuantityForMethod({
                variant,
                method: resolvedMethod,
                desiredQuantity: desiredQty,
                selectedStoreId,
            });

            if (!validation.ok || !validation.method) {
                notifyFulfillmentError(validation.reason, validation.method, validation.limit);
                conflictDetected = true;
                break;
            }
            const validMethod = validation.method;

            if (index >= 0) {
                next[index] = {
                    ...next[index],
                    quantity: desiredQty,
                    fulfillmentMethod: validMethod,
                    isValid: true,
                };
            } else {
                next.push({
                    productId,
                    variant,
                    quantity: qtyToAdd,
                    fulfillmentMethod: validMethod,
                    isValid: true,
                    addedAt: new Date().toISOString(),
                });
            }
            addedAny = true;
        }

        if (conflictDetected || !addedAny) {
            return prev;
        }

        return next;
    });
    if (conflictDetected) {
        return;
    }
    if (addedAny) {
        toast.success(`${items.length} items added to cart successfully`);
        set(cartDrawerOpenAtom, true);
    }
});

export const increaseQuantityAtom = atom(
    null,
    (get, set, payload: AdjustQuantityPayload) => {
        const { variantId, fulfillmentMethod, amount = 1 } = payload;
        const selectedStoreId = get(selectedStoreAtom);
        set(cartAtom, (prev) => {
            const index = findCartItemIndex(prev, variantId, fulfillmentMethod ?? undefined);
            if (index < 0) return prev;
            const next = [...prev];
            const current = next[index];
            const incrementBy = Math.max(1, Math.floor(amount));
            const normalizedMethod = resolveFulfillmentMethod(current.variant, current.fulfillmentMethod);
            if (!normalizedMethod) {
                toast.error(`No fulfillment option is available for ${current.variant.name}.`);
                return prev;
            }
            const desiredQty = current.quantity + incrementBy;
            const validation = validateQuantityForMethod({
                variant: current.variant,
                method: normalizedMethod,
                desiredQuantity: desiredQty,
                selectedStoreId,
            });
            if (!validation.ok || !validation.method) {
                notifyFulfillmentError(validation.reason, validation.method, validation.limit);
                return prev;
            }
            const validMethod = validation.method;
            next[index] = {
                ...current,
                quantity: desiredQty,
                fulfillmentMethod: validMethod,
                isValid: true,
            };
            return next;
        });
    }
);

export const decreaseQuantityAtom = atom(
    null,
    (get, set, payload: AdjustQuantityPayload) => {
        const { variantId, fulfillmentMethod, amount = 1 } = payload;
        const selectedStoreId = get(selectedStoreAtom);
        set(cartAtom, (prev) => {
            const index = findCartItemIndex(prev, variantId, fulfillmentMethod ?? undefined);
            if (index < 0) return prev;
            const next = [...prev];
            const current = next[index];
            const decrementBy = Math.max(1, Math.floor(amount));
            const newQty = Math.max(1, current.quantity - decrementBy);
            const normalizedMethod = resolveFulfillmentMethod(current.variant, current.fulfillmentMethod);
            if (!normalizedMethod) {
                next[index] = { ...current, quantity: newQty, isValid: false };
                return next;
            }
            const validation = validateQuantityForMethod({
                variant: current.variant,
                method: normalizedMethod,
                desiredQuantity: newQty,
                selectedStoreId,
            });
            next[index] = {
                ...current,
                quantity: newQty,
                isValid: validation.ok,
            };
            return next;
        });
    }
);

export const deleteFromCartAtom = atom(
    null,
    (get, set, payload: IdentifyPayload) => {
        const { variantId, fulfillmentMethod } = payload;
        set(cartAtom, (prev) => {
            const index = findCartItemIndex(prev, variantId, fulfillmentMethod ?? undefined);
            if (index < 0) {
                return prev;
            }
            const next = [...prev];
            next.splice(index, 1);
            return next;
        });
    }
);

type UpdateFulfillmentPayload = {
    variantId: string;
    fromFulfillmentMethod: FulfillmentMethodEnum | null;
    toFulfillmentMethod: FulfillmentMethodEnum;
};

export const updateFulfillmentAtom = atom(
    null,
    (get, set, payload: UpdateFulfillmentPayload) => {
        const { variantId, fromFulfillmentMethod, toFulfillmentMethod } = payload;
        const selectedStoreId = get(selectedStoreAtom);
        set(cartAtom, (prev) => {
            const fromIndex = findCartItemIndex(prev, variantId, fromFulfillmentMethod ?? undefined);
            if (fromIndex < 0) {
                return prev;
            }

            const currentItem = prev[fromIndex];
            const normalizedTarget = resolveFulfillmentMethod(currentItem.variant, toFulfillmentMethod);
            if (!normalizedTarget) {
                toast.error(`No fulfillment option is available for ${currentItem.variant.name}.`);
                return prev;
            }

            const currentMethod = resolveFulfillmentMethod(currentItem.variant, currentItem.fulfillmentMethod);
            if (currentMethod === normalizedTarget) {
                return prev;
            }

            const toIndex = findCartItemIndex(prev, variantId, normalizedTarget);
            const destinationQty = toIndex >= 0 ? prev[toIndex].quantity : 0;
            const desiredQty = currentItem.quantity + destinationQty;

            const validation = validateQuantityForMethod({
                variant: currentItem.variant,
                method: normalizedTarget,
                desiredQuantity: desiredQty,
                selectedStoreId,
            });

            const applyUpdate = (isValid: boolean, methodOverride?: FulfillmentMethodEnum | null) => {
                const next = [...prev];
                const targetMethod = methodOverride ?? normalizedTarget;
                if (toIndex >= 0 && toIndex !== fromIndex) {
                    next[toIndex] = {
                        ...next[toIndex],
                        quantity: desiredQty,
                        fulfillmentMethod: targetMethod,
                        isValid,
                    };
                    next.splice(fromIndex, 1);
                } else {
                    next[fromIndex] = {
                        ...currentItem,
                        fulfillmentMethod: targetMethod,
                        isValid,
                    };
                }
                return next;
            };

            if (validation.ok && validation.method) {
                return applyUpdate(true, validation.method);
            }

            if (validation.reason === 'EXCEEDS' && validation.method) {
                toast.warning(
                    `Only ${validation.limit} available for ${formatFulfillmentMethodLabel(validation.method)}. Reduce the quantity or choose another method.`
                );
                return applyUpdate(false, validation.method);
            }

            notifyFulfillmentError(validation.reason, validation.method, validation.limit);
            return prev;
        });
    }
);


