'use client';
import Filters from "@/components/Pages/Shop/Catalogue/Filters/Filters";
import { useMediaQuery } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/usefetchProducts";
import ProductPages from "@/components/Pages/Shop/Catalogue/ProductPages/ProductPages";
import SortDropdown from "@/components/Pages/Shop/Catalogue/SortDropdown/SortDropdown";
import AvailabilityDropdown from "@/components/Pages/Shop/Catalogue/AvailabilityDropdown/AvailabilityDropdown";
import ActiveFilters from "@/components/Pages/Shop/Catalogue/ActiveFilters/ActiveFilters";
import SubcategorySelector from "@/components/Pages/Shop/Catalogue/SubcategorySelector/SubcategorySelector";
import CatalogueSearchBar from "@/components/Pages/Shop/Catalogue/CatalogueSearchBar/CatalogueSearchBar";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import { useAtomValue } from "jotai";

function CatalogueContent() {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const categories = useAtomValue(categoriesQueryAtom);
    const [lastSelectedSubCat, setLastSelectedSubCat] = useState<Subcategory | ChildSubCategory | undefined>(undefined);

    const catParam = searchParams.get('cat') ?? '';
    const subParam = searchParams.get('sub') ?? '';
    const catIds = useMemo(() => catParam.split(',').filter(Boolean), [catParam]);
    const subIds = useMemo(() => subParam.split(',').filter(Boolean), [subParam]);

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

    // react-query hooks
    const {
        data: ProductsAPI,
        isLoading: isProductsLoading,
        isError: isProductsError,
        error: productsError,
    } = useProducts();
    // derive filters for Sort
    const filters = useMemo(() => {
        const out: Record<string, any> = {};
        searchParams.forEach((v, k) => {
            if (!['page', 'limit', 'sort', 'cat', 'sub'].includes(k)) {
                out[k] = isNaN(+v) ? v : +v;
            }
        });
        return out;
    }, [searchParams]);

    // helper to update URL (always include pathname)
    const pushSearch = (params: URLSearchParams) => {
        const q = params.toString();
        router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    };

    const handlePage = (_: unknown, value: number) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set('page', value.toString());
        pushSearch(p);
    };

    // same prop-name as before:
    const setFilters = (newFilters: Record<string, any>) => {
        const p = new URLSearchParams(searchParams.toString());
        p.delete('page');
        Object.entries(newFilters).forEach(([k, v]) => p.set(k, v.toString()));
        pushSearch(p);
    };

    // same prop-name as before:
    const handleSetSubcat = (sc: Subcategory | ChildSubCategory | undefined) => {
        setLastSelectedSubCat(sc ?? undefined);
    };

    const renderPaginationInfo = () => {
        if (!ProductsAPI || ProductsAPI.totalItems === 0) return null;

        const start = (ProductsAPI.currentPage - 1) * ProductsAPI.limit + 1;
        const end = Math.min(ProductsAPI.currentPage * ProductsAPI.limit, ProductsAPI.totalItems);

        return (
            <p className="text-[0.75rem] ">
                Showing {start}-{end} of {ProductsAPI.totalItems} products
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
            <div className=" maxWidth py-[2.5rem] flex gap-[1.5rem] min-w-0">
                {!isMobile && <Filters
                    setFilters={setFilters}
                    selectedSubCat={lastSelectedSubCat}
                    setSelectedSubCat={handleSetSubcat}
                />}

                <div className="flex-[3] flex flex-col gap-[1rem] min-w-0 w-full">
                    <div className="flex items-center justify-between w-full">
                        {/* title and pagination info */}
                        <div className="flex flex-col items-start gap-[0.5rem]">
                            <h1 className="text-[2rem] font-bold">{renderTitle()}</h1>
                            {renderPaginationInfo()}

                        </div>
                        {/* sort and availabilty */}
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

                    {/* subcategories selector */}
                    <SubcategorySelector
                        selectedSubCat={lastSelectedSubCat}
                        onSelect={handleSetSubcat}
                    />

                    {/* Active Filters */}
                    <ActiveFilters selectedSubCat={lastSelectedSubCat} />

                    {/* Search (scoped to current filter selection) */}
                    <CatalogueSearchBar />

                    <ProductPages
                        ProductsAPI={ProductsAPI}
                        isLoading={isProductsLoading}
                        isError={isProductsError}
                        errorMessage={productsError?.message}
                        handlePage={handlePage}
                    />

                    {/* your grid/list */}
                </div>
            </div>
        </div>

    );
}

export default function Catalogue() {
    return (
        <Suspense fallback={<div className="baseContainer py-[2.5rem]">Loading filters...</div>}>
            <CatalogueContent />
        </Suspense>
    );
}
