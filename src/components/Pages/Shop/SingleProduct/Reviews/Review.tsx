import { Rating } from "@mui/material";
import { CiUser } from "react-icons/ci";

type ReviewProps = {
    review: Review;
};

export default function Review({ review }: ReviewProps) {
    const reviewerName =
        review?.userId?.fullName ||
        [review?.userId?.firstname, review?.userId?.lastname].filter(Boolean).join(' ') ||
        review?.guestName ||
        'Anonymous';

    const reviewDate = review?.replyDate
        ? new Date(review.replyDate).toLocaleDateString()
        : '';

    return (
        <div className="flex flex-col gap-[1rem]">
            <div className="flex justify-between items-center gap-[0.5rem]">
                <div className="flex items-center gap-[1.5rem]">
                    <CiUser className="text-3xl " />
                    <span className="text-[1.125rem] font-medium text-[var(--Colors-Neutral-700)]">
                        {reviewerName || 'Anonymous'}
                    </span>
                </div>
                {reviewDate && (
                    <div className="text-[0.875rem] font-medium text-[var(--Colors-Neutral-700)] opacity-50">
                        {reviewDate}
                    </div>
                )}

            </div>
            <Rating sx={{ color: 'var(--Teritary-600-Main)' }} value={review?.rating ?? 0} precision={0.5} readOnly />
            <p className="text-[1.25rem] font-semibold text-[var(--Colors-Neutral-700)]">
                {review?.reviewTitle || 'Review'}
            </p>
            <p className="mt-[0.5rem] text-[1.125rem] text-[var(--Neutral-800)]">{review?.review}</p>


        </div>
    );
}