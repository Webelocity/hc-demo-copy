import { fetchAllProducts, fetchProductsByCategoryId, fetchProductsBySubcategoryId } from '@/Api/Apis';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { useMemo } from 'react';

function parseFilters(searchParams: URLSearchParams) {
    const out: Record<string, any> = {};
    searchParams.forEach((value, key) => {
        if (!['page', 'limit', 'sort', 'category_active', 'subcats'].includes(key)) {
            out[key] = isNaN(Number(value)) ? value : Number(value);
        }
    });
    return out;
}

export function useProducts() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category_active') ?? undefined;
    const subcat = searchParams.get('subcats') ?? undefined;
    const sort = searchParams.get('sort') ?? '';
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '16');
    const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

    const queryKey = [
        'products',
        category,
        subcat,
        sort,
        page,
        limit,
        JSON.stringify(filters),
    ];

    const queryFn = () => {
        if (category) {
            return fetchProductsByCategoryId(category, {
                page,
                limit,
                sort,
                ...filters,
            });
        }
        if (subcat) {
            return fetchProductsBySubcategoryId(subcat, {
                page,
                limit,
                sort,
                ...filters,
            });
        }
        return fetchAllProducts({ page, limit, sort, ...filters });
    };

    return useQuery<ApiResponse<Product>>({
        queryKey,
        queryFn,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
