'use client';

import {
  fetchAllProducts,
  fetchProductsByCategoryId,
  getCategories,
} from '@/Api/Apis';
import useDebounce from '@/hooks/useDebounce';
import { CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';
import styles from './SearchBar.module.css';
import SearchResults from './SearchResults';
import { useRouter } from 'next/navigation';

export default function Searchbar() {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
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

  const handleEnterPress = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('searchTerm', searchTerm);
    if (selectedOption) params.set('category', selectedOption);
    router.push(`/shop?${params.toString()}`);
    handleCloseDropdown();
  };
  return (
    <div
      ref={searchBarRef}
      className={`${styles.searchBar} flex flex-[4] justify-around items-center border border-[color:var(--Colors-Neutral-100)] rounded-[var(--Radius-md)] relative`}
    >
      <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return 'All Categories';
          }
          return (
            categories?.find((cat) => cat._id === selected)?.name ||
            'All Categories'
          );
        }}
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
        {isLoading ? (
          <MenuItem disabled sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color='primary' />
          </MenuItem>
        ) : (
          categories?.map((option) => (
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
          ))
        )}
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleEnterPress();
          }
        }}
      />

      <SearchResults
        results={searchResponse}
        isLoading={searchLoading}
        isError={searchError}
        searchTerm={debouncedSearchTerm}
        categoryId={selectedOption}
        onClose={handleCloseDropdown}
        isOpen={isDropdownOpen && debouncedSearchTerm.length > 0}
      />
    </div>
  );
}
