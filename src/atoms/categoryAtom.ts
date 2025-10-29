import { atomWithQuery } from 'jotai-tanstack-query';
import { getCategories } from '@/Api/Apis';

export const categoriesQueryAtom = atomWithQuery(() => ({
    queryKey: ['categories'],
    queryFn: async () => {
        const data = await getCategories();
        return data;
    },

}));




