import React from 'react';
import { Rating } from '@mui/material';

type ReviewsSummaryProps = {
    rating?: number;
    ratingsBreakdown?: Record<string, number>;
};

const ReviewsSummary: React.FC<ReviewsSummaryProps> = ({ rating, ratingsBreakdown }) => {
    const breakdownEntries = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: ratingsBreakdown?.[star] ?? ratingsBreakdown?.[`${star}`] ?? 0,
    }));

    const totalReviews = breakdownEntries.reduce((sum, { count }) => sum + count, 0);
    const derivedAverage =
        totalReviews > 0
            ? breakdownEntries.reduce((sum, { star, count }) => sum + star * count, 0) / totalReviews
            : undefined;
    const average = typeof rating === 'number' ? rating : derivedAverage;
    const displayAverage = typeof average === 'number' ? average.toFixed(1) : '—';

    return (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <p className="text-[1.25rem] font-semibold ">
                        Total Reviews ({totalReviews})
                    </p>
                    <p className="text-xs text-gray-500">Community feedback at a glance</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-gray-900">{displayAverage}</div>
                    <Rating
                        name="average-rating"
                        value={typeof average === 'number' ? average : 0}
                        precision={0.1}
                        readOnly
                        size="small"
                    />
                    <span className="text-xs text-gray-500">average rating</span>
                </div>
            </div>

            <div className="mt-6 space-y-5">
                {breakdownEntries.map(({ star, count }) => {
                    const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-2">
                            <div className="flex w-8 items-center gap-1 text-sm text-gray-700">
                                <span className="font-medium">{star}</span>
                            </div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-[var(--secondary-500-main)] transition-[width] duration-300"
                                    style={{ width: `${percent}%` }}
                                    aria-label={`${percent.toFixed(0)} percent of reviews are ${star} star`}
                                />
                            </div>
                            <div className="w-8 text-right text-sm text-gray-700">{count}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewsSummary;


