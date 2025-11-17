'use client';

type PaymentSectionProps = {
    isCompleted: boolean;
    onComplete: () => void;
};

export default function PaymentSection({ isCompleted, onComplete }: PaymentSectionProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="text-sm text-[var(--Colors-Neutral-700)]">
                Payment form goes here.
            </div>
            {!isCompleted ? (
                <div className="mt-1">
                    <button
                        type="button"
                        onClick={onComplete}
                        className="px-3 py-2 rounded-md bg-[var(--primary-600-main)] text-white text-sm"
                    >
                        Mark Payment Complete
                    </button>
                </div>
            ) : null}
        </div>
    );
}


