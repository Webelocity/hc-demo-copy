type APIErrorResponse = {
    message: string;
    statusCode: number;
}
type ApiResponse<T> = {
    currentPage: number;
    data: T[];
    limit: number;
    totalItems: number;
    totalPages: number;
}
type AllFiltersResponse = {
    brands: Record<string, number>;
    priceRange: {
        minPrice: number;
        maxPrice: number;
    };
    attributes: Record<string, Record<string, number>>;
}

type Category = {
    _id: string;
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    refundPolicy: string;
    activeChangedAt: string; // ISO string for date
    order: number;
    storeId: string;
    categoryProducts: string[]; // Array of product IDs
    categoryProductVariants: string[]; // Array of product variant IDs
    embedding: string[]; // Array of embeddings (could be strings or more complex objects if needed)
    categorySubCategories: Subcategory[];
    productCount: number;
}

// Main Subcategory type
type Subcategory = {
    _id: string;
    parentCategory: string; // ID of the parent category
    parentSubCategory: string; // ID of the parent subcategory
    subCategoryProducts: string[]; // Array of product IDs
    subCategoryVariants: string[]; // Array of variant IDs
    refundPolicy: string;
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    activeChangedAt: string; // ISO string for date
    createdAt: string; // ISO string for creation date
    updatedAt: string; // ISO string for update date
    storeId: string;
    childSubCategories: ChildSubCategory[];

}
// Type for child subcategories within a subcategory or category
type ChildSubCategory = {
    _id: string;
    name: string;
    image?: string;
    isActive: boolean;
    id: string;
    productCount: number;
    childSubCategories: ChildSubCategory[];
    parentCategory?: string; // ID of the parent category

}