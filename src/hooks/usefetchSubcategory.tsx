import { useAtomValue } from 'jotai';
import { categoriesQueryAtom, flattenedSubcategoryMapAtom } from '@/atoms/categoryAtom';

export function useSubcategory(subcatId?: string) {
    const { status, error } = useAtomValue(categoriesQueryAtom);
    const { data: flattened } = useAtomValue(flattenedSubcategoryMapAtom);

    const data = subcatId ? flattened?.[subcatId] : undefined;

    return {
        data: data as Subcategory | ChildSubCategory | undefined,
        isLoading: status === 'pending',
        isError: status === 'error',
        error,
        status,
    };
}
