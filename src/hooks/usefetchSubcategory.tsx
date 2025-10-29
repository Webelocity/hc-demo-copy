import { fetchSubcategoryById } from '@/Api/Apis';
import { useQuery } from '@tanstack/react-query';

export function useSubcategory(subcatId?: string) {
    return useQuery<Subcategory | ChildSubCategory>({
        queryKey: ['subcategory', subcatId],
        queryFn: () => fetchSubcategoryById(subcatId!),
        enabled: Boolean(subcatId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
