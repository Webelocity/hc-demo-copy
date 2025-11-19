import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { toast } from 'react-toastify';
import { cartDrawerOpenAtom } from './cartDrawerAtom';

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

export const addToCartAtom = atom(null, (get, set, payload: AddToCartPayload) => {
    const { productId, variant, quantity, fulfillmentMethod } = payload;
    set(cartAtom, (prev) => {
        const index = prev.findIndex(
            (item) =>
                item.variant._id === variant._id &&
                item.fulfillmentMethod === fulfillmentMethod
        );

        const qtyToAdd = Math.max(1, Math.floor(quantity));
        let next: CartState;
        if (index >= 0) {
            next = [...prev];
            const current = next[index];
            // Respect inventory tracking if provided on variant
            const maxQty = variant.trackQuantity ? variant.inventoryCount : Number.POSITIVE_INFINITY;
            const newQty = Math.min(current.quantity + qtyToAdd, maxQty);
            next[index] = { ...current, quantity: newQty };
        } else {
            next = [
                ...prev,
                {
                    productId,
                    variant,
                    quantity: qtyToAdd,
                    fulfillmentMethod,
                    isValid: true,
                    addedAt: new Date().toISOString(),
                },
            ];
        }
        toast.success(`${variant.name} added to cart successfully`);
        console.log('cart (next)', next);
        return next;
    });
    set(cartDrawerOpenAtom, true);
});

export const addAllToCartAtom = atom(null, (get, set, items: AddToCartPayload[]) => {
    set(cartAtom, (prev) => {
        const next = [...prev];
        items.forEach(({ productId, variant, quantity, fulfillmentMethod }) => {
            const index = next.findIndex(
                (item) =>
                    item.variant._id === variant._id &&
                    item.fulfillmentMethod === fulfillmentMethod
            );

            const qtyToAdd = Math.max(1, Math.floor(quantity));
            if (index >= 0) {
                const current = next[index];
                const maxQty = variant.trackQuantity ? variant.inventoryCount : Number.POSITIVE_INFINITY;
                const newQty = Math.min(current.quantity + qtyToAdd, maxQty);
                next[index] = { ...current, quantity: newQty };
            } else {
                next.push({
                    productId,
                    variant,
                    quantity: qtyToAdd,
                    fulfillmentMethod,
                    isValid: true,
                    addedAt: new Date().toISOString(),
                });
            }
        });
        console.log('cart (add all)', next);
        return next;
    });
    toast.success(`${items.length} items added to cart successfully`);
    set(cartDrawerOpenAtom, true);
});

export const increaseQuantityAtom = atom(
    null,
    (get, set, payload: AdjustQuantityPayload) => {
        const { variantId, fulfillmentMethod, amount = 1 } = payload;
        set(cartAtom, (prev) => {
            const index = prev.findIndex(
                (item) =>
                    item.variant._id === variantId &&
                    item.fulfillmentMethod === fulfillmentMethod
            );
            if (index < 0) return prev;
            const next = [...prev];
            const current = next[index];
            const incrementBy = Math.max(1, Math.floor(amount));
            const maxQty = current.variant.trackQuantity
                ? current.variant.inventoryCount
                : Number.POSITIVE_INFINITY;
            next[index] = {
                ...current,
                quantity: Math.min(current.quantity + incrementBy, maxQty),
            };

            console.log('cart (increase)', next);
            return next;
        });
    }
);

export const decreaseQuantityAtom = atom(
    null,
    (get, set, payload: AdjustQuantityPayload) => {
        const { variantId, fulfillmentMethod, amount = 1 } = payload;
        set(cartAtom, (prev) => {
            const index = prev.findIndex(
                (item) =>
                    item.variant._id === variantId &&
                    item.fulfillmentMethod === fulfillmentMethod
            );
            if (index < 0) return prev;
            const next = [...prev];
            const current = next[index];
            const decrementBy = Math.max(1, Math.floor(amount));
            const newQty = Math.max(1, current.quantity - decrementBy);
            next[index] = { ...current, quantity: newQty };
            console.log('cart (decrease)', next);
            return next;
        });
    }
);

export const deleteFromCartAtom = atom(
    null,
    (get, set, payload: IdentifyPayload) => {
        const { variantId, fulfillmentMethod } = payload;
        set(cartAtom, (prev) => {
            const next = prev.filter(
                (item) =>
                    !(item.variant._id === variantId &&
                        item.fulfillmentMethod === fulfillmentMethod)
            );
            console.log('cart (delete)', next);
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
        set(cartAtom, (prev) => {
            const fromIndex = prev.findIndex(
                (ci) =>
                    ci.variant._id === variantId &&
                    ci.fulfillmentMethod === fromFulfillmentMethod
            );
            if (fromIndex < 0) return prev;
            const toIndex = prev.findIndex(
                (ci) =>
                    ci.variant._id === variantId &&
                    ci.fulfillmentMethod === toFulfillmentMethod
            );
            const next = [...prev];
            if (toIndex >= 0) {
                const mergedQty = next[fromIndex].quantity + next[toIndex].quantity;
                next[toIndex] = { ...next[toIndex], quantity: mergedQty };
                next.splice(fromIndex, 1);
            } else {
                next[fromIndex] = {
                    ...next[fromIndex],
                    fulfillmentMethod: toFulfillmentMethod,
                };
            }
            console.log('cart (update fulfillment)', next);
            return next;
        });
    }
);


