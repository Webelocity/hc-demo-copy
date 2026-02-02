'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MegaMenu.module.scss';
import Button from '@/components/shared/Button';
import { categoriesQueryAtom } from '@/atoms/categoryAtom';
import { useAtomValue } from 'jotai';
import { FUSED_CATEGORY_GROUPS } from '@/components/Pages/HomePage/Categories/categoryFusionConfig';

type FusedMenuCategory = {
    displayName: string;
    ids: string[];
    subcategories: Subcategory[];
};

function buildFusedMenuCategories(backendCategories: Category[]): FusedMenuCategory[] {
    const byName = new Map<string, Category>();
    (backendCategories ?? [])
        .filter((c) => c.name !== 'Uncategorized')
        .forEach((c) => byName.set(c.name, c));

    return FUSED_CATEGORY_GROUPS.map((group) => {
        const matched = group.backendNames
            .map((name) => byName.get(name))
            .filter((c): c is Category => c != null);
        const ids = matched.map((c) => c._id);
        const seenIds = new Set<string>();
        const subcategories: Subcategory[] = [];
        for (const cat of matched) {
            for (const sub of cat.categorySubCategories ?? []) {
                if (sub?._id && !seenIds.has(sub._id)) {
                    seenIds.add(sub._id);
                    subcategories.push(sub);
                }
            }
        }
        return { displayName: group.displayName, ids, subcategories };
    }).filter((fused) => fused.ids.length > 0);
}

interface MegaMenuProps {
    isOpen: boolean;
    onClose?: () => void;
    shopButtonRef?: React.RefObject<HTMLDivElement | null>;
}

export default function MegaMenu({ isOpen, onClose, shopButtonRef }: MegaMenuProps) {
    const router = useRouter();
    const { data: categories, status: categoriesStatus } = useAtomValue(categoriesQueryAtom);
    const fusedMenuCategories = useMemo(
        () => buildFusedMenuCategories((categories ?? []) as Category[]),
        [categories]
    );
    const [activeFusedKey, setActiveFusedKey] = useState<string>('');
    const menuRef = useRef<HTMLDivElement>(null);

    // Set first fused category as active when data loads
    useEffect(() => {
        if (fusedMenuCategories.length > 0 && !activeFusedKey) {
            setActiveFusedKey(fusedMenuCategories[0].displayName);
        }
    }, [fusedMenuCategories, activeFusedKey]);

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Don't close if clicking inside the menu
            if (menuRef.current && menuRef.current.contains(target)) {
                return;
            }

            // Don't close if clicking on the Shop button (it handles its own toggle)
            if (shopButtonRef?.current && shopButtonRef.current.contains(target)) {
                return;
            }

            // Close the menu if clicking outside
            if (isOpen) {
                onClose?.();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, shopButtonRef]);

    const isLoading = categoriesStatus === 'pending';

    const activeFused = useMemo(
        () => fusedMenuCategories.find((f) => f.displayName === activeFusedKey),
        [fusedMenuCategories, activeFusedKey]
    );

    const handleSubcategoryClick = (subcategoryId: string) => {
        router.push(`/shop/catalogue?sub=${subcategoryId}&page=1`);
        onClose?.();
    };

    const handleShopAllClick = () => {
        if (activeFused?.ids?.length) {
            router.push(`/shop/catalogue?cat=${activeFused.ids.join(',')}&page=1`);
            onClose?.();
        }
    };

    return (
        <div ref={menuRef} className={`baseContainer ${styles.megaMenu} ${isOpen ? styles.open : ''}`}>
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
                        fusedMenuCategories.map((fused) => (
                            <span
                                key={fused.displayName}
                                onClick={() => setActiveFusedKey(fused.displayName)}
                                className={`text-[1rem] font-medium py-[1rem] px-[1.5rem] text-center rounded-[var(--Radius-md)] cursor-pointer transition-colors duration-200 ${activeFusedKey === fused.displayName ? 'bg-[var(--Secondary-50)]' : 'hover:bg-[var(--Secondary-50)] hover:opacity-70'
                                    }`}
                            >
                                {fused.displayName}
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
                                {activeFused?.subcategories?.map((subcategory) => (
                                    <span
                                        key={subcategory._id}
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

