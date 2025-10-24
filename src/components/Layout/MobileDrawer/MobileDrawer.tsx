'use client';

import Button from '@/components/shared/Button';
import Link from 'next/link';
import { useState } from 'react';

interface MobileDrawerProps {
    isOpen: boolean;
}

export default function MobileDrawer({ isOpen }: MobileDrawerProps) {
    const [activeTab, setActiveTab] = useState<'main' | 'shop'>('main');

    const renderMain = () => {
        return (
            <div className='flex flex-col'>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/">
                    <span>
                        Home
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/services">
                    <span>
                        Services
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/contractor-zone">
                    <span>
                        Contractor Zone
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/owego-showroom">
                    <span>
                        Owego Showroom
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/">
                    <span>
                        Locations
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/">
                    <span>
                        About
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/contact">
                    <span>
                        Contact
                    </span>
                </Link>
                <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/careers">
                    <span>
                        Careers
                    </span>
                </Link>
                <div className='w-full mt-[3rem]'>
                    <Button variant='primary' fullWidth>
                        Request a Quote
                    </Button>
                </div>

            </div>
        );
    };

    const renderShop = () => {
        return (
            <div>
                {/* Shop content goes here */}
            </div>
        );
    };

    return (
        <div
            className={`baseContainer absolute lg:hidden top-full left-0 w-full bg-white z-50 transition-all duration-300 ease-in-out ${isOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-[10px]'
                }`}
        >
            <div className="p-[2rem] bg-[var(--Secondary-50)] flex flex-col ">
                <div className="flex text-[1.25rem] font-medium">
                    <span
                        className={`p-[1rem] flex-1 rounded-[var(--Radius-md)] text-center cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center ${activeTab === 'main'
                            ? 'bg-[var(--Secondary-100)]'
                            : 'bg-transparent hover:bg-[var(--Secondary-100)]/50'
                            }`}
                        onClick={() => setActiveTab('main')}
                    >
                        Main
                    </span>
                    <span
                        className={`p-[1.5rem] flex-1 rounded-[var(--Radius-md)] text-center cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center ${activeTab === 'shop'
                            ? 'bg-[var(--Secondary-100)]'
                            : 'bg-transparent hover:bg-[var(--Secondary-100)]/50'
                            }`}
                        onClick={() => setActiveTab('shop')}
                    >
                        Shop
                    </span>
                </div>

                {/* Content Area */}
                <div className="mt-[1.5rem]">
                    {activeTab === 'main' ? renderMain() : renderShop()}
                </div>
            </div>
        </div>
    );
}
