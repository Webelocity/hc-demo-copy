import React, { useMemo, useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BsSortDownAlt } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

interface SortOption {
    label: string;
    value: string;
}

const SortDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const sortOptions: SortOption[] = [
        { label: 'Featured', value: 'rating' },
        { label: 'Best Selling', value: 'best_selling' },
        { label: 'Popularity', value: 'popularity' },
        { label: 'Latest', value: 'latest' },
        { label: 'Price Low to High', value: 'low_price' },
        { label: 'Price High to Low', value: 'high_price' },
        { label: 'Discount', value: 'discount' },
        { label: 'Name A-Z', value: 'nameASC' },
        { label: 'Name Z-A', value: 'nameDESC' },
        { label: 'Highest Rated', value: 'ratingASC' },
    ];

    const currentSort = searchParams.get('sort') || 'rating';
    const isSortActive = searchParams.has('sort');
    const currentLabel = useMemo(
        () => sortOptions.find((o) => o.value === currentSort)?.label ?? 'Featured',
        [currentSort]
    );

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSortChange = (value: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set('sort', value);
        p.set('page', '1');
        const q = p.toString();
        router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-[0.5rem] text-[0.75rem] text-[color:var(--Neutral-700)] cursor-pointer hover:text-[color:var(--secondary-500-main)] transition-colors font-figtree"
            >
                <BsSortDownAlt className="text-xl" />
                <span
                    className={[
                        'text-[0.875rem] max-w-[12.5rem] truncate',
                        isSortActive ? 'font-semibold text-[color:var(--secondary-500-main)]' : 'text-[color:var(--Neutral-700)]',
                    ].join(' ')}
                    title={currentLabel}
                >
                    {currentLabel}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[calc(100%+0.5rem)] right-0 bg-white rounded-[0.5rem] shadow-lg border border-[color:var(--Neutral-100)] min-w-[12.5rem] z-50 p-[0.5rem]"
                    >
                        {sortOptions.map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center gap-[0.5rem] px-[1rem] py-[0.625rem] cursor-pointer transition-all font-figtree ${currentSort === option.value
                                    ? 'bg-[color:var(--Colors-Neutral-50)] rounded-md'
                                    : 'hover:bg-[color:var(--Neutral-50)] rounded-none'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer flex-shrink-0"
                                    checked={currentSort === option.value}
                                    onChange={() => handleSortChange(option.value)}
                                />
                                <span
                                    className={`text-[0.875rem] ${currentSort === option.value
                                        ? 'font-bold text-black'
                                        : 'font-normal text-[color:var(--Neutral-800)]'
                                        }`}
                                >
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SortDropdown;

