import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchAllProducts, getCategories } from '@/Api/Apis';
import CatalogueClient from '@/components/Pages/Shop/Catalogue/CatalogueClient';
import {
    buildCatalogueCanonical,
    buildCatalogueFetchParams,
    buildCatalogueJsonLd,
    normalizeSearchParams,
    resolveCatalogueCategoryName,
    type CatalogueSearchParams,
} from '@/lib/catalogueParams';

export const revalidate = 300;

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<CatalogueSearchParams>;
}): Promise<Metadata> {
    const params = normalizeSearchParams(await searchParams);

    return {
        alternates: {
            canonical: buildCatalogueCanonical(params),
        },
    };
}

export default async function Catalogue({
    searchParams,
}: {
    searchParams: Promise<CatalogueSearchParams>;
}) {
    const params = normalizeSearchParams(await searchParams);
    const fetchParams = buildCatalogueFetchParams(params);

    const [initialProducts, categories] = await Promise.all([
        fetchAllProducts(fetchParams).catch(() => ({
            data: [],
            totalItems: 0,
            currentPage: Number(fetchParams.page ?? 1),
            limit: Number(fetchParams.limit ?? 20),
            totalPages: 0,
        })),
        getCategories().catch(() => [] as Category[]),
    ]);

    const categoryName = resolveCatalogueCategoryName(
        categories,
        params.cat ?? '',
        params.sub ?? '',
    );
    const categoryJsonLd = buildCatalogueJsonLd(params, categoryName);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
            />
            <Suspense fallback={<div className="baseContainer py-[2.5rem]">Loading filters...</div>}>
                <CatalogueClient initialProducts={initialProducts} />
            </Suspense>
        </>
    );
}
