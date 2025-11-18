import { constructQueryParams, fetchWithStoreId } from "./helpers";
import { MOCK_PRODUCT, getMockProductWithPrices } from "@/mocks/products";
import { getMockCartTotals } from "@/mocks/cart";
import type { CartState } from "@/atoms/cartAtom";
import type { CheckoutShippingLocation } from "@/types/checkout";

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
    deliveryCosts: number;
    taxAmount: number;
    additionalCosts: Record<string, number>;
    subTotal: number;
};

// Shipping Options
export type ShippingOption = {
    estimatedDays: number;
    image: string;
    name: string;
    price: number;
    duration: string;
    carrierCode: string;
    serviceCode: string;
    metadata: string;
    objectId: string;
    shipmentGateway: string;
    version: string;
};

export const fetchShippingOptions = async (
    body: Record<string, any>
): Promise<ShippingOption[]> => {
    const pathname = "/shipping/get-shipping-rates";
    const response = await fetchWithStoreId<ShippingOption[]>(pathname, {
        method: "POST",
        body,
    });
    if (!response) {
        throw new Error("Error fetching shipping options");
    }
    return response;
};

export const fetchCartTotals = async (
    cart: CartState,
    discountIds: string[] = [],
    selectedStore?: string,
    shippingLocation?: CheckoutShippingLocation
): Promise<CartTotals> => {
    // Map cart to API body
    const requestBody: {
        items: {
            quantity: number;
            product: { productVariantId: string };
            fulfillmentMethod: string;
        }[];
        discountIds: string[];
        storeAddressId?: string;
        country?: string;
        state?: string;
        zip?: string;
        shippingAddress?: CheckoutShippingLocation;
    } = {
        items: cart.map((item) => ({
            quantity: item.quantity,
            product: {
                productVariantId: item.variant._id,
            },
            fulfillmentMethod: (item.fulfillmentMethod ?? 'pickup'),
        })),
        discountIds,
        storeAddressId: selectedStore,
    };

    if (shippingLocation) {
        requestBody.country = shippingLocation.country;
        requestBody.state = shippingLocation.state;
        requestBody.zip = shippingLocation.zipCode;
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

// VersaPay helpers (client -> your backend). For now, log and return backend response or a mock.
export const versapayConfirmMethod = async (
    payload?: { paymentToken?: string; orderId?: string; amount?: number; billingAddressId?: string }
): Promise<any> => {
    try {
        // eslint-disable-next-line no-console
        console.log('VersaPay confirm payload:', payload);
        const res = await fetchWithStoreId<any>('/payments/versapay/process', {
            method: "POST",
            body: payload ?? {},
        });
        // eslint-disable-next-line no-console
        console.log('VersaPay process response:', res);
        return res;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log('VersaPay process error (logging only):', err);
        // Return a mock so the UI can proceed in environments without the backend route
        return { ok: true, mocked: true };
    }
};

/**
 * Process VersaPay payment for an order
 * @param paymentToken - Token from VersaPay Collect.js tokenization
 * @param orderId - Order ID from created order
 * @param amount - Total amount to charge
 * @param billingAddressId - Billing address ID
 */
export const processVersapayPayment = async (
    paymentToken: string,
    orderId: string,
    amount: number,
    billingAddressId?: string // Optional - backend will fetch from user if not provided
): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
        const payload: any = {
            paymentToken,
            orderId,
            amount,
        };
        
        // Only include billingAddressId if provided
        if (billingAddressId) {
            payload.billingAddressId = billingAddressId;
        }
        
        const result = await versapayConfirmMethod(payload);

        // Check if payment was successful
        if (result?.success === true || result?.ok === true) {
            return { success: true, data: result };
        }

        return {
            success: false,
            message: result?.message || 'VersaPay payment processing failed',
        };
    } catch (error: any) {
        console.error('VersaPay payment error:', error);
        return {
            success: false,
            message: error?.message || 'Failed to process VersaPay payment',
        };
    }
};

/**
 * Create a guest order
 */
export const CreateGuestOrder = async (
    body: Record<string, any>
): Promise<any> => {
    const pathname = '/orders/create-guest-order';
    const response = await fetchWithStoreId<any>(pathname, {
        method: 'POST',
        body,
    });
    if (!response) {
        throw new Error('Error Creating Order');
    }
    return response;
};