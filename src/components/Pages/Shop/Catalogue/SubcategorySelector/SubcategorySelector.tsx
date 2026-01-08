'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiOutlineCollection } from 'react-icons/hi';
import { FiAlertTriangle } from 'react-icons/fi';
import { categoriesQueryAtom } from '@/atoms/categoryAtom';
import { isCategory, isChildSubCategory } from '@/util/guards';

type SubcategorySelectorProps = {
    selectedSubCat?: Subcategory | ChildSubCategory;
    onSelect?: (selected: Subcategory | ChildSubCategory | undefined) => void;
};

type Option = {
    parent: Category | Subcategory | ChildSubCategory;
    child: Subcategory | ChildSubCategory;
};

const SubcategoryThumbnail = ({ image, name }: { image?: string; name: string }) => {
    const [failed, setFailed] = useState(false);
    const letter = (name || '?').charAt(0).toUpperCase();

    return (
        <div className="relative w-[3.125rem] h-[3.125rem] rounded-[0.75rem] overflow-hidden bg-[color:var(--Colors-Neutral-50)] border border-[color:var(--Neutral-200)] flex items-center justify-center shrink-0">
            {!image || failed ? (
                <span className="text-[1rem] font-semibold text-[color:var(--Neutral-700)]">{letter}</span>
            ) : (
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="50px"
                    className="object-cover"
                    onError={() => setFailed(true)}
                />
            )}
        </div>
    );
};

