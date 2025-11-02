import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { HiOutlineChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface AvailabilityOption {
    label: string;
    value: string;
}

const AvailabilityDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const availabilityOptions: AvailabilityOption[] = [
        { label: 'In Stock', value: 'in_stock' },
        { label: 'Out of Stock', value: 'out_of_stock' },
        { label: 'High Stock', value: 'high_stock' },
        { label: 'Low Stock', value: 'low_stock' },
    ];

    const currentAvailability = searchParams.get('availability') || '';

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

    const handleAvailabilityChange = (value: string) => {
        const p = new URLSearchParams(searchParams.toString());
        if (currentAvailability === value) {
            p.delete('availability');
        } else {
            p.set('availability', value);
        }
        p.set('page', '1');
        const q = p.toString();
        router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-[0.375rem] text-[0.75rem] text-[color:var(--Neutral-700)] cursor-pointer hover:text-[color:var(--secondary-500-main)] transition-colors font-figtree"
            >
                <span className="text-[0.875rem]">Availability</span>
                <HiOutlineChevronDown className="text-xl" />

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
                        {availabilityOptions.map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center gap-[0.5rem] px-[1rem] py-[0.625rem] cursor-pointer transition-all font-figtree ${currentAvailability === option.value
                                    ? 'bg-[color:var(--Colors-Neutral-50)] rounded-md'
                                    : 'hover:bg-[color:var(--Neutral-50)] rounded-none'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer flex-shrink-0"
                                    checked={currentAvailability === option.value}
                                    onChange={() => handleAvailabilityChange(option.value)}
                                />
                                <span
                                    className={`text-[0.875rem] ${currentAvailability === option.value
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

export default AvailabilityDropdown;

