import { calculatePricing, MOCK_PRODUCT } from "./products";
import type { CartState } from "@/atoms/cartAtom";

export type MockCartTotals = {
    productItems: {
        quantity: number;
        productVariantId: string;
        trackQuantity: boolean;
        customInputValues: unknown[];
        customInputFields: unknown[];
        calculatedPrice: number;
        isFinalSale: boolean;
        fulfillmentMethod: FulfillmentMethodEnum;
    }[];
    subTotalDiscount: number;
    additionalCosts: Record<string, number>;
    subTotal: number;
};

export function getMockCartTotals(cart: CartState, _discountIds: string[] = []): MockCartTotals {
    // Calculate per-item pricing using the same logic as single-product mock
    const productItems = cart.map((item) => {
        const variantId = item.variant._id;
        const variant = MOCK_PRODUCT.productVariants.find(v => v._id === variantId);
        const pricing = calculatePricing(item.quantity);
        const perUnitPrice = Number(pricing.finalPrice.toFixed(2));
        return {
            quantity: item.quantity,
            productVariantId: variantId,
            trackQuantity: Boolean(variant?.trackQuantity ?? item.variant.trackQuantity),
            customInputValues: [],
            customInputFields: [],
            calculatedPrice: perUnitPrice,
            isFinalSale: false,
            fulfillmentMethod: (item.fulfillmentMethod ?? 'pickup'),
        };
    });

    const basePrice = 29.99;
    let subTotal = 0;
    let subTotalDiscount = 0;
    for (const p of productItems) {
        subTotal += p.quantity * p.calculatedPrice;
        const unitDiscount = Math.max(0, basePrice - p.calculatedPrice);
        subTotalDiscount += unitDiscount * p.quantity;
    }

    return {
        productItems,
        subTotalDiscount: Number(subTotalDiscount.toFixed(2)),
        additionalCosts: {},
        subTotal: Number(subTotal.toFixed(2)),
    };
}


