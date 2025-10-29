type FetchOptions = {
    headers?: Record<string, string>;
};

type FetchParams = {
    options?: FetchOptions;
    query?: string;
    body?: Record<string, unknown> | string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};
export const constructQueryParams = (
    params: Record<string, string | number | boolean>
) => {
    return Object.keys(params)
        .map(
            (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");
};
const StoreIdValue = process.env.NEXT_PUBLIC_STORE_ID_KEY;
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const fetchWithStoreId = async <T>(
    pathname: string,
    { options = {}, query, body, method = "GET" }: FetchParams = {},
): Promise<T> => {
    if (!baseURL) {
        throw new Error(
            "Base URL is not defined. Please set 'NEXT_PUBLIC_DEV_URL' in environment variables.",
        );
    }
    const currentURL = new URL(baseURL);
    currentURL.pathname = pathname;
    if (query) {
        currentURL.search = query;
    }
    let headers: Record<string, string> = {
        ['x-store-key']: StoreIdValue ?? "",
    };
    if (options.headers) {
        headers = {
            ...headers,
            ...options.headers,
        };
    }
    let requestBody: string | undefined;
    if (body) {
        requestBody = typeof body === "string" ? body : JSON.stringify(body);
        headers["Content-Type"] = "application/json";
    }
    const response = await fetch(currentURL.toString(), {
        headers,
        ...options,
        body: requestBody,
        method,
    });

    const data: T = await response.json();

    if (!response.ok) {
        const ErrorResponse = (data as APIErrorResponse)
        throw new Error(ErrorResponse.message);
    }
    return data;
};