const SubcategorySelector = ({ selectedSubCat, onSelect }: SubcategorySelectorProps) => {
    const categories = useAtomValue(categoriesQueryAtom);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const isLoading = categories.status === 'pending';
    const isError = categories.status === 'error';

    const catIds = useMemo(() => (searchParams.get('cat') ?? '').split(',').filter(Boolean), [searchParams]);
    const subIds = useMemo(() => (searchParams.get('sub') ?? '').split(',').filter(Boolean), [searchParams]);
    const selectedSubIdSet = useMemo(() => new Set(subIds), [subIds]);

    const findNodeById = useCallback(
        (id: string): Category | Subcategory | ChildSubCategory | undefined => {
            const data = categories.data as Category[] | undefined;
            if (!data) return undefined;

            for (const cat of data) {
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
        },
        [categories.data]
    );

    // If the user is already at the deepest level (child subcategory),
    // there's no "next level" to browse, so hide this section entirely.
    const lastSelectedNode = useMemo(() => {
        if (selectedSubCat) return selectedSubCat;
        if (subIds.length === 0) return undefined;
        return findNodeById(subIds[subIds.length - 1]);
    }, [findNodeById, selectedSubCat, subIds]);

    const shouldHide = Boolean(lastSelectedNode && isChildSubCategory(lastSelectedNode));

    const selectedParents = useMemo(() => {
        if (shouldHide) return [];
        const seen = new Set<string>();
        const nodes: Array<Category | Subcategory | ChildSubCategory> = [];

        [...catIds, ...subIds].forEach((id) => {
            if (seen.has(id)) return;
            const node = findNodeById(id);
            if (node) {
                seen.add(id);
                nodes.push(node);
            }
        });

        return nodes;
    }, [catIds, subIds, findNodeById, shouldHide]);

    const options = useMemo<Option[]>(() => {
        if (shouldHide) return [];
        const list: Option[] = [];
        const seenChildren = new Set<string>();

        selectedParents.forEach((parent) => {
            const children = isCategory(parent) ? parent.categorySubCategories ?? [] : parent.childSubCategories ?? [];

            children.forEach((child) => {
                if (seenChildren.has(child._id)) return;
                seenChildren.add(child._id);
                list.push({ parent, child });
            });
        });

        return list;
    }, [selectedParents, shouldHide]);

    // Keep parent selection state in sync with URL (initial hydration)
    useEffect(() => {
        if (shouldHide) return;
        if (!onSelect || selectedSubCat || subIds.length === 0) return;
        const firstSelected = findNodeById(subIds[subIds.length - 1]);
        if (firstSelected && !isCategory(firstSelected)) {
            onSelect(firstSelected as Subcategory | ChildSubCategory);
        }
    }, [findNodeById, onSelect, selectedSubCat, subIds, shouldHide]);

    const handleSelect = (child: Subcategory | ChildSubCategory, parent?: Category | Subcategory | ChildSubCategory) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        const currentSub = new Set(nextParams.get('sub')?.split(',').filter(Boolean) ?? []);
        const alreadySelected = currentSub.has(child._id);

        if (alreadySelected) {
            currentSub.delete(child._id);
        } else {
            currentSub.add(child._id);

            // Avoid overlapping parent selections for cleaner filter URLs
            if (parent) {
                if (isCategory(parent)) {
                    const currentCats = new Set(nextParams.get('cat')?.split(',').filter(Boolean) ?? []);
                    if (currentCats.has(parent._id)) {
                        currentCats.delete(parent._id);
                        currentCats.size ? nextParams.set('cat', Array.from(currentCats).join(',')) : nextParams.delete('cat');
                    }
                } else if (currentSub.has(parent._id)) {
                    currentSub.delete(parent._id);
                }
            }
        }

        currentSub.size ? nextParams.set('sub', Array.from(currentSub).join(',')) : nextParams.delete('sub');
        nextParams.set('page', '1');

        const queryString = nextParams.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });

        if (!onSelect) return;

        if (!alreadySelected) {
            onSelect(child);
            return;
        }

        const remaining = Array.from(currentSub);
        if (remaining.length === 0) {
            onSelect(undefined);
            return;
        }

        const last = findNodeById(remaining[remaining.length - 1]);
        if (last && !isCategory(last)) {
            onSelect(last as Subcategory | ChildSubCategory);
        }
    };

    const renderContent = () => {
        if (isError) {
            return (
                <div className="flex items-center gap-[0.5rem] text-[color:var(--Primary-600)] text-[0.95rem] bg-[color:var(--Colors-Neutral-50)] border border-[color:var(--Neutral-200)] rounded-[var(--Radius-md)] px-[0.75rem] py-[0.65rem]">
                    <FiAlertTriangle className="text-[1.25rem]" />
                    <span>Unable to load subcategories. Please try again.</span>
                </div>
            );
        }

        if (!isLoading && options.length === 0) {
            return (
                <div className="flex items-center justify-between flex-wrap gap-[0.75rem] bg-[color:var(--Colors-Neutral-50)] border border-[color:var(--Neutral-100)] rounded-[var(--Radius-md)] px-[0.75rem] py-[0.65rem]">
                    <div className="flex items-center gap-[0.5rem] text-[color:var(--Neutral-700)]">
                        <HiOutlineCollection className="text-[1.25rem]" />
                        <div className="flex flex-col">
                            <span className="font-semibold text-[0.95rem]">No subcategories yet</span>
                            <span className="text-[0.85rem] text-[color:var(--Neutral-600)]">
                                Choose a category to explore its subcategories.
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        const cards = options.map(({ child, parent }) => {
            const isSelected = selectedSubIdSet.has(child._id);

            // Use productCount if your API provides it; otherwise fall back to a known products array length.
            const productCount =
                (child as any).productCount ??
                (child as any).productsCount ??
                (child as Subcategory)?.subCategoryProducts?.length ??
                0;

            return (
                <div
                    key={child._id}
                    className="shrink-0 w-[25rem] min-w-[25rem] max-w-[25rem] cursor-pointer h-full"
                >
                    <button
                        type="button"
                        onClick={() => handleSelect(child, parent)}
                        aria-pressed={isSelected}
                        className={[
                            'group w-full h-full flex items-center gap-[0.75rem] rounded-[var(--Radius-md)] border px-[0.85rem] py-[0.75rem] text-left cursor-pointer',
                            'shadow-[0_0.125rem_0.75rem_rgba(0,65,40,0.06)] bg-white transition-colors duration-200',
                            isSelected
                                ? 'border-[color:var(--secondary-500-main)]'
                                : 'border-[color:var(--Neutral-100)] hover:border-[color:var(--Neutral-200)]',
                        ].join(' ')}
                    >
                        <SubcategoryThumbnail image={child.image} name={child.name} />

                        <div className="flex flex-col gap-[0.2rem] min-w-0">
                            <span className="text-[0.95rem] font-semibold text-[color:var(--Neutral-800)] leading-[1.3rem] line-clamp-2">
                                {child.name}
                            </span>
                            <span className="text-[0.8rem] text-[color:var(--Neutral-600)] leading-[1.1rem] line-clamp-1">
                                {isCategory(parent) ? 'Under ' : 'Child of '} {parent.name}
                            </span>
                            <span className="text-[0.75rem] text-[color:var(--secondary-500-main)] font-medium whitespace-nowrap">
                                {productCount} item{productCount === 1 ? '' : 's'}
                            </span>
                        </div>
                    </button>
                </div>
            );
        });

        if (isLoading) {
            return (
                <div className="w-full max-w-full min-w-0 overflow-x-auto">
                    <div className="flex items-stretch gap-[1.5rem] w-max max-w-none px-[0.75rem] pb-[0.25rem]">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={`subcat-skel-${idx}`}
                                className="shrink-0 w-[25rem] min-w-[25rem] max-w-[25rem] rounded-[var(--Radius-md)] border border-[color:var(--Neutral-100)] bg-white p-[0.85rem]"
                            >
                                <div className="flex items-center gap-[0.75rem]">
                                    <div className="w-[3.125rem] h-[3.125rem] rounded-[0.75rem] bg-[color:var(--Colors-Neutral-100)] animate-pulse" />
                                    <div className="flex flex-col gap-[0.5rem] w-full">
                                        <div className="h-4 w-2/3 rounded bg-[color:var(--Colors-Neutral-100)] animate-pulse" />
                                        <div className="h-3 w-1/2 rounded bg-[color:var(--Colors-Neutral-100)] animate-pulse" />
                                        <div className="h-3 w-1/3 rounded bg-[color:var(--Colors-Neutral-100)] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full max-w-full min-w-0 overflow-x-auto">
                <div className="flex items-stretch gap-[1.5rem] w-max max-w-none px-[0.75rem] pb-[0.25rem]">
                    {cards}
                </div>
            </div>
        );
    };

    if (shouldHide) return null;

    return (
        <div className="flex flex-col gap-[0.75rem] rounded-[var(--Radius-md)] bg-white border border-[color:var(--Neutral-100)] shadow-[0_0.125rem_0.75rem_rgba(0,65,40,0.08)] p-[1rem] w-full max-w-full min-w-0">
            <div className="flex items-center justify-between gap-[0.75rem] flex-wrap">
                <div className="flex items-center gap-[0.6rem]">
                    <div className="w-[2.25rem] h-[2.25rem] rounded-full bg-[color:var(--Secondary-50)] text-[color:var(--secondary-500-main)] flex items-center justify-center">
                        <HiOutlineCollection className="text-[1.25rem]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[1.1rem] font-semibold text-[color:var(--Neutral-800)]">Subcategories</span>
                        <span className="text-[0.85rem] text-[color:var(--Neutral-600)]">
                            Quick access to the relevant subcategories you select.
                        </span>
                    </div>
                </div>

                <span className="text-[0.85rem] text-[color:var(--Neutral-600)]">
                    {categories.status === 'pending' ? 'Loading...' : `${options.length} option${options.length === 1 ? '' : 's'}`}
                </span>
            </div>

            <div className="w-full min-w-0">{renderContent()}</div>
        </div>
    );
};

export default SubcategorySelector;
