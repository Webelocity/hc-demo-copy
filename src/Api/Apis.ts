import { constructQueryParams, fetchWithStoreId } from "./helpers";

export const getCategories = async (): Promise<Category[]> => {
    const response = await fetchWithStoreId<Category[]>('/categories');
    if (!response) {
        throw new Error('Failed to fetch categories');
    }
    return response;
}
export const fetchAllShopFilters = async (
    params: Record<string, string | number | boolean> = {}
): Promise<AllFiltersResponse> => {
    const query = constructQueryParams(params);
    const pathname = `/products/allFilters`;

    const response = await fetchWithStoreId<AllFiltersResponse>(pathname, {
        method: "GET",
        query,
    });
    if (!response) {
        throw new Error("Error fetching Filters");
    }

    return response;
};
export const fetchProductsByCategoryId = async (
    categoryId: string | undefined,
    params: Record<string, string | number | boolean> = {}
): Promise<ApiResponse<Product>> => {
    const query = constructQueryParams(params); // Construct query string
    const pathname = `/products/allCategoryProducts/${categoryId}`;

    // Pass query string directly to fetchWithStoreId
    const response = await fetchWithStoreId<ApiResponse<Product>>(pathname, {
        method: "GET",
        query, // Pass the constructed query string
    });

    if (!response) {
        throw new Error(`Error fetching products for category ${categoryId}`);
    }

    return response;
};
export const fetchProductsBySubcategoryId = async (
    subcategoryId: string,
    params: Record<string, string | number | boolean> = {}
): Promise<ApiResponse<Product>> => {
    const query = constructQueryParams(params); // Construct query string
    const pathname = `/products/allProducts/${subcategoryId}`;

    // Pass query string directly to fetchWithStoreId
    const response = await fetchWithStoreId<ApiResponse<Product>>(pathname, {
        method: "GET",
        query, // Pass the constructed query string directly
    });

    if (!response) {
        throw new Error(`Error fetching products for subcategory ${subcategoryId}`);
    }

    return response;
};
export const fetchAllProducts = async (
    params: Record<string, string | number | boolean> = {}
): Promise<ApiResponse<Product>> => {
    const query = constructQueryParams(params); // Construct query string
    const pathname = `/products/all`;

    // Pass query string directly to fetchWithStoreId
    const response = await fetchWithStoreId<ApiResponse<Product>>(pathname, {
        method: "GET",
        query, // Pass the constructed query string directly
    });

    if (!response) {
        throw new Error(`Error fetching all products`);
    }

    return response;
};

export const fetchSubcategoryById = async (
    SubcategoryId: string | undefined
): Promise<Subcategory> => {
    const pathname = `/sub-categories/${SubcategoryId}`;

    // Pass query string directly to fetchWithStoreId
    const response = await fetchWithStoreId<Subcategory>(pathname, {
        method: "GET",
    });

    if (!response) {
        throw new Error(`Error fetching Subcateoryd with ID ${SubcategoryId}`);
    }

    return response;
};