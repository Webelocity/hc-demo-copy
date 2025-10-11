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
    allInventory: AllInventoryItem[][];
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