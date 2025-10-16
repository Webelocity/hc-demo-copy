'use client';

import { Select, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import { GoChevronDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

export default function Searchbar() {
    const [selectedOption, setSelectedOption] = useState('All Categories');

    const dummyOptions = [
        'All Categories',
        'Electronics',
        'Home & Garden',
        'Sports & Outdoors',
        'Clothing',
        'Books',
        'Health & Beauty',
        'Automotive',
        'Toys & Games',
        'Office Supplies'
    ];

    return (
        <div className={`${styles.searchBar} flex flex-[4] justify-around items-center border border-[color:var(--Colors-Neutral-100)] rounded-[var(--Radius-md)]`}>
            <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                displayEmpty
                sx={{
                    minWidth: '10rem',
                }}
                IconComponent={GoChevronDown}
                className='flex-1 border-r border-r-[var(--Colors-Neutral-100)] !rounded-tr-[var(--Radius-md)] !rounded-br-[var(--Radius-md)]'
                MenuProps={{
                    sx: {
                        '& .MuiPaper-root': {
                            width: {
                                xs: '100%',
                                sm: '100%',
                                md: 'fit-content',
                            }
                        },
                    }
                }}
            >
                {dummyOptions.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        className={selectedOption === option ? `${styles.menuItem} ${styles.menuItemActive}` : styles.menuItem}
                        sx={{
                            borderRadius: 'var(--Radius-md)',
                            padding: "1rem 1.5rem",
                            fontWeight: 500,
                            '&.Mui-selected': {
                                backgroundColor: "var(--Secondary-100)"
                            },
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>

            <div className="flex items-center pl-[0.75rem]" />
            <CiSearch className="text-[2rem] font-bold text-[#727289]" />

            <TextField
                placeholder="Search here..."
                sx={{
                    border: 0,
                    flex: 4,
                }}
            />
        </div>
    );
}
