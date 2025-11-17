import { atomWithQuery } from 'jotai-tanstack-query';
import { getCategories } from '@/Api/Apis';
import { atom } from 'jotai';

export const categoriesQueryAtom = atomWithQuery(() => ({
    queryKey: ['categories'],
    queryFn: async () => {
        const data = await getCategories();
        return data;
    },

}));

// Flattened lookup map of all subcategories and child subcategories for instant id lookup
export const flattenedSubcategoryMapAtom = atom((get) => {
    const { data, status, error } = get(categoriesQueryAtom);
    if (status !== 'success' || !data) {
        return { data: undefined as undefined | Record<string, Subcategory | ChildSubCategory>, status, error };
    }

    const map: Record<string, Subcategory | ChildSubCategory> = {};

    const addChild = (child: ChildSubCategory) => {
        if (child && child._id) {
            map[child._id] = child;
        }
        if (child?.childSubCategories?.length) {
            child.childSubCategories.forEach(addChild);
        }
    };

    const addSubcategory = (sub: Subcategory) => {
        if (sub && sub._id) {
            map[sub._id] = sub;
        }
        if (sub?.childSubCategories?.length) {
            sub.childSubCategories.forEach((c) => addChild(c as ChildSubCategory));
        }
    };

    (data as Category[]).forEach((cat) => {
        cat?.categorySubCategories?.forEach((sub) => addSubcategory(sub as Subcategory));
    });

    return { data: map, status, error };
});




