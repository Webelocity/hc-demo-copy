import React from 'react';
import Review from './Review';

type ReviewsListProps = {
    reviews?: Review[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
    const hasReviews = reviews && reviews.length > 0;

    if (!hasReviews) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
                No reviews yet. Be the first to leave feedback.
            </div>
        );
    }

    return (
        <div className="flex flex-col py-6 gap-[1.75rem] max-h-[30rem] overflow-y-auto pr-1">
            {reviews?.map((review, idx) => (
                <div key={review?._id ?? idx} className="flex flex-col gap-[1.75rem]">
                    <Review review={review} />
                    {idx < reviews.length - 1 && (
                        <div className="h-px w-full bg-[var(--Neutral-100)]" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewsList;

