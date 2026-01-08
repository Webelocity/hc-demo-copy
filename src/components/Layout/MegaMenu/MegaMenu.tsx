'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MegaMenu.module.scss';
import Button from '@/components/shared/Button';
import { categoriesQueryAtom } from '@/atoms/categoryAtom';
import { useAtomValue } from 'jotai';

interface MegaMenuProps {
    isOpen: boolean;
    onClose?: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    const router = useRouter();
    const { data: categories, status: categoriesStatus } = useAtomValue(categoriesQueryAtom);
    const [activeCategory, setActiveCategory] = useState<string>('');

    // Set first category as active when data loads
    useEffect(() => {
        if (categories && categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0]._id);
        }
    }, [categories, activeCategory]);

    const isLoading = categoriesStatus === 'pending';

    const handleSubcategoryClick = (subcategoryId: string) => {
        router.push(`/shop/catalogue?sub=${subcategoryId}&page=1`);
        onClose?.();
    };

    const handleShopAllClick = () => {
        if (activeCategory) {
            router.push(`/shop/catalogue?cat=${activeCategory}&page=1`);
            onClose?.();
        }
    };

    return (
        <div className={`baseContainer ${styles.megaMenu} ${isOpen ? styles.open : ''}`}>
            <div className="w-full maxWidth flex bg-white border-[1.5px] border-solid border-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.5rem]">
                {/* Left side - Categories */}
                <div className="flex flex-col gap-[0.5rem] p-[0.5rem] flex-1 border-r border-solid border-r-[var(--Secondary-100)]">
                    {isLoading ? (
                        // Skeleton for categories
                        [...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[3.5rem] rounded-[var(--Radius-md)] animate-pulse bg-[color:var(--Neutral-200)]"
                            />
                        ))
                    ) : (
                        categories?.map((category, index) => (
                            <span
                                key={index}
                                onClick={() => setActiveCategory(category._id)}
                                className={`text-[1rem] font-medium py-[1rem] px-[1.5rem] text-center rounded-[var(--Radius-md)] cursor-pointer transition-colors duration-200 ${activeCategory === category._id ? 'bg-[var(--Secondary-50)]' : 'hover:bg-[var(--Secondary-50)] hover:opacity-70'
                                    }`}
                            >
                                {category.name}
                            </span>
                        ))
                    )}
                </div>

                {/* Right side - Subcategories */}
                <div className="flex-[4] h-fit p-[1rem]">
                    {isLoading ? (
                        <>
                            <div className="grid grid-cols-4 gap-[0.5rem]">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[2.5rem] rounded-[var(--Radius-md)] animate-pulse bg-[color:var(--Neutral-200)]"
                                    />
                                ))}
                            </div>
                            <div className="mt-[1rem]">
                                <div className="w-[8rem] h-[2.75rem] rounded-[var(--Radius-md)] animate-pulse bg-[color:var(--Neutral-200)]" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-[0.75rem] mb-[0.75rem] rounded-[var(--Radius-md)] bg-[color:var(--Secondary-50)] px-[0.875rem] py-[0.65rem] text-[color:var(--Neutral-700)]">
                                <span className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-white shadow-sm text-[color:var(--secondary-500-main)]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.6}
                                        stroke="currentColor"
                                        className="h-[1.15rem] w-[1.15rem]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 1.125a10.125 10.125 0 1 0 18.606 0 10.125 10.125 0 0 0-18.606 0zM12 15.75h.008v.008H12v-.008z"
                                        />
                                    </svg>
                                </span>
                                <div className="leading-tight">
                                    <p className="text-[0.95rem] font-semibold text-[color:var(--Neutral-900)]">Choose a subcategory</p>
                                    <p className="text-[0.85rem] text-[color:var(--Neutral-500)]">Click a subcategory to see its products instantly.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-[0.5rem]">
                                {categories
                                    ?.find((category) => category._id === activeCategory)
                                    ?.categorySubCategories?.map((subcategory, index) => (
                                        <span
                                            key={index}
                                            onClick={() => handleSubcategoryClick(subcategory._id)}
                                            className="px-[1rem] py-[0.75rem] text-start text-[1rem] font-medium cursor-pointer hover:text-[color:var(--secondary-500-main)] transition-colors duration-200"
                                        >
                                            {subcategory.name}
                                        </span>
                                    ))}
                            </div>
                            <div className="mt-[1rem]">
                                <Button variant="outline" onClick={handleShopAllClick}>
                                    Shop All
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

