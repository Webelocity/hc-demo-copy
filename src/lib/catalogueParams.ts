const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hcinc.com').replace(/\/$/, '');

export type CatalogueSearchParams = Record<string, string | string[] | undefined>;

export function normalizeSearchParams(
    params: CatalogueSearchParams,
): Record<string, string> {
    const out: Record<string, string> = {};

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined) continue;
        out[key] = Array.isArray(value) ? value.join(',') : value;
    }

    return out;
}

export function buildCatalogueFetchParams(
    params: Record<string, string>,
): Record<string, string | number | boolean> {
    const sort = params.sort ?? '';
    const page = Number(params.page ?? '1');
    const limit = Number(params.limit ?? '20');
    const filters: Record<string, string | number | boolean> = {};

    if (params.cat) filters.categoryIds = params.cat;
    if (params.sub) filters.subCategoryIds = params.sub;

    for (const [key, value] of Object.entries(params)) {
        if (!value) continue;
        if (['page', 'limit', 'sort', 'cat', 'sub'].includes(key)) continue;
        filters[key] = Number.isNaN(Number(value)) ? value : Number(value);
    }

    return { page, limit, sort, ...filters };
}

function findCategoryNodeById(
    categories: Category[],
    id: string,
): Category | Subcategory | ChildSubCategory | undefined {
    for (const cat of categories) {
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
}

export function resolveCatalogueCategoryName(
    categories: Category[],
    catParam: string,
    subParam: string,
): string | undefined {
    const catIds = catParam.split(',').filter(Boolean);
    const subIds = subParam.split(',').filter(Boolean);

    const selectedSubCats = subIds
        .map((id) => findCategoryNodeById(categories, id))
        .filter(Boolean) as (Subcategory | ChildSubCategory)[];
    const selectedCats = catIds
        .map((id) => findCategoryNodeById(categories, id))
        .filter(Boolean) as (Category | Subcategory | ChildSubCategory)[];

    if (selectedSubCats.length > 0) {
        const [first, ...rest] = selectedSubCats;
        return rest.length ? `${first.name} (+${rest.length} more)` : first.name;
    }

    if (selectedCats.length > 0) {
        const [first, ...rest] = selectedCats;
        return rest.length ? `${first.name} (+${rest.length} more)` : first.name;
    }

    return undefined;
}

export function buildCatalogueJsonLd(
    params: Record<string, string>,
    categoryName?: string,
) {
    const catParam = params.cat ?? '';
    const subParam = params.sub ?? '';
    const isSub = Boolean(subParam);
    const categoryId = catParam || subParam;
    const catalogueUrl = `${SITE_URL}/shop/catalogue${
        categoryId ? `?${isSub ? 'sub' : 'cat'}=${categoryId}` : ''
    }`;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${catalogueUrl}#collection`,
                name: categoryName
                    ? `${categoryName} | Home Central Stores`
                    : 'Shop All Products | Home Central Stores',
                description: categoryName
                    ? `Shop ${categoryName} at Home Central Stores — hardware and building supplies in Owego, Vestal, and Candor NY.`
                    : 'Browse 60,000+ hardware and building supply products at Home Central Stores in New York.',
                url: catalogueUrl,
                isPartOf: { '@id': `${SITE_URL}/#website` },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop/catalogue` },
                    ...(categoryName
                        ? [{
                            '@type': 'ListItem',
                            position: 3,
                            name: categoryName,
                            item: `${SITE_URL}/shop/catalogue?${isSub ? 'sub' : 'cat'}=${categoryId}`,
                        }]
                        : []),
                ],
            },
        ],
    };
}

export function buildCatalogueCanonical(params: Record<string, string>): string {
    const base = `${SITE_URL}/shop/catalogue`;
    const cat = params.cat?.split(',')[0]?.trim();

    if (cat) {
        return `${base}?cat=${encodeURIComponent(cat)}`;
    }

    const sub = params.sub?.split(',')[0]?.trim();
    if (sub) {
        return `${base}?sub=${encodeURIComponent(sub)}`;
    }

    return base;
}
