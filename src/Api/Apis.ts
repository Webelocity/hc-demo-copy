import { constructQueryParams, fetchWithStoreId } from "./helpers";
import type { CartState } from "@/atoms/cartAtom";
import type { CheckoutShippingLocation } from "@/types/checkout";

// Toggle to use mock data (set to false when backend is ready)

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
    params: Record<string, string | number | boolean> = {},
): Promise<Product> => {
    if (!productId) {
        // Could throw here or handle the error so the function never returns `undefined`
        throw new Error("No productId provided");
    }



    const query = constructQueryParams({ ...params });
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
export const fetchRelatedProducts = async (
    productId: string,
    params: Record<string, string | number | boolean> = {}
): Promise<Product[]> => {
    const query = constructQueryParams(params);
    const pathname = `/products/relatedProducts/${productId}`;
    const response = await fetchWithStoreId<Product[]>(pathname, {
        method: "GET",
        query,
    });
    if (!response) {
        throw new Error("Error Fetching Related Products");
    }
    return response;
};

// VersaPay helpers (client -> your backend). For now, log and return backend response or a mock.
export const versapayConfirmMethod = async (
    payload?: { orderId?: string; paymentIntentId?: string; billingAddressId?: string }
): Promise<any> => {
    try {
        // eslint-disable-next-line no-console
        // Use guest endpoint for checkout (no JWT required)
        const res = await fetchWithStoreId<any>('/payments/orders/guest-process-payment', {
            method: "POST",
            body: {
                orderId: payload?.orderId,
                provider: 'Versapay',  // Specify VersaPay gateway
                paymentIntentId: payload?.paymentIntentId,  // VersaPay token
                billingAddressId: payload?.billingAddressId,
            },
        });
        // eslint-disable-next-line no-console
        return res;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('VersaPay payment error:', err);
        throw err;  // Throw error instead of returning mock for proper error handling
    }
};

/**
 * Process VersaPay payment for an order
 * @param paymentToken - Token from VersaPay Collect.js tokenization
 * @param orderId - Order ID from created order
 * @param billingAddressId - Billing address ID (optional)
 * @returns Object with success status, optional message, and optional pending flag
 */
export const processVersapayPayment = async (
    paymentToken: string,
    orderId: string,
    billingAddressId?: string // Optional - backend will fetch from user if not provided
): Promise<{ success: boolean; message?: string; data?: { pending?: boolean;[key: string]: any } }> => {
    try {
        const payload = {
            orderId,
            paymentIntentId: paymentToken,  // VersaPay token renamed to paymentIntentId
            billingAddressId,
        };

        const result = await versapayConfirmMethod(payload);

        // Check if payment was successful or pending (webhook-based flow)
        if (result?.success === true || result?.pending === true) {
            return {
                success: true,
                data: {
                    pending: result?.pending === true,
                    ...result
                }
            };
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

export const fetchOrderById = async (
    orderId: string,
    email: string
): Promise<Order> => {
    const pathname = `/orders/get-guest-order/${orderId}`;
    const response = await fetchWithStoreId<Order>(pathname, {
        method: "POST",
        body: {
            email,
        },
    });
    if (!response) {
        throw new Error("Error Fetching Order");
    }
    return response;
};