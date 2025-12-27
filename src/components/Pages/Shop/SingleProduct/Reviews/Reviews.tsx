'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewsList from './ReviewsList';
import ReviewsSummary from './ReviewsSummary';
import ReviewsForm from './ReviewsForm';
import { fetchReviewsByProduct } from '@/Api/Apis';

type ReviewsProps = {
    product: Product;
    loadReviews?: boolean;
};

const Reviews: React.FC<ReviewsProps> = ({ product, loadReviews }) => {
    const productId = product?._id || product?.id;
    const {
        data: remoteReviews,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['product-reviews', productId],
        queryFn: () => fetchReviewsByProduct(productId as string),
        enabled: Boolean(loadReviews && productId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const reviews = (remoteReviews ?? product?.reviews) ?? [];

    const renderSkeleton = () => (
        <div className="flex flex-col gap-[1.25rem]">
            {[1, 2, 3].map((key) => (
                <div
                    key={key}
                    className="rounded-2xl border border-dashed border-gray-200 bg-white p-5 animate-pulse"
                >
                    <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-slate-200" />
                            <div className="h-4 w-28 rounded bg-slate-200" />
                        </div>
                        <div className="h-3 w-16 rounded bg-slate-200" />
                    </div>
                    <div className="h-4 w-24 rounded bg-slate-200 mb-2" />
                    <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-slate-200" />
                        <div className="h-3 w-[90%] rounded bg-slate-200" />
                        <div className="h-3 w-[75%] rounded bg-slate-200" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-[2.5rem] lg:gap-[7.5rem] ">
            <div className='flex-1'>
                {isLoading && (
                    renderSkeleton()
                )}
                {isError && (
                    <div className="rounded-2xl border border-dashed border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
                        {(error as Error)?.message ?? 'Unable to load reviews right now.'}
                    </div>
                )}
                {!isLoading && !isError && <ReviewsList reviews={reviews} />}
            </div>
            <div className="flex-1 flex flex-col gap-[1.75rem]">
                <ReviewsSummary rating={product?.rating} ratingsBreakdown={product?.ratings} />
                <ReviewsForm product={product} />
            </div>


        </div>
    );
};

export default Reviews;

