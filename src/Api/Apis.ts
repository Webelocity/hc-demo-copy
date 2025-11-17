import { constructQueryParams, fetchWithStoreId } from "./helpers";
import { MOCK_PRODUCT, getMockProductWithPrices } from "@/mocks/products";
import { getMockCartTotals } from "@/mocks/cart";
import type { CartState } from "@/atoms/cartAtom";

// Toggle to use mock data (set to false when backend is ready)
const USE_MOCK_DATA = false;

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

export const fetchSingleProductById = async (
    productId: string | undefined,
    params: Record<string, string | number | boolean> = {}
): Promise<Product> => {
    if (!productId) {
        // Could throw here or handle the error so the function never returns `undefined`
        throw new Error("No productId provided");
    }

    // Use mock data if enabled (import directly, no HTTP call needed)
    if (USE_MOCK_DATA) {
        // Simulate network delay for realistic testing
        await new Promise(resolve => setTimeout(resolve, 300));

        if (productId === MOCK_PRODUCT._id || productId === MOCK_PRODUCT.id || productId === 'prod_12345') {
            return MOCK_PRODUCT;
        }
        throw new Error(`Mock product not found with ID ${productId}. Use 'prod_12345' for testing.`);
    }

    const query = constructQueryParams(params);
    const pathname = `/products/singleProduct/${productId}`;

    const response = await fetchWithStoreId<Product>(pathname, {
        method: "GET",
        query,
    });

    if (!response) {
        // Could throw here, or handle however you'd like
        throw new Error(`Error fetching product with ID ${productId}`);
    }

    return response; // Always a Product, never undefined
};

export const fetchSingleProductByIdPrices = async (
    variantId: string | undefined,
    params: Record<string, string | number | boolean> = {}
): Promise<ProductPricing> => {
    if (!variantId) {
        throw new Error("No productId provided");
    }

    // Use mock data if enabled (import directly, no HTTP call needed)
    if (USE_MOCK_DATA) {
        // Simulate network delay for realistic testing
        await new Promise(resolve => setTimeout(resolve, 200));

        const quantity = Number(params.quantity) || 1;

        if (variantId === MOCK_PRODUCT._id || variantId === MOCK_PRODUCT.id || variantId === 'prod_12345') {
            return getMockProductWithPrices(quantity);
        }
        throw new Error(`Mock product not found with ID ${variantId}. Use 'prod_12345' for testing.`);
    }

    const query = constructQueryParams(params);
    const pathname = `/products/singleProduct/${variantId}/prices`;
    const response = await fetchWithStoreId<ProductPricing>(pathname, {
        method: "GET",
        query,
    });
    if (!response) {
        throw new Error(`Error fetching product prices with ID ${variantId}`);
    }
    return response;
}

export type CartTotalsProductItem = {
    quantity: number;
    productVariantId: string;
    trackQuantity: boolean;
    customInputValues: unknown[];
    customInputFields: unknown[];
    calculatedPrice: number; // per unit final price
    isFinalSale: boolean;
    fulfillmentMethod: FulfillmentMethodEnum;
};

export type CartTotals = {
    productItems: CartTotalsProductItem[];
    subTotalDiscount: number;
    additionalCosts: Record<string, number>;
    subTotal: number;
};

export const fetchCartTotals = async (cart: CartState, discountIds: string[] = [], selectedStore?: string): Promise<CartTotals> => {
    // Map cart to API body
    const requestBody = {
        items: cart.map((item) => ({
            quantity: item.quantity,
            product: {
                productVariantId: item.variant._id,
            },
            fulfillmentMethod: (item.fulfillmentMethod ?? 'pickup'),
        })),
        discountIds,
        // Hard-code order type for now as requested
        orderType: "Pickup",
        storeAddressId: selectedStore,
    };

    if (USE_MOCK_DATA) {
        // simulate latency
        await new Promise((r) => setTimeout(r, 350));
        return getMockCartTotals(cart, discountIds);
    }

    const pathname = `/cart/calculate-prices`;
    const response = await fetchWithStoreId<CartTotals>(pathname, {
        method: "POST",
        body: requestBody,
    });
    if (!response) {
        throw new Error(`Error fetching cart totals`);
    }
    return response;
}

export const validatePromoCode = async (
    discountCode: string,
    totalPrice: number,
    cartItemsLength: number,
    zipCode?: string
): Promise<Discount> => {
    const pathname = "/discounts/validate";

    const requestBody = {
        purchaseAmount: totalPrice,
        purchaseQuantity: cartItemsLength,
        zipCode,
    };

    try {
        const response = await fetchWithStoreId<Discount>(pathname, {
            method: "POST",
            body: requestBody,
            query: `code=${discountCode}`,
        });

        if (!response) {
            throw new Error("Invalid or expired promo code");
        }

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
};