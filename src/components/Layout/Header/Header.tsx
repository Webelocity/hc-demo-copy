'use client';

import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
import { LuChevronDown, LuShoppingCart } from "react-icons/lu";
import { useAtom } from 'jotai';
import { selectedStoreAtom } from '@/atoms/storeAtom';
import { getStoreById, getStoreStatus } from '@/util/shedule';
import { useState } from 'react';
import StoreSelector from '../StoreSelector/StoreSelector';
import Searchbar from "../SearchBar/Searchbar";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import Button from "@/components/shared/Button";
import { PiListBold } from "react-icons/pi";
import MobileDrawer from "../MobileDrawer/MobileDrawer";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Badge } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
    const [selectedStoreId] = useAtom(selectedStoreAtom);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter();
    const store = getStoreById(selectedStoreId);
    const status = getStoreStatus(selectedStoreId);

    return (
        <>
            <div className="relative">
                <header className="baseContainer py-[1rem] flex items-center justify-between gap-[1.5rem]">

                    <div className="flex items-center gap-[1rem]">
                        {isDrawerOpen ? (
                            <IoIosCloseCircleOutline
                                className="text-3xl cursor-pointer lg:hidden"
                                onClick={() => setIsDrawerOpen(false)}
                            />
                        ) : (
                            <PiListBold
                                className="text-3xl cursor-pointer lg:hidden"
                                onClick={() => setIsDrawerOpen(true)}
                            />
                        )}

                        <div className="relative  w-[5rem] h-[3.7rem] lg:w-[6.6rem] lg:h-[4.7rem] cursor-pointer" onClick={() => router.push('/')}>
                            <Image src="/assets/image/shared/logo.svg" alt="Home Central Stores Logo" fill priority />
                        </div>
                    </div>
                    {/* Store Name and Status */}
                    <div className="hidden h-[-webkit-fill-available] flex-col gap-[0.5rem] justify-end items-start lg:flex">
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
                    <div className="hidden lg:flex flex-[4]">
                        <Searchbar />

                    </div>
                    <div className="flex items-center gap-[1rem]">
                        <div className="flex items-center">
                            <Badge
                                variant="dot"
                                overlap="circular"
                                sx={{
                                    '& .MuiBadge-dot': {
                                        backgroundColor: 'var(--Teritary-600-Main)',
                                    }
                                }}
                            >
                                <IoMdHeartEmpty className="text-2xl cursor-pointer" />
                            </Badge>
                        </div>
                        <div className="flex items-center">
                            <Badge
                                variant="dot"
                                overlap="circular"
                                sx={{
                                    '& .MuiBadge-dot': {
                                        backgroundColor: 'var(--Teritary-600-Main)',
                                    }
                                }}
                            >
                                <LuShoppingCart className="text-2xl cursor-pointer" />
                            </Badge>
                        </div>
                        <Button variant="outline">
                            <CiUser className="text-xl" />

                            Login
                        </Button>
                    </div>


                </header>

                <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </div>




            <div className="baseContainer flex lg:hidden">
                <Searchbar />
            </div>






            <StoreSelector
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
            />
        </>
    );
}