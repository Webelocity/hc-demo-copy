'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

type CatalogueSearchBarProps = {
    placeholder?: string;
};

export default function CatalogueSearchBar({ placeholder = 'Search in results' }: CatalogueSearchBarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') ?? '');

    useEffect(() => {
        setSearchTerm(searchParams.get('searchTerm') ?? '');
    }, [searchParams]);

    const pushSearch = (params: URLSearchParams) => {
        const q = params.toString();
        router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    };

    const applySearchTerm = (value: string) => {
        const next = value.trim();
        const p = new URLSearchParams(searchParams.toString());
        if (next) p.set('searchTerm', next);
        else p.delete('searchTerm');
        p.set('page', '1');
        pushSearch(p);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                applySearchTerm(searchTerm);
            }}
            className="w-full"
        >
            <div className="flex items-center gap-[0.75rem] w-full rounded-[var(--Radius-md)] bg-white border border-[color:var(--Neutral-100)] shadow-[0_0.125rem_0.75rem_rgba(0,65,40,0.06)] px-[0.9rem] py-[0.75rem]">
                <FiSearch className="text-[1.25rem] text-[color:var(--Neutral-600)] shrink-0" />

                <input
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-[0.95rem] text-[color:var(--Neutral-800)] placeholder:text-[color:var(--Neutral-500)] cursor-text"
                />

                {searchTerm.trim().length > 0 && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm('');
                            applySearchTerm('');
                        }}
                        className="shrink-0  w-[2.25rem] h-[2.25rem] rounded-full bg-[color:var(--Colors-Neutral-50)] text-[color:var(--Neutral-700)] hover:text-[color:var(--secondary-500-main)] flex items-center justify-center transition-colors"
                        aria-label="Clear search"
                    >
                        <IoMdClose className="text-[1.25rem]" />
                    </button>
                )}

                <button
                    type="submit"
                    className="shrink-0 cursor-pointer px-[1rem] py-[0.6rem] rounded-[0.75rem] bg-[color:var(--secondary-500-main)] text-white text-[0.9rem] font-semibold hover:opacity-90 transition-opacity"
                >
                    Search
                </button>
            </div>
        </form>
    );
}


