// src/components/Shared/CategoryFilterComponentMobile.tsx

"use client"

import React, { useEffect, useMemo, useState } from "react";
// Tailwind styles are used; legacy SCSS removed
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import CategoryItem from "../CategoryItem/CategoryItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaAngleDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// Animation imports
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllShopFilters } from "@/Api/Apis";
import { useAtomValue } from "jotai";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import { CiFilter } from "react-icons/ci";

interface FiltersProps {
    initialCatId?: string;
    initialSubCatId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters: (filters: { [key: string]: any }) => void;
    selectedSubCat: Subcategory | ChildSubCategory | undefined;
    setSelectedSubCat: (selected: Subcategory | ChildSubCategory | undefined) => void;
}

const Filters: React.FC<FiltersProps> = ({
    selectedSubCat,
    setSelectedSubCat,
}) => {
    const categories = useAtomValue(categoriesQueryAtom);
    const categoriesStatus = categories.status;
    const categoriesError = categories.error;
    const categoriesData = categories.data;
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [temporaryPriceRange, setTemporaryPriceRange] = useState<number[]>([0, 0]);
    const [filterQuery, setFilterQuery] = useState<string>("");
    const [openSections, setOpenSections] = useState<{
        categories: boolean;
        price: boolean;
        brands: boolean;
        promotionalCategories: boolean;
        featured: boolean;
    }>({
        categories: true,
        price: false,
        brands: false,
        promotionalCategories: true,
        featured: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };
    const [openAttributeSections, setOpenAttributeSections] = useState<Record<string, boolean>>({});
    const toggleAttributeSection = (attributeName: string) => {
        setOpenAttributeSections((prev) => ({
            ...prev,
            [attributeName]: !prev[attributeName],
        }));
    };
    const filtersParams = useMemo(() => {
        const params: Record<string, string | number | boolean> = { isActive: true };

        const categoryActive = searchParams.get('category_active');
        const subcats = searchParams.get('subcats');

        // Align with filters API: send categoryIds/subCategoryIds (comma-separated) instead of UI param keys.
        if (categoryActive) params.categoryIds = categoryActive;
        if (subcats) params.subCategoryIds = subcats;

        searchParams.forEach((value, key) => {
            // Skip pagination/sort + the UI-only category selectors; include everything else (brands, attrs, promo, isFeatured, etc.)
            if (['page', 'limit', 'sort', 'category_active', 'subcats'].includes(key)) return;
            const numeric = Number(value);
            params[key] = Number.isNaN(numeric) ? value : numeric;
        });

        return params;
    }, [searchParams]);

    const {
        data: DynamicFilters,
        isLoading,
        isError,
    } = useQuery<AllFiltersResponse>({
        queryKey: ['AllFiltersResponse', JSON.stringify(filtersParams)],
        queryFn: () => fetchAllShopFilters(filtersParams),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });


    useEffect(() => {
        if (DynamicFilters?.priceRange) {
            const { minPrice, maxPrice } = DynamicFilters.priceRange;
            setTemporaryPriceRange([
                minPrice,
                minPrice + Math.floor((maxPrice - minPrice) / 2),
            ]);
        }
    }, [DynamicFilters]);

    const handlePriceChangeCommitted = (
        event: Event | React.SyntheticEvent<Element, Event>,
        newValue: number | number[]
    ) => {
        const [minPrice, maxPrice] = newValue as number[];
        const newParams = new URLSearchParams(searchParams);

        newParams.set('minPrice', minPrice.toString());
        newParams.set('maxPrice', maxPrice.toString());
        newParams.set('page', '1');

        router.push(`?${newParams.toString()}`, {
            scroll: false,
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (newParams.has(key)) {
            const existingValues = newParams.get(key)?.split(',') || [];
            if (existingValues.includes(value)) {
                const updatedValues = existingValues.filter(item => item !== value);
                if (updatedValues.length > 0) {
                    newParams.set(key, updatedValues.join(','));
                    newParams.set('page', '1');

                } else {
                    newParams.delete(key);
                    newParams.set('page', '1');

                }
            } else {
                newParams.set(key, [...existingValues, value].join(','));
                newParams.set('page', '1');
            }
        } else {
            newParams.set(key, value);
            newParams.set('page', '1');

        }

        router.push(`?${newParams.toString()}`, {
            scroll: false,
        });
    };

    const handleSubcatChange = (value: Subcategory | ChildSubCategory | undefined) => {
        const newParams = new URLSearchParams(searchParams);

        if (value) {
            newParams.set('subcats', value._id);
            newParams.delete('category_active');
        } else {
            newParams.delete('subcats');
        }

        router.push(`?${newParams.toString()}`, {
            scroll: false,
        });
        setSelectedSubCat(value);
    };

    const queryLower = filterQuery.trim().toLowerCase();

    // Brand helpers
    const allBrands = (DynamicFilters?.brands || {}) as Record<string, number>;
    const filteredBrandEntries = Object.entries(allBrands).filter(([brandName]) =>
        !queryLower || brandName.toLowerCase().includes(queryLower)
    );
    const showBrandsSection = !queryLower || filteredBrandEntries.length > 0;

    // Promotional categories helpers
    const promoCategories = (DynamicFilters?.promo ?? []) as { _id: string; name: string; count: number }[];
    const filteredPromoCategories = promoCategories.filter((promo) =>
        !queryLower || promo.name.toLowerCase().includes(queryLower)
    );
    const showPromoSection = !queryLower || filteredPromoCategories.length > 0;

    // Featured helpers (single toggle)
    const featuredData = (DynamicFilters?.featured ?? {}) as Record<string, number>;
    const featuredLabel = Object.keys(featuredData)[0] || 'Featured Products';
    const featuredCount = featuredData[featuredLabel];

    // Attribute helpers
    const allAttributes = (DynamicFilters?.attributes || {}) as Record<string, Record<string, number>>;
    const filteredAttributes = Object.entries(allAttributes).map(([attributeName, options]) => {
        const optionEntries = Object.entries(options);
        const matchesAttributeName = attributeName.toLowerCase().includes(queryLower);
        const filteredOptions = optionEntries.filter(([optionName]) =>
            !queryLower || optionName.toLowerCase().includes(queryLower)
        );
        const shouldShow = !queryLower || matchesAttributeName || filteredOptions.length > 0;
        return { attributeName, filteredOptions, shouldShow };
    }).filter(a => a.shouldShow);

    // Category helpers - show category if it or any descendant matches
    const baseCategories = categoriesStatus === 'success' && categoriesData
        ? (categoriesData as Category[]).filter((cat: Category) => cat.productCount > 0)
        : [];

    const categoryMatchesQuery = (cat: Category | Subcategory | ChildSubCategory, query: string): boolean => {
        // Check if this category's name matches
        if ((cat.name || '').toLowerCase().includes(query)) {
            return true;
        }

        // Check if any children match
        if ('categorySubCategories' in cat && cat.categorySubCategories) {
            return cat.categorySubCategories.some(sub => categoryMatchesQuery(sub, query));
        }
        if ('childSubCategories' in cat && cat.childSubCategories) {
            return cat.childSubCategories.some(child => categoryMatchesQuery(child, query));
        }

        return false;
    };

    const filteredCategories = queryLower
        ? baseCategories.filter((cat: Category) => categoryMatchesQuery(cat, queryLower))
        : baseCategories;
    const showCategoriesSection = categoriesStatus === 'pending' || filteredCategories.length > 0;

    const isChecked = (key: string, value: string) => {
        const param = searchParams.get(key);
        if (!param) return false;
        return param.split(',').includes(value);
    };

    const isFeaturedChecked = isChecked('isFeatured', 'true');

    const handleResetFilters = () => {
        const newParams = new URLSearchParams(searchParams);

        // Remove all filter-related parameters
        searchParams.forEach((value, key) => {
            if (key !== 'page') {
                newParams.delete(key);
            }
        });
        router.replace(`?${newParams.toString()}`, {
            scroll: false,
        });

    };

    // Render dynamic brands
    const renderDynamicBrands = () => {
        if (!showBrandsSection) return null;
        return (
            <div className="flex flex-col gap-[1rem] w-full">
                <button
                    type="button"
                    onClick={() => toggleSection('brands')}
                    className={`flex w-full min-w-full items-center justify-between py-[0.25rem] border-b transition-colors duration-200 cursor-pointer ${openSections.brands ? 'border-[color:var(--Neutral-800)]' : 'border-[color:var(--Neutral-100)]'}`}
                >
                    <span
                        className={`text-[1rem] font-medium ${openSections.brands ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-700)]'}`}
                    >
                        Brands
                    </span>
                    <motion.div
                        className={`text-[1rem] cursor-pointer ${openSections.brands ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-500)]'}`}
                        animate={{ rotate: openSections.brands ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaAngleDown />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {openSections.brands && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-[0.75rem]"
                        >
                            {filteredBrandEntries.map(([brandName, count]) => {
                                const checked = isChecked('brandFilter', brandName);
                                return (
                                    <label key={brandName} className="flex items-center gap-[0.5rem] cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer"
                                            checked={checked}
                                            onChange={() => handleFilterChange('brandFilter', brandName)}
                                        />
                                        <span
                                            className={`text-[0.875rem] leading-[1.3125rem] transition-colors duration-300 ${checked ? 'font-semibold text-[color:var(--secondary-500-main)]' : 'font-normal text-[color:var(--Neutral-700)] group-hover:text-[color:var(--secondary-500-main)] group-hover:opacity-70'}`}
                                        >
                                            {brandName} ({count})
                                        </span>
                                    </label>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    // Render promotional categories
    const renderPromotionalCategories = () => {
        if (!showPromoSection || filteredPromoCategories.length === 0) return null;
        return (
            <div className="flex flex-col gap-[1rem] w-full">
                <button
                    type="button"
                    onClick={() => toggleSection('promotionalCategories')}
                    className={`flex w-full min-w-full items-center justify-between py-[0.25rem] border-b transition-colors duration-200 cursor-pointer ${openSections.promotionalCategories ? 'border-[color:var(--Neutral-800)]' : 'border-[color:var(--Neutral-100)]'}`}
                >
                    <span
                        className={`text-[1rem] font-medium ${openSections.promotionalCategories ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-700)]'}`}
                    >
                        Promotional Categories
                    </span>
                    <motion.div
                        className={`text-[1rem] cursor-pointer ${openSections.promotionalCategories ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-500)]'}`}
                        animate={{ rotate: openSections.promotionalCategories ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaAngleDown />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {openSections.promotionalCategories && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-[0.75rem]"
                        >
                            {filteredPromoCategories.map((promo) => {
                                const checked = isChecked('promotionalCategories', promo._id);
                                return (
                                    <label key={promo._id} className="flex items-center gap-[0.5rem] cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer"
                                            checked={checked}
                                            onChange={() => handleFilterChange('promotionalCategories', promo._id)}
                                        />
                                        <span
                                            className={`text-[0.875rem] leading-[1.3125rem] transition-colors duration-300 ${checked ? 'font-semibold text-[color:var(--secondary-500-main)]' : 'font-normal text-[color:var(--Neutral-700)] group-hover:text-[color:var(--secondary-500-main)] group-hover:opacity-70'}`}
                                        >
                                            {promo.name} ({promo.count})
                                        </span>
                                    </label>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const handleFeaturedToggle = () => {
        const newParams = new URLSearchParams(searchParams);
        if (newParams.get('isFeatured') === 'true') {
            newParams.delete('isFeatured');
        } else {
            newParams.set('isFeatured', 'true');
        }
        newParams.set('page', '1');

        router.push(`?${newParams.toString()}`, {
            scroll: false,
        });
    };

    const renderFeaturedSection = () => {
        if (Object.keys(featuredData).length === 0) return null;
        return (
            <div className="flex flex-col gap-[1rem] w-full">
                <button
                    type="button"
                    onClick={() => toggleSection('featured')}
                    className={`flex w-full min-w-full items-center justify-between py-[0.25rem] border-b transition-colors duration-200 cursor-pointer ${openSections.featured ? 'border-[color:var(--Neutral-800)]' : 'border-[color:var(--Neutral-100)]'}`}
                >
                    <span
                        className={`text-[1rem] font-medium ${openSections.featured ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-700)]'}`}
                    >
                        Featured Products
                    </span>
                    <motion.div
                        className={`text-[1rem] cursor-pointer ${openSections.featured ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-500)]'}`}
                        animate={{ rotate: openSections.featured ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaAngleDown />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {openSections.featured && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-[0.75rem]"
                        >
                            <label className="flex items-center gap-[0.5rem] cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer"
                                    checked={isFeaturedChecked}
                                    onChange={handleFeaturedToggle}
                                />
                                <span
                                    className={`text-[0.875rem] leading-[1.3125rem] transition-colors duration-300 ${isFeaturedChecked ? 'font-semibold text-[color:var(--secondary-500-main)]' : 'font-normal text-[color:var(--Neutral-700)] group-hover:text-[color:var(--secondary-500-main)] group-hover:opacity-70'}`}
                                >
                                    {featuredLabel}{featuredCount ? ` (${featuredCount})` : ''}
                                </span>
                            </label>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    // Render dynamic attributes
    const renderDynamicAttributes = () => {
        return filteredAttributes.map(({ attributeName, filteredOptions }) => {
            if (openAttributeSections[attributeName] === undefined) {
                openAttributeSections[attributeName] = false;
            }

            return (
                <div key={attributeName} className="flex flex-col gap-[0.75rem] w-full">
                    <button
                        type="button"
                        onClick={() => toggleAttributeSection(attributeName)}
                        className={`flex w-full min-w-full items-center justify-between py-[0.25rem] border-b transition-colors duration-200 cursor-pointer ${openAttributeSections[attributeName] ? 'border-[color:var(--Neutral-800)]' : 'border-[color:var(--Neutral-100)]'}`}
                    >
                        <span
                            className={`text-[1rem] font-medium ${openAttributeSections[attributeName] ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-700)]'}`}
                        >
                            {attributeName.charAt(0).toUpperCase() + attributeName.slice(1)}
                        </span>
                        <motion.div
                            className={`text-[1rem] cursor-pointer ${openAttributeSections[attributeName] ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-500)]'}`}
                            animate={{ rotate: openAttributeSections[attributeName] ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaAngleDown />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {openAttributeSections[attributeName] && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-col gap-[0.75rem]"
                            >
                                {filteredOptions.map(([optionName, count]) => {
                                    const checked = isChecked(attributeName, optionName);
                                    return (
                                        <label key={`${attributeName}-${optionName}`} className="flex items-center gap-[0.5rem] cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer"
                                                checked={checked}
                                                onChange={() => handleFilterChange(attributeName, optionName)}
                                            />
                                            <span
                                                className={`text-[0.875rem] leading-[1.3125rem] transition-colors duration-300 ${checked ? 'font-semibold text-[color:var(--secondary-500-main)]' : 'font-normal text-[color:var(--Neutral-700)] group-hover:text-[color:var(--secondary-500-main)] group-hover:opacity-70'}`}
                                            >
                                                {optionName} ({count})
                                            </span>
                                        </label>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        });
    };

    const filtersContent = (
        <div
            className="flex flex-col gap-[1.5rem] p-[1.5rem] rounded-[var(--Radius-md)] bg-white shadow-[0_0.125rem_0.75rem_rgba(0,65,40,0.08)] flex-[1] "
        >
            <div className="flex items-center justify-between">
                <h3 className="text-[1.25rem] font-semibold text-[color:var(--Neutral-800)]">Filter By</h3>
                <div className="flex items-center gap-[0.75rem]">
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className="text-[0.875rem] font-medium text-[color:var(--secondary-500-main)] hover:text-[color:var(--secondary-500-main)] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                    >
                        Reset Filters
                    </button>
                    {isMobile && (
                        <button
                            type="button"
                            aria-label="Close filters"
                            onClick={() => setDrawerOpen(false)}
                            className="text-[1.25rem] text-[color:var(--Neutral-700)]"
                        >
                            <IoMdClose />
                        </button>
                    )}
                </div>
            </div>

            <div className="w-full">
                <Input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Search in filters"
                    fullWidth
                    disableUnderline
                    endAdornment={
                        filterQuery && (
                            <InputAdornment position="end">
                                <button
                                    type="button"
                                    onClick={() => setFilterQuery("")}
                                    className="text-[1rem] cursor-pointer text-[color:var(--Neutral-500)]"
                                    aria-label="Clear search"
                                >
                                    <IoMdClose />
                                </button>
                            </InputAdornment>
                        )
                    }
                    className="h-[2.5rem] rounded-[0.75rem] px-[1rem] text-[0.875rem] bg-[color:var(--Neutral-100)] text-[color:var(--Neutral-800)] border border-[color:var(--Neutral-200)]"
                    sx={{
                        '&:hover': {
                            background: 'var(--Neutral-100)',
                        },
                        '&.Mui-focused': {
                            background: 'var(--Neutral-100)',
                            borderColor: 'var(--secondary-500-main)',
                        },
                    }}
                />
            </div>

            {/* Promotional Categories */}
            {isLoading ? (
                <div className="space-y-[0.75rem]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-[0.5rem]">
                            <div className="w-[1rem] h-[1rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                            <div className="h-[1rem] w-[12rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                        </div>
                    ))}
                </div>
            ) : (
                renderPromotionalCategories()
            )}

            {/* Featured Products */}
            {isLoading ? (
                <div className="space-y-[0.75rem]">
                    <div className="flex items-center gap-[0.5rem]">
                        <div className="w-[1rem] h-[1rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                        <div className="h-[1rem] w-[10rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                    </div>
                </div>
            ) : (
                renderFeaturedSection()
            )}

            {/* Categories */}
            {showCategoriesSection && (
                <div className="flex flex-col gap-[1rem] w-full">
                    <button
                        type="button"
                        onClick={() => toggleSection('categories')}
                        className={`flex w-full min-w-full items-center justify-between py-[0.25rem] border-b transition-colors duration-200 cursor-pointer ${openSections.categories ? 'border-[color:var(--Neutral-800)]' : 'border-[color:var(--Neutral-100)]'}`}
                    >
                        <span
                            className={`text-[1rem] font-medium ${openSections.categories ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-700)]'}`}
                        >
                            Categories
                        </span>
                        <motion.div
                            className={`text-[1rem] cursor-pointer ${openSections.categories ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-500)]'}`}
                            animate={{ rotate: openSections.categories ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaAngleDown />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {openSections.categories && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-col"
                            >
                                {categoriesStatus === 'pending' ? (
                                    <div className="space-y-[0.75rem]">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-[0.5rem]">
                                                <div className="w-[1rem] h-[1rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                                                <div className="h-[1rem] w-[12rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : categoriesStatus === 'error' ? (
                                    <div className="text-[0.875rem] text-[color:var(--Primary-600)]">Error: {categoriesError?.message}</div>
                                ) : (
                                    filteredCategories.map((category: Category) => (
                                        <CategoryItem
                                            key={category._id}
                                            category={category}
                                            level={0}
                                            selectedSubCat={selectedSubCat}
                                            setSelectedSubCat={handleSubcatChange}
                                            filterQuery={queryLower}
                                        />
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Price */}
            <div className="flex flex-col gap-[0.75rem] w-full">
                <button
                    type="button"
                    onClick={() => toggleSection('price')}
                    className={`flex w-full min-w-full items-center justify-between py-[0.25rem] border-b transition-colors duration-200 cursor-pointer ${openSections.price ? 'border-[color:var(--Neutral-800)]' : 'border-[color:var(--Neutral-100)]'}`}
                >
                    <span
                        className={`text-[1rem] font-medium ${openSections.price ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-700)]'}`}
                    >
                        Price
                    </span>
                    <motion.div
                        className={`text-[1rem] cursor-pointer ${openSections.price ? 'text-[color:var(--Neutral-800)]' : 'text-[color:var(--Neutral-500)]'}`}
                        animate={{ rotate: openSections.price ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaAngleDown />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {openSections.price && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-[1rem]"
                        >
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={temporaryPriceRange}
                                onChange={(event, newValue) => setTemporaryPriceRange(newValue as number[])}
                                onChangeCommitted={handlePriceChangeCommitted}
                                valueLabelDisplay="auto"
                                getAriaValueText={(value) => `${value}$`}
                                min={DynamicFilters?.priceRange.minPrice || 0}
                                max={DynamicFilters?.priceRange.maxPrice ? DynamicFilters?.priceRange.maxPrice + 1 : 250}
                                sx={{ color: 'var(--secondary-500-main)' }}
                            />
                            <div className="flex items-center gap-[0.5rem] w-full">
                                <TextField
                                    id="min-price"
                                    label="Min"
                                    variant="outlined"
                                    size="small"
                                    value={temporaryPriceRange[0]}
                                    onChange={(e) => {
                                        const parsedValue = parseInt(e.target.value, 10);
                                        const safeValue = isNaN(parsedValue) ? 0 : parsedValue;
                                        setTemporaryPriceRange([
                                            Math.min(safeValue, temporaryPriceRange[1]),
                                            temporaryPriceRange[1],
                                        ]);
                                    }}
                                    onBlur={(e) => handlePriceChangeCommitted(e, temporaryPriceRange)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handlePriceChangeCommitted(e, temporaryPriceRange); }}
                                    sx={{
                                        '& .MuiInputBase-input': { fontSize: '0.875rem' },
                                        '& .MuiInputLabel-root': { fontSize: '0.875rem' }
                                    }}
                                />
                                <TextField
                                    id="max-price"
                                    label="Max"
                                    variant="outlined"
                                    size="small"
                                    value={temporaryPriceRange[1]}
                                    onChange={(e) => {
                                        const parsedValue = parseInt(e.target.value, 10);
                                        const safeValue = isNaN(parsedValue) ? temporaryPriceRange[1] : parsedValue;
                                        setTemporaryPriceRange([
                                            temporaryPriceRange[0],
                                            Math.max(safeValue, temporaryPriceRange[0]),
                                        ]);
                                    }}
                                    onBlur={(e) => handlePriceChangeCommitted(e, temporaryPriceRange)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handlePriceChangeCommitted(e, temporaryPriceRange); }}
                                    sx={{
                                        '& .MuiInputBase-input': { fontSize: '0.875rem' },
                                        '& .MuiInputLabel-root': { fontSize: '0.875rem' }
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Dynamic Brands */}
            {isLoading ? (
                <div className="space-y-[0.75rem]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-[0.5rem]">
                            <div className="w-[1rem] h-[1rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                            <div className="h-[1rem] w-[10rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                        </div>
                    ))}
                </div>
            ) : (
                renderDynamicBrands()
            )}

            {/* Dynamic Attributes */}
            {isLoading ? (
                <div className="space-y-[0.75rem]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-[0.5rem]">
                            <div className="h-[1.25rem] w-[8rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                            <div className="flex items-center gap-[0.5rem]">
                                <div className="w-[1rem] h-[1rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                                <div className="h-[1rem] w-[10rem] rounded-[0.25rem] animate-pulse bg-[color:var(--Neutral-200)]"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                renderDynamicAttributes()
            )}
        </div>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <button
                        id="filterButton"
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-[0.5rem] justify-center text-black rounded-[var(--Radius-md)] px-[1.25rem] py-[0.625rem] text-[1.2rem] font-medium bg-[color:var(--Colors-Neutral-50)]"
                    >
                        <CiFilter className="text-2xl" />
                        Filters
                    </button>
                    <Drawer
                        anchor="bottom"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        PaperProps={{
                            sx: {
                                width: '100%',
                                height: '80vh',
                                borderTopLeftRadius: '1rem',
                                borderTopRightRadius: '1rem',
                                p: '1rem'
                            }
                        }}
                    >
                        <div className="mx-auto w-full max-w-[48rem]">
                            {!isError ? filtersContent : <span>Failed to load filters</span>}
                        </div>
                    </Drawer>
                </>
            ) : (
                !isError ? filtersContent : <span>Failed to Load</span>
            )}
        </>
    );
};

export default Filters;
