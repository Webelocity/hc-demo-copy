'use client';
import { fetchAllShopFilters } from "@/Api/Apis";
import Filters from "@/components/Pages/Shop/Catalogue/Filters/Filters";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";
import { useProducts } from "@/hooks/usefetchProducts";
import { useSubcategory } from "@/hooks/usefetchSubcategory";

function CatalogueContent() {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const searchParams = useSearchParams();
    const router = useRouter();

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

    // helper to update URL
    const pushSearch = (params: URLSearchParams) =>
        router.push(`?${params.toString()}`, { scroll: false });

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
    return (
        <div className="baseContainer py-[2.5rem] flex gap-[1.5rem]">
            <Filters setFilters={setFilters} selectedSubCat={selectedSubCat} setSelectedSubCat={handleSetSubcat} />
            <div className="flex-[3]">

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