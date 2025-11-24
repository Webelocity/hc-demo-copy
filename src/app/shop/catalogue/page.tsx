'use client';
import { fetchAllShopFilters } from "@/Api/Apis";
import Filters from "@/components/Pages/Shop/Catalogue/Filters/Filters";
import { useMediaQuery } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useMemo } from "react";
import { useProducts } from "@/hooks/usefetchProducts";
import { useSubcategory } from "@/hooks/usefetchSubcategory";
import ProductPages from "@/components/Pages/Shop/Catalogue/ProductPages/ProductPages";
import SortDropdown from "@/components/Pages/Shop/Catalogue/SortDropdown/SortDropdown";
import AvailabilityDropdown from "@/components/Pages/Shop/Catalogue/AvailabilityDropdown/AvailabilityDropdown";
import ActiveFilters from "@/components/Pages/Shop/Catalogue/ActiveFilters/ActiveFilters";

function CatalogueContent() {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const categoryActive = searchParams.get('category_active') ?? undefined;
    const isSubcatActive = searchParams.get('subcats') ?? undefined;

    // react-query hooks
    const {
        data: ProductsAPI,
        isLoading: isProductsLoading,
        isFetching,
    } = useProducts();

    const {
        data: selectedSubCat,
        isLoading: isSubcatLoading,
    } = useSubcategory(isSubcatActive);
    // derive filters for Sort
    const filters = useMemo(() => {
        const out: Record<string, any> = {};
        searchParams.forEach((v, k) => {
            if (!['page', 'limit', 'sort', 'category_active', 'subcats'].includes(k)) {
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

    const removeFilter = (name: string) => {
        const p = new URLSearchParams(searchParams.toString());
        switch (name) {
            case 'category_active':
            case 'subcats':
                p.delete(name);
                break;
            case 'minPrice':
                p.delete('minPrice');
                p.delete('maxPrice');
                break;
            case 'sort':
                p.delete('sort');
                break;
            default:
                p.delete(name);
        }
        pushSearch(p);
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
    const handleSetSubcat = (sc: typeof selectedSubCat | undefined) => {
        const p = new URLSearchParams(searchParams.toString());
        if (sc) p.set('subcats', sc._id);
        else p.delete('subcats');
        pushSearch(p);
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

    return (
        <div className="baseContainer">
            <div className=" maxWidth py-[2.5rem] flex gap-[1.5rem]">
                {!isMobile && <Filters
                    setFilters={setFilters}
                    selectedSubCat={selectedSubCat}
                    setSelectedSubCat={handleSetSubcat}
                />}

                <div className="flex-[3] flex flex-col gap-[1rem]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start gap-[0.5rem]">
                            <h1 className="text-[2rem] font-bold">All products</h1>
                            {renderPaginationInfo()}

                        </div>
                        {/* sort and availabilty */}
                        <div className="flex items-center gap-[1rem]">
                            {isMobile ? <Filters
                                setFilters={setFilters}
                                selectedSubCat={selectedSubCat}
                                setSelectedSubCat={handleSetSubcat}
                            /> : <>
                                <SortDropdown />
                                <AvailabilityDropdown />
                            </>}

                        </div>
                    </div>

                    {/* Active Filters */}
                    <ActiveFilters selectedSubCat={selectedSubCat} />

                    <ProductPages ProductsAPI={ProductsAPI} isLoading={isProductsLoading} handlePage={handlePage} />

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
