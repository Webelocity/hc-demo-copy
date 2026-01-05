// src/components/ProductPages/ProductPages.tsx
"use client"

import React, { useRef } from 'react';
import './ProductPages.scss';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { IconButton } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ProductCard from '@/components/shared/productCard';
import CustomNoData from '@/components/shared/CustomNoData';
import StandardErrorState from '@/components/shared/StandardErrorState';

interface ProductPagesProps {
    ProductsAPI: ApiResponse<Product> | null | undefined;
    isLoading: boolean;
    isError?: boolean;
    errorMessage?: string;
    handlePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}
export default function ProductPages({ ProductsAPI, isLoading, isError, errorMessage, handlePage }: ProductPagesProps) {
    const Shopref = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        Shopref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const shouldShowError = Boolean(isError || (!isLoading && !ProductsAPI));
    if (shouldShowError) {
        return (
            <div className="ProductsParent">
                <div className="ProductsContainer maxW">
                    <StandardErrorState
                        dense
                        title="We couldn't load products"
                        description={errorMessage ? `(${errorMessage})` : "Please try again in a moment."}
                        actions={[
                            {
                                label: 'Retry',
                                variant: 'primary',
                                onClick: () => window?.location?.reload(),
                            },
                            {
                                label: 'Back to home',
                                variant: 'secondary',
                                href: '/',
                            },
                        ]}
                        hints={[
                            'Check your internet connection or try reloading.',
                            'Adjust your filters or sorting and try again.',
                        ]}
                    />
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="ProductsParent">
                <div className="ProductsContainer maxW">
                    {isLoading ? (
                        <div className="grid grid-cols-1 max-[500px]:grid-cols-1 max-[800px]:grid-cols-2 max-[1200px]:grid-cols-3 grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="p-[1.125rem] flex flex-col gap-[0.75rem] rounded-[var(--Radius-xs)] border-[var(--Colors-Neutral-100)] border-solid border-[1px] bg-white">
                                    {/* Image skeleton */}
                                    <div className="w-full h-[4.3rem] mb-2">
                                        <Skeleton variant="rectangular" width="100%" height="100%" />
                                    </div>

                                    {/* Category badge & title */}
                                    <div className="flex flex-col gap-[0.25rem]">
                                        <Skeleton variant="rounded" width="60%" height={24} style={{ marginBottom: 4 }} />
                                        <Skeleton variant="text" width="90%" height={20} />
                                        <Skeleton variant="text" width="50%" height={16} />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-[0.4rem]">
                                        <Skeleton variant="rounded" width="40%" height={20} />
                                    </div>

                                    {/* Variants */}
                                    <Skeleton variant="text" width="50%" height={16} />

                                    {/* Stock & Price */}
                                    <div className="flex justify-between items-center">
                                        <Skeleton variant="text" width="30%" height={20} />
                                        <Skeleton variant="text" width="40%" height={20} />
                                    </div>

                                    {/* Button */}
                                    <Skeleton variant="rounded" width="100%" height={40} />

                                    {/* Shipping */}
                                    <Skeleton variant="text" width="60%" height={16} style={{ margin: 'auto' }} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {ProductsAPI &&
                                <>
                                    {ProductsAPI.totalItems > 0 ? (
                                        <div className="grid grid-cols-1 max-[400px]:grid-cols-1 max-[800px]:grid-cols-2 max-[1200px]:grid-cols-3 grid-cols-4 gap-4" ref={Shopref}>
                                            {ProductsAPI.data.map((product) => (
                                                <ProductCard key={product._id} product={product} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div ref={Shopref}>
                                            <CustomNoData text="No results found for your selection" />
                                        </div>
                                    )}
                                    {ProductsAPI.totalPages > 1 && (
                                        <div className="pagination">
                                            <Pagination
                                                count={ProductsAPI.totalPages}
                                                page={ProductsAPI.currentPage}
                                                onChange={(event, page) => {
                                                    handlePage(event, page);
                                                    scrollToTop();
                                                }}
                                                color="secondary"
                                                boundaryCount={1}
                                                siblingCount={0}
                                                renderItem={(item) => (
                                                    <PaginationItem
                                                        {...item}
                                                        slots={{
                                                            previous: () => (
                                                                <IconButton className='pag-button' onClick={() => { scrollToTop() }} component="span">
                                                                    <GrFormPrevious />
                                                                </IconButton>
                                                            ),
                                                            next: () => (
                                                                <IconButton className='pag-button' onClick={() => { scrollToTop() }} component="span">
                                                                    <GrFormNext />
                                                                </IconButton>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    )}
                                </>
                            }

                        </>
                    )}
                </div>
            </div>

        </>

    );
}
