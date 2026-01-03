import { fetchAllProducts } from '@/Api/Apis';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { useMemo } from 'react';

function parseFilters(searchParams: URLSearchParams) {
    const out: Record<string, any> = {};

    // Only use the new, short keys for category and subcategory selections.
    const categoryIds = searchParams.get('cat');
    const subCategoryIds = searchParams.get('sub');

    if (categoryIds) out.categoryIds = categoryIds;
    if (subCategoryIds) out.subCategoryIds = subCategoryIds;

    searchParams.forEach((value, key) => {
        if ([
            'page',
            'limit',
            'sort',
            'cat',
            'sub',
        ].includes(key)) {
            return;
        }
        out[key] = isNaN(Number(value)) ? value : Number(value);
    });
    return out;
}

export function useProducts() {
    const searchParams = useSearchParams();
    const sort = searchParams.get('sort') ?? '';
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '20');
    const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

    const queryKey = [
        'products',
        sort,
        page,
        limit,
        JSON.stringify(filters),
    ];

    const queryFn = () => fetchAllProducts({ page, limit, sort, ...filters });

    return useQuery<ApiResponse<Product>>({
        queryKey,
        queryFn,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
