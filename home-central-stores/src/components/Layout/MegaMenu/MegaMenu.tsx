'use client';

import { useState } from 'react';
import styles from './MegaMenu.module.scss';
import Button from '@/components/shared/Button';

interface MegaMenuProps {
    isOpen: boolean;
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
    const [activeCategory, setActiveCategory] = useState('Building Materials');

    const categories = [
        'Building Materials',
        'Plumbing/Heating',
        'Electrical',
        'Houseware',
        'Hardware',
        'Tools',
        'Lawn and Garden',
        'New Arrivals'
    ];
    const dummySubcategories = [
        'Concrete & Cement',
        'Roofing Materials',
        'Outdoor',
        'Tie',
        'Exterior Doors',
        'Additional Lumber',
        'LVL',
        'Regal ideas',
        'Trusscore',
        'Lumber',
        'Windows',
        'Doors',
        'Siding',
        'Insulation',
        'Trusscore'
    ]

    return (
        <div className={`baseContainer ${styles.megaMenu} ${isOpen ? styles.open : ''}`}>
            <div className="w-full  flex  bg-white border-[1.5px] border-solid border-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.5rem]">
                <div className="flex flex-col gap-[0.5rem] p-[0.5rem] flex-1 border-r border-solid border-r-[var(--Secondary-100)]">
                    {categories.map((category, index) => (
                        <span
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={`text-[1rem] font-medium py-[1rem] px-[1.5rem] text-center rounded-[var(--Radius-md)] cursor-pointer ${activeCategory === category ? 'bg-[var(--Secondary-50)]' : ''
                                }`}
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <div className="flex-[4] h-fit p-[1rem] ">
                    <div className='grid grid-cols-4 gap-[0.5rem] '>
                        {dummySubcategories.map((subcategory, index) => (
                            <span key={index} className='px-[1rem] py-[0.75rem] text-start text-[1rem] font-medium cursor-pointer'>
                                {subcategory}
                            </span>
                        ))}
                    </div>
                    <div className='mt-[1rem]'>
                        <Button variant='outline'>
                            Shop All
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

