'use client';

import { useState } from "react";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import { HiMiniSparkles } from "react-icons/hi2";

type QuoteRequestPopupProps = {
    dashboardUrl?: string;
    triggerLabel?: string;
    triggerVariant?: 'button' | 'link';
    triggerClassName?: string;
};

export default function QuoteRequestPopup({
    dashboardUrl,
    triggerLabel = "Request a Quote",
    triggerVariant = "button",
    triggerClassName,
}: QuoteRequestPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const signupHref = dashboardUrl ? `${dashboardUrl}/auth/register/regular` : '#';
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            {triggerVariant === "link" ? (
                <button
                    type="button"
                    onClick={handleOpen}
                    className={`text-[0.9rem] text-[var(--Neutral-800)] cursor-pointer hover:text-[var(--primary-500-main)] transition-colors ${triggerClassName ?? ""}`}
                >
                    {triggerLabel}
                </button>
            ) : (
                <Button size="medium" variant="primary" onClick={handleOpen} className={triggerClassName}>
                    {triggerLabel}
                </Button>
            )}

            <Modal
                open={isOpen}
                onClose={handleClose}
                title="Enhanced Quote Experience"
                maxWidth="sm"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <HiMiniSparkles className="text-3xl text-[var(--primary-500-main)] flex-shrink-0" />
                        <p className="text-base text-gray-700">
                            The quote experience is faster, more personalized, and keeps all of your projects organized inside our Customer Dashboard. Sign up to unlock live order tracking, saved quotes, and instant re-orders.
                        </p>
                    </div>
                    <Button size="large" variant="primary" href={signupHref}>
                        Sign up & Start Ordering
                    </Button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-sm cursor-pointer font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </Modal>
        </>
    );
}

