'use client';
import Filters from "@/components/Pages/Shop/Catalogue/Filters/Filters";
import { useMediaQuery } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import ProductPages from "@/components/Pages/Shop/Catalogue/ProductPages/ProductPages";
import SortDropdown from "@/components/Pages/Shop/Catalogue/SortDropdown/SortDropdown";
import AvailabilityDropdown from "@/components/Pages/Shop/Catalogue/AvailabilityDropdown/AvailabilityDropdown";
import ActiveFilters from "@/components/Pages/Shop/Catalogue/ActiveFilters/ActiveFilters";
import SubcategorySelector from "@/components/Pages/Shop/Catalogue/SubcategorySelector/SubcategorySelector";
import CatalogueSearchBar from "@/components/Pages/Shop/Catalogue/CatalogueSearchBar/CatalogueSearchBar";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import { useAtomValue } from "jotai";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { CiFilter } from "react-icons/ci";

type CatalogueClientProps = {
    initialProducts: ApiResponse<Product>;
};

export default function CatalogueClient({ initialProducts }: CatalogueClientProps) {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const categories = useAtomValue(categoriesQueryAtom);
    const [isPending, startTransition] = useTransition();
    const [lastSelectedSubCat, setLastSelectedSubCat] = useState<Subcategory | ChildSubCategory | undefined>(undefined);

    const catParam = searchParams.get('cat') ?? '';
    const subParam = searchParams.get('sub') ?? '';
    const catIds = useMemo(() => catParam.split(',').filter(Boolean), [catParam]);
    const subIds = useMemo(() => subParam.split(',').filter(Boolean), [subParam]);

    const hasNonSearchFilterParam = useMemo(() => {
        const ignored = new Set(['page', 'limit', 'searchTerm']);
        let has = false;
        searchParams.forEach((value, key) => {
            if (!value) return;
            if (ignored.has(key)) return;
            has = true;
        });
        return has;
    }, [searchParams]);

    const activeNonSearchFiltersCount = useMemo(() => {
        let count = 0;

        const hasCatOrSub = Boolean(searchParams.get('cat') || searchParams.get('sub'));
        if (hasCatOrSub) count += 1;

        const hasPrice = Boolean(searchParams.get('minPrice') || searchParams.get('maxPrice'));
        if (hasPrice) count += 1;

        const hasSort = Boolean(searchParams.get('sort'));
        if (hasSort) count += 1;

        const hasAvailability = Boolean(searchParams.get('availability'));
        if (hasAvailability) count += 1;

        const groupedKeys = new Set([
            'page',
            'limit',
            'cat',
            'sub',
            'minPrice',
            'maxPrice',
            'sort',
            'availability',
            'searchTerm',
        ]);

        const otherKeys = new Set<string>();
        searchParams.forEach((value, key) => {
            if (groupedKeys.has(key)) return;
            if (!value) return;
            otherKeys.add(key);
        });

        return count + otherKeys.size;
    }, [searchParams]);

    const didInitFilterRailRef = useRef(false);
    const [filtersCollapsed, setFiltersCollapsed] = useState(true);
    useEffect(() => {
        if (didInitFilterRailRef.current) return;
        setFiltersCollapsed(!hasNonSearchFilterParam);
        didInitFilterRailRef.current = true;
    }, [hasNonSearchFilterParam]);

    const findNodeById = (id: string): Category | Subcategory | ChildSubCategory | undefined => {
        if (!categories.data) return undefined;
        for (const cat of categories.data as Category[]) {
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

    const selectedCats = useMemo(
        () => catIds.map((id) => findNodeById(id)).filter(Boolean) as (Category | Subcategory | ChildSubCategory)[],
        [catIds, categories.data]
    );
    const selectedSubCats = useMemo(
        () => subIds.map((id) => findNodeById(id)).filter(Boolean) as (Subcategory | ChildSubCategory)[],
        [subIds, categories.data]
    );

    const pushSearch = (params: URLSearchParams) => {
        const q = params.toString();
        startTransition(() => {
            router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
        });
    };

    const handlePage = (_: unknown, value: number) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set('page', value.toString());
        pushSearch(p);
    };

    const setFilters = (newFilters: Record<string, any>) => {
        const p = new URLSearchParams(searchParams.toString());
        p.delete('page');
        Object.entries(newFilters).forEach(([k, v]) => p.set(k, v.toString()));
        pushSearch(p);
    };

    const handleSetSubcat = (sc: Subcategory | ChildSubCategory | undefined) => {
        setLastSelectedSubCat(sc ?? undefined);
    };

    const renderPaginationInfo = () => {
        if (!initialProducts || initialProducts.totalItems === 0) return null;

        const start = (initialProducts.currentPage - 1) * initialProducts.limit + 1;
        const end = Math.min(initialProducts.currentPage * initialProducts.limit, initialProducts.totalItems);

        return (
            <p className="text-[0.75rem] ">
                Showing {start}-{end} of {initialProducts.totalItems} products
            </p>
        );
    };

    const renderTitle = () => {
        if (selectedSubCats.length > 0) {
            const [first, ...rest] = selectedSubCats;
            return rest.length ? `${first.name} (+${rest.length} more)` : first.name;
        }
        if (selectedCats.length > 0) {
            const [first, ...rest] = selectedCats;
            return rest.length ? `${first.name} (+${rest.length} more)` : first.name;
        }
        return 'All products';
    };

    return (
        <div className="baseContainer">
            <div className=" maxWidth py-[2.5rem] flex gap-[2rem] min-w-0">
                {!isMobile && (
                    <aside
                        className={[
                            'relative flex-shrink-0 transition-[width] duration-500 ease-in-out will-change-[width]',
                            filtersCollapsed ? 'w-[4.75rem]' : 'w-[22rem]',
                        ].join(' ')}
                    >
                        <div className="h-full">
                            <button
                                type="button"
                                onClick={() => setFiltersCollapsed((v) => !v)}
                                aria-label={filtersCollapsed ? 'Expand filters' : 'Collapse filters'}
                                className={[
                                    'absolute top-[0.75rem] right-[-0.75rem] translate-x-1/2 z-10',
                                    'w-[2.25rem] h-[2.25rem] rounded-full bg-white border border-[color:var(--Neutral-100)]',
                                    'shadow-[0_0.125rem_0.75rem_rgba(0,65,40,0.10)]',
                                    'flex items-center justify-center cursor-pointer',
                                    'text-[color:var(--Neutral-700)] hover:text-[color:var(--secondary-500-main)] transition-colors duration-300',
                                ].join(' ')}
                            >
                                {filtersCollapsed ? (
                                    <GoChevronRight className="text-[1.25rem]" />
                                ) : (
                                    <GoChevronLeft className="text-[1.25rem]" />
                                )}
                            </button>

                            {filtersCollapsed ? (
                                <div className="h-full flex flex-col items-center pt-[1.25rem]">
                                    <div className="relative w-[3.25rem] h-[3.25rem] rounded-[1rem] bg-white border border-[color:var(--Neutral-100)] shadow-[0_0.125rem_0.75rem_rgba(0,65,40,0.08)] flex items-center justify-center">
                                        <CiFilter className="text-[1.5rem] text-[color:var(--Neutral-700)]" />

                                        {activeNonSearchFiltersCount > 0 && (
                                            <span className="absolute -top-[0.35rem] -right-[0.35rem] w-[1.6rem] h-[1.6rem] rounded-full bg-[color:var(--secondary-500-main)] text-white flex items-center justify-center text-[0.85rem] font-semibold leading-none">
                                                {activeNonSearchFiltersCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Filters
                                    setFilters={setFilters}
                                    selectedSubCat={lastSelectedSubCat}
                                    setSelectedSubCat={handleSetSubcat}
                                />
                            )}
                        </div>
                    </aside>
                )}

                <div className="flex-[3] flex flex-col gap-[1rem] min-w-0 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start gap-[0.5rem]">
                            <h1 className="text-[2rem] font-bold">{renderTitle()}</h1>
                            {renderPaginationInfo()}
                        </div>
                        <div className="flex items-center gap-[1rem]">
                            {isMobile ? <Filters
                                setFilters={setFilters}
                                selectedSubCat={lastSelectedSubCat}
                                setSelectedSubCat={handleSetSubcat}
                            /> : <>
                                <SortDropdown />
                                <AvailabilityDropdown />
                            </>}
                        </div>
                    </div>

                    <SubcategorySelector
                        selectedSubCat={lastSelectedSubCat}
                        onSelect={handleSetSubcat}
                    />

                    <ActiveFilters selectedSubCat={lastSelectedSubCat} />

                    <CatalogueSearchBar />

                    <ProductPages
                        ProductsAPI={initialProducts}
                        isLoading={isPending}
                        isError={false}
                        handlePage={handlePage}
                    />
                </div>
            </div>
        </div>
    );
}
