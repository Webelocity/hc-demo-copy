'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAtomValue } from "jotai";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShopFilters } from "@/Api/Apis";

interface ActiveFiltersProps {
    selectedSubCat?: Subcategory | ChildSubCategory;
}

export default function ActiveFilters({ selectedSubCat }: ActiveFiltersProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const categories = useAtomValue(categoriesQueryAtom);
    const categoriesData = categories.data;
    const { data: filtersData } = useQuery<AllFiltersResponse>({
        queryKey: ['ActiveFiltersAllFilters'],
        queryFn: () => fetchAllShopFilters({ isActive: true }),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const findNodeById = (id: string): Category | Subcategory | ChildSubCategory | undefined => {
        if (!categoriesData) return undefined;
        for (const cat of categoriesData as Category[]) {
            if (cat._id === id) return cat;
            if (cat.categorySubCategories) {
                for (const sub of cat.categorySubCategories) {
                    if (sub._id === id) return sub;
                    if (sub.childSubCategories) {
                        for (const child of sub.childSubCategories) {
                            if (child._id === id) return child;
                        }
                    }
                }
            }
        }
        return undefined;
    };

    // Get active filters from URL
    const activeFilters = useMemo(() => {
        const filters: Array<{ key: string; value: string; displayValue: string }> = [];

        const catParam = searchParams.get('cat');
        if (catParam) {
            catParam.split(',').filter(Boolean).forEach((id) => {
                const node = findNodeById(id);
                filters.push({
                    key: 'cat',
                    value: id,
                    displayValue: node?.name ?? id,
                });
            });
        }

        const subParam = searchParams.get('sub');
        if (subParam) {
            subParam.split(',').filter(Boolean).forEach((id) => {
                const node = findNodeById(id);
                filters.push({
                    key: 'sub',
                    value: id,
                    displayValue: node?.name ?? id,
                });
            });
        }

        searchParams.forEach((value, key) => {
            // Skip pagination, sort, and internal params
            if (['page', 'limit', 'sort', 'availability', 'cat', 'sub'].includes(key)) {
                return;
            }

            // Handle price range
            if (key === 'minPrice') {
                const maxPrice = searchParams.get('maxPrice');
                if (maxPrice) {
                    filters.push({
                        key: 'price',
                        value: `${value}-${maxPrice}`,
                        displayValue: `$${value} - $${maxPrice}`,
                    });
                }
                return;
            }

            // Skip maxPrice as it's handled with minPrice
            if (key === 'maxPrice') {
                return;
            }

            // Handle promotional categories (ids -> names)
            if (key === 'promotionalCategories' && filtersData?.promo) {
                const promoMap = new Map(filtersData.promo.map((p) => [p._id, p.name]));
                const ids = value.split(',');
                ids.forEach((id) => {
                    const promoName = promoMap.get(id) ?? id;
                    filters.push({
                        key,
                        value: id,
                        displayValue: promoName,
                    });
                });
                return;
            }

            // Handle featured
            if (key === 'isFeatured') {
                const featuredLabel = Object.keys(filtersData?.featured ?? {})[0] || 'Featured Products';
                filters.push({
                    key,
                    value,
                    displayValue: featuredLabel,
                });
                return;
            }

            // Handle brandFilter
            if (key === 'brandFilter') {
                const brands = value.split(',');
                brands.forEach((brand) => {
                    filters.push({
                        key,
                        value: brand,
                        displayValue: brand,
                    });
                });
                return;
            }

            // Handle any other dynamic attributes
            const values = value.split(',');
            values.forEach((val) => {
                // Capitalize first letter of key for better display
                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
                filters.push({
                    key,
                    value: val,
                    displayValue: `${formattedKey}: ${val}`,
                });
            });
        });

        return filters;
    }, [searchParams, categoriesData, selectedSubCat]);

    const removeFilter = (filterKey: string, filterValue: string) => {
        const newParams = new URLSearchParams(searchParams.toString());

        // Handle price removal
        if (filterKey === 'price') {
            newParams.delete('minPrice');
            newParams.delete('maxPrice');
        }
        // Handle category removal
        else if (filterKey === 'cat') {
            const current = newParams.get('cat')?.split(',').filter(Boolean) ?? [];
            const updated = current.filter((v) => v !== filterValue);
            if (updated.length) newParams.set('cat', updated.join(','));
            else newParams.delete('cat');
            newParams.delete('category_active');
            newParams.delete('categoryIds');
        }
        // Handle subcategory removal
        else if (filterKey === 'sub') {
            const current = newParams.get('sub')?.split(',').filter(Boolean) ?? [];
            const updated = current.filter((v) => v !== filterValue);
            if (updated.length) newParams.set('sub', updated.join(','));
            else newParams.delete('sub');
            newParams.delete('subcats');
            newParams.delete('subCategoryIds');
        }
        // Handle multi-value filters (brandFilter and attributes)
        else {
            const currentValue = newParams.get(filterKey);
            if (currentValue) {
                const values = currentValue.split(',');
                const updatedValues = values.filter((v) => v !== filterValue);

                if (updatedValues.length > 0) {
                    newParams.set(filterKey, updatedValues.join(','));
                } else {
                    newParams.delete(filterKey);
                }
            }
        }

        // Reset to page 1 when removing filters
        newParams.set('page', '1');

        const queryString = newParams.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    };

    // Don't render if no filters
    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-[0.5rem] w-full">
            {activeFilters.map((filter, index) => (
                <div
                    key={`${filter.key}-${filter.value}-${index}`}
                    className="flex items-center gap-[0.5rem] bg-[color:var(--Colors-Neutral-50)] rounded-[0.25rem] p-[0.5rem] text-[1rem] lg:text-[0.75rem] rounded-[var(--Radius-xs)]"
                >
                    <span className="text-[color:var(--Neutral-700)]">
                        {filter.displayValue}
                    </span>
                    <button
                        type="button"
                        onClick={() => removeFilter(filter.key, filter.value)}
                        aria-label={`Remove ${filter.displayValue} filter`}
                        className="text-[color:var(--Neutral-300)] hover:text-[color:var(--Neutral-500)] transition-colors cursor-pointer"
                    >
                        <IoIosCloseCircleOutline className="text-[1.25rem]" />
                    </button>
                </div>
            ))}
        </div>
    );
}

