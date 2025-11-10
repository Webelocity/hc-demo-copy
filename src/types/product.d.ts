type Product = {
    _id: string;
    id: string;
    productVariants: ProductVariant[];
    refundPolicy?: string;
    storeId: string;
    name: string;
    description: string;
    productMedia: ProductMedia[];
    thumbnail: ProductMedia;
    defaultPath: { _id: string, name: string }[],
    tags: string[];
    isActive: boolean;
    brand: string;
    sku: string;
    trackQuantity: boolean;
    showStock: boolean;
    upc: string;
    modelNumber: string;
    isFeatured: boolean;
    isDiscounted: boolean;
    discountType?: string;
    discountAmount: number;
    priceBeforeDiscount: number;
    finalPrice: number;
    weight: number;
    inventoryCount: number;
    lowestPriceVariant: ProductVariant;
    totalSold: number;
    totalSales: number;
    frequentlyBoughtProducts: Product[];
    reviews: Review[];
    rating: number;
    bulkPricingTable: BulkPriceRow[],
    productVariantId: string;
    hasCustomInputs: boolean;
    customInputFields: customInputField[];
    attributes: { [key: string]: string[] };
    tables: ProductSpecificationTable[];
    dimensionsTable?: ProductSpecificationTable;
    createdAt: string;
    updatedAt: string;
    __v: number;
    ratings: { [key: string]: number };

}
type ProductVariant = {
    _id: string;
    parentProduct: string;
    parentCategory: string[];
    name: string;
    description: string;
    productMedia: ProductMedia[];
    isActive: boolean;
    width: number;
    height: number;
    length: number;
    weight: number;
    brand: string;
    sku: string;
    attribute: ProductVariantAttribute;
    isDiscounted: boolean;
    discountAmount: number;
    retailPrice: number;
    costPrice: number;
    finalPrice: number;
    wholesalePrice: number;
    totalSold: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    parentSubCategories: string[];
    id: string;
    inventory: Inventory[];
    bulkPricingTable: BulkPriceRow[],
    thumbnail: ProductMedia;
    allowPro: boolean;
    allowRegular: boolean;
    trackQuantity: boolean;
    inventoryCount: number;
    hasCustomInputs: boolean;
    customInputFields: customInputField[];
    rating: number;
    supportedFulfillmentMethods: FulfillmentMethodEnum[];

}
type ProductVariantAttribute = {
    [key: string]: string;
}
type BulkPriceRow = {

    _id: string,
    state: "ACTIVE" | "INACTIVE",
    key: number,
    percentagePerUnit: number,
    BulkDiscountType: "Percentage" | "Fixed",
    allowRegular: boolean
}
type customInputField = {
    label: string,
    isRequired: boolean,
    additionalCost: number,
}
type ObjectValue = {
    key: string;
    value: string;
}

type ProductSpecificationTable = {
    title: string;
    values: ObjectValue[];
}

type ProductVariantPricing = {
    _id: string;
    isDiscounted: boolean;
    retailPrice: number;
    lowestFinalPrice: number;
}
type ProductPricing = {
    productVariants: ProductVariantPricing[];
}

type ProductMedia = {
    _id: string;
    file: string;
    type: string;
    isActive: boolean;
    order: number;
}

type FulfillmentMethodEnum = 'pickup' | 'delivery' | 'shipping';