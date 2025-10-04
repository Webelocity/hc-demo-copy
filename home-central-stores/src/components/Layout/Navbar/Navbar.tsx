'use client';

import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
import { LuChevronDown } from "react-icons/lu";
import { useAtom } from 'jotai';
import { selectedStoreAtom } from '@/atoms/storeAtom';
import { getStoreById, getStoreStatus } from '@/util/shedule';
import { useState } from 'react';
import StoreSelector from '../StoreSelector/StoreSelector';

export default function Navbar() {
    const [selectedStoreId] = useAtom(selectedStoreAtom);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    const store = getStoreById(selectedStoreId);
    const status = getStoreStatus(selectedStoreId);

    return (
        <>
            <nav className="baseContainer py-[1rem] flex items-end gap-[1.5rem]">
                <div className="relative w-[6.6rem] h-[4.7rem]">
                    <Image src="/assets/image/shared/logo.svg" alt="Home Central Stores Logo" fill priority />
                </div>
                <div className="flex flex-col gap-[0.5rem] justify-center items-start">
                    <div className="flex items-center gap-[0.25rem] font-medium text-[var(--secondary-500-main)]">
                        <SlLocationPin className="text-xl" />
                        <p className="text-[1rem]">{store.name}</p>
                    </div>
                    <div className="flex items-center gap-[0.5rem] text-[1rem] font-medium ">
                        {status.isClosed24Hours ? (
                            <span className="text-red-600">Closed Today</span>
                        ) : status.isOpen ? (
                            <>
                                <span className="text-[var(--Colorsuccess)]">Open</span>
                                <span>.</span>
                                <span>Closes {status.closingTime}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-red-600">Closed</span>
                                {status.openingTime && (
                                    <>
                                        <span>.</span>
                                        <span>Opens {status.openingTime}</span>
                                    </>
                                )}
                            </>
                        )}
                        <LuChevronDown
                            className="text-xl cursor-pointer"
                            onClick={() => setIsSelectorOpen(true)}
                        />
                    </div>
                </div>
            </nav>

            <StoreSelector
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
            />
        </>
    );
}