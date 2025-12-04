type FulfillmentMethod = FulfillmentMethodEnum;

export type FulfillmentAvailability = {
    available: boolean;
    ceiling: number;
};

export type FulfillmentAvailabilityMap = Record<FulfillmentMethod, FulfillmentAvailability>;

export type FulfillmentValidationReason = 'UNAVAILABLE' | 'EXCEEDS' | 'UNSUPPORTED';

const FALLBACK_METHOD_ORDER: FulfillmentMethod[] = ['pickup', 'delivery', 'shipping'];

const IN_STOCK_STATUS = 'IN_STOCK';

const BASE_AVAILABILITY: FulfillmentAvailability = {
    available: false,
    ceiling: 0,
};

const createEmptyAvailabilityMap = (): FulfillmentAvailabilityMap => ({
    pickup: { ...BASE_AVAILABILITY },
    delivery: { ...BASE_AVAILABILITY },
    shipping: { ...BASE_AVAILABILITY },
});

const sumQuantities = (inventories: Inventory[]) =>
    inventories.reduce((total, entry) => total + Math.max(0, entry.quantity ?? 0), 0);

const isInventoryInStock = (inventory?: Inventory | null) => {
    if (!inventory) return false;
    const status = (inventory.status ?? '').toUpperCase();
    return status === IN_STOCK_STATUS && (inventory.quantity ?? 0) > 0;
};

const getDoItBestId = () => process.env.NEXT_PUBLIC_DO_IT_BEST_ID ?? '';

export const formatFulfillmentMethodLabel = (method?: FulfillmentMethod | null) => {
    if (!method) return 'this fulfillment option';
    return method.charAt(0).toUpperCase() + method.slice(1);
};

export const resolveFulfillmentMethod = (
    variant?: ProductVariant | null,
    requested?: FulfillmentMethod | null
): FulfillmentMethod => {
    const variantMethods = Array.isArray(variant?.supportedFulfillmentMethods)
        ? (variant?.supportedFulfillmentMethods as FulfillmentMethod[])
        : [];
    const supportedList = variantMethods.length ? variantMethods : FALLBACK_METHOD_ORDER;

    if (requested && supportedList.includes(requested)) {
        return requested;
    }

    return supportedList.find((method) => FALLBACK_METHOD_ORDER.includes(method)) ?? supportedList[0];
};

export const computeFulfillmentAvailability = (
    variant?: ProductVariant | null,
    selectedStoreId?: string | null,
    options?: { doItBestId?: string }
): FulfillmentAvailabilityMap => {
    const availability = createEmptyAvailabilityMap();
    if (!variant) {
        console.log("no variant");
        return availability;
    }
    console.log(variant);
    console.log(variant.trackQuantity);
    if (!variant.trackQuantity) {
        FALLBACK_METHOD_ORDER.forEach((method) => {
            availability[method] = {
                available: true,
                ceiling: Number.POSITIVE_INFINITY,
            };
        });
        console.log("no track quantity");
        return availability;
    }

    const inventories = Array.isArray(variant.allInventories) ? variant.allInventories : variant.inventory ?? [];
    console.log("inventories", inventories);
    const inStockInventories = inventories.filter((inventory) => isInventoryInStock(inventory));
    const doItBestId = options?.doItBestId ?? getDoItBestId();

    if (selectedStoreId) {
        const pickupInventory = inStockInventories.find((inventory) => inventory.addressId === selectedStoreId);
        if (pickupInventory) {
            availability.pickup = {
                available: true,
                ceiling: pickupInventory.quantity,
            };
        }
    }

    const deliveryInventories = inStockInventories.filter(
        (inventory) => !doItBestId || inventory.addressId !== doItBestId
    );
    if (deliveryInventories.length > 0) {
        availability.delivery = {
            available: true,
            ceiling: sumQuantities(deliveryInventories),
        };
    }

    if (doItBestId) {
        const shippingInventory = inStockInventories.find((inventory) => inventory.addressId === doItBestId);
        if (shippingInventory) {
            availability.shipping = {
                available: true,
                ceiling: shippingInventory.quantity,
            };
        }
    } else if (inStockInventories.length > 0) {
        availability.shipping = {
            available: true,
            ceiling: sumQuantities(inStockInventories),
        };
    }

    return availability;
};

export const validateFulfillmentQuantity = ({
    variant,
    method,
    desiredQuantity,
    selectedStoreId,
    doItBestId,
}: {
    variant: ProductVariant;
    method: FulfillmentMethod | null;
    desiredQuantity: number;
    selectedStoreId?: string | null;
    doItBestId?: string;
}): {
    ok: boolean;
    limit: number;
    method: FulfillmentMethod | null;
    reason?: FulfillmentValidationReason;
} => {
    const resolvedMethod = resolveFulfillmentMethod(variant, method);
    if (!resolvedMethod) {
        return {
            ok: false,
            limit: 0,
            method: null,
            reason: 'UNSUPPORTED',
        };
    }

    if (!variant.trackQuantity) {
        return {
            ok: true,
            limit: Number.POSITIVE_INFINITY,
            method: resolvedMethod,
        };
    }

    const availability = computeFulfillmentAvailability(variant, selectedStoreId, { doItBestId });
    const methodAvailability = availability[resolvedMethod];

    if (!methodAvailability?.available) {
        return {
            ok: false,
            limit: methodAvailability?.ceiling ?? 0,
            method: resolvedMethod,
            reason: 'UNAVAILABLE',
        };
    }

    if (Number.isFinite(methodAvailability.ceiling) && desiredQuantity > methodAvailability.ceiling) {
        return {
            ok: false,
            limit: methodAvailability.ceiling,
            method: resolvedMethod,
            reason: 'EXCEEDS',
        };
    }

    return {
        ok: true,
        limit: methodAvailability.ceiling,
        method: resolvedMethod,
    };
};


