'use client';

import { Select, MenuItem, TextField } from '@mui/material';
import { useMemo, useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { GoChevronDown } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAllProducts,
  fetchProductsByCategoryId,
  getCategories,
} from '@/Api/Apis';
import debounce from '@/util/debounce';
import SearchResults from './SearchResults';

export default function Searchbar() {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const debounceSearch = useMemo(() => {
    return debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 500);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debounceSearch(term);
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['categories'], queryFn: () => getCategories() });

  const {
    data: searchResponse,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery<ApiResponse<Product>>({
    queryKey: ['products', selectedOption, debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm === '' || selectedOption === '') {
        return fetchAllProducts({ searchTerm: debouncedSearchTerm });
      }

      return fetchProductsByCategoryId(selectedOption, {
        searchTerm: debouncedSearchTerm,
      });
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div
      ref={searchBarRef}
      className={`${styles.searchBar} flex flex-[4] justify-around items-center border border-[color:var(--Colors-Neutral-100)] rounded-[var(--Radius-md)] relative`}
    >
      <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        displayEmpty
        defaultValue={
          categories && categories.length > 0
            ? categories[0].name
            : 'All Categories'
        }
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
              },
            },
          },
        }}
      >
        {categories?.map((option) => (
          <MenuItem
            key={option._id}
            value={option._id}
            className={
              selectedOption === option._id
                ? `${styles.menuItem} ${styles.menuItemActive}`
                : styles.menuItem
            }
            sx={{
              borderRadius: 'var(--Radius-md)',
              padding: '1rem 1.5rem',
              fontWeight: 500,
              '&.Mui-selected': {
                backgroundColor: 'var(--Secondary-100)',
              },
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>

      <div className='flex items-center pl-[0.75rem]' />
      <CiSearch className='text-[2rem] font-bold text-[#727289]' />

      <TextField
        placeholder='Search here...'
        sx={{
          border: 0,
          flex: 4,
        }}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <SearchResults
        results={searchResponse}
        isLoading={searchLoading}
        isError={searchError}
        searchTerm={debouncedSearchTerm}
        onClose={handleCloseDropdown}
        isOpen={isDropdownOpen && debouncedSearchTerm.length > 0}
      />
    </div>
  );
}
