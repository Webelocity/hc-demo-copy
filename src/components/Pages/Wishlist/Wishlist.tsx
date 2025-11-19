'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { wishlistAtom } from '@/atoms/wishlistAtom';
import ProductCard from '@/components/shared/productCard';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import SortDropdown from '@/components/Pages/Shop/Catalogue/SortDropdown/SortDropdown';
import AvailabilityDropdown from '@/components/Pages/Shop/Catalogue/AvailabilityDropdown/AvailabilityDropdown';
import { Input, InputAdornment } from '@mui/material';
import { IoMdSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { addToCartAtom, addAllToCartAtom } from '@/atoms/cartAtom';
import { BsGridFill, BsListUl } from "react-icons/bs";

export default function Wishlist() {
    const wishlist = useAtomValue(wishlistAtom);
    const searchParams = useSearchParams();
    const addToCartAction = useSetAtom(addToCartAtom);
    const addAllToCartAction = useSetAtom(addAllToCartAtom);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter Logic
    const filteredWishlist = useMemo(() => {
        let result = [...wishlist];

        // Search (Local state + URL param if we wanted, but local is smoother for this)
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(lower));
        }

        // Availability (URL param)
        const availability = searchParams.get('availability');
        if (availability === 'in_stock') {
            result = result.filter(p => (p.inventoryCount ?? 0) > 0);
        } else if (availability === 'out_of_stock') {
            result = result.filter(p => (p.inventoryCount ?? 0) <= 0);
        }

        // Sort (URL param)
        const sort = searchParams.get('sort');
        if (sort === 'low_price') {
            result.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sort === 'high_price') {
            result.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sort === 'nameASC') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'nameDESC') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }
        // Add other sort cases as needed

        return result;
    }, [wishlist, searchTerm, searchParams]);

    const handleAddAllToCart = () => {
        const itemsToAdd = filteredWishlist
            .filter(product => {
                // Only include products that have a valid variant
                const variant = product.lowestPriceVariant || product.productVariants?.[0];
                return variant !== undefined;
            })
            .map(product => ({
                productId: product._id,
                variant: product.lowestPriceVariant || product.productVariants[0],
                quantity: 1,
                fulfillmentMethod: null,
            }));
        addAllToCartAction(itemsToAdd);
    };

    // Mock Categories for the top bar
    const categories = ["Plumbing", "Electrical", "Fasteners", "Construction Materials"];

    if (wishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
                <p className="text-gray-500">Browse our products and find something you like!</p>
                <Link href="/shop">
                    <Button variant="primary">Go to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Wishlist</h1>
                    <p className="text-gray-500">View all your recent and older products</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/cart">
                        <Button variant="outline" className="!rounded-md">
                            View Cart
                        </Button>
                    </Link>
                    <Button variant="primary" className="!rounded-md !bg-[#8B1D15]" onClick={handleAddAllToCart}>
                        <LuShoppingCart /> Add All to Cart
                    </Button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border border-gray-100">
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
                    {categories.map(cat => (
                        <button key={cat} className="px-4 py-2 rounded-full border border-gray-200 text-sm whitespace-nowrap hover:bg-gray-50">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <Input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <IoMdSearch className="text-gray-400" />
                            </InputAdornment>
                        }
                        className="!border !border-gray-200 !rounded-md !px-3 !py-1 !text-sm w-full sm:w-64"
                        disableUnderline
                    />
                    
                    <div className="flex items-center gap-4">
                        <SortDropdown />
                        <AvailabilityDropdown />
                        
                        <div className="flex border border-gray-200 rounded-md overflow-hidden">
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <BsListUl />
                            </button>
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <BsGridFill />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredWishlist.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}
