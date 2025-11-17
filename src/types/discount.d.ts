type DiscountType = "CATEGORY" | "CART_BALANCE" | "SHIPPING";
type DiscountCondition = "AUTOMATIC" | "MANUAL";

type Discount = {
    _id: string;
    discountName: string;
    description: string;
    discountType: DiscountType;
    decreasePriceBy: "PERCENTAGE" | "AMOUNT"; // Can be Percentage or Amount
    code: string;
    automatic: boolean;
    cappedAt: number;
    amount: number;
    numberOfUses: number;
    state: "ACTIVE" | "INACTIVE";
    categoriesEligible: string[]; // List of category IDs eligible for this discount
    productsEligible: string[]; // List of product IDs eligible for this discount
    variantsEligible: string[]; // List of variants eligible for this discount
    storeId: string;
    minPurchaseRequired: "NO_REQUIREMENT" | "MINIMUM_QUANTITY" | "MINIMUM_AMOUNT"; // Min purchase criteria
    minPurchaseAmount: number; // Amount for minimum purchase
    minPurchaseQuantity: number; // Quantity for minimum purchase
    usersEligible: string[]; // User IDs eligible for this discount
    groupsEligible: string[]; // Groups eligible for this discount
    eligibleZipCodes: string[]; // Zip codes where this discount is eligible
    createdAt: string; // Timestamp
    updatedAt: string; // Timestamp
}

// Minimal shape we persist in state for applied promo codes
type AppliedDiscount = Pick<Discount, "_id" | "discountName" | "code">;