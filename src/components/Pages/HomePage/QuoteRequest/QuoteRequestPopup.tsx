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
    buttonVariant?: 'primary' | 'secondary' | 'outline';
};

export default function QuoteRequestPopup({
    dashboardUrl = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD,
    triggerLabel = "Request a Quote",
    triggerVariant = "button",
    triggerClassName,
    buttonVariant = "primary",
}: QuoteRequestPopupProps) {

    const [isOpen, setIsOpen] = useState(false);
    const signupHref = dashboardUrl ? `${dashboardUrl}/auth/register/regular` : '#';
    const loginHref = dashboardUrl ? `${dashboardUrl}/auth/login` : '#';
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleSignup = () => {
        if (signupHref !== '#') {
            window.open(signupHref, '_blank', 'noopener,noreferrer');
        }
    };
    const handleLogin = () => {
        if (loginHref !== '#') {
            window.open(loginHref, '_blank', 'noopener,noreferrer');
        }
    };

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
                <Button size="medium" variant={buttonVariant} onClick={handleOpen} className={triggerClassName}>
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
                    <Button size="large" variant="primary" onClick={handleSignup}>
                        Sign up & Start Ordering
                    </Button>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="text-[var(--primary-500-main)] font-medium hover:underline cursor-pointer"
                            >
                                Login here
                            </button>
                        </p>

                    </div>
                </div>
            </Modal>
        </>
    );
}

