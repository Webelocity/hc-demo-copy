"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { versapayCardSummaryAtom } from "@/atoms/paymentAtom";
import Button from "@/components/shared/Button";

interface VersapayProps {
    setIsVersapayValid: (v: boolean) => void;
    setVersapayToken: (t: string | null) => void;
}

declare global {
    interface Window {
        CollectJS?: {
            configure: (config: any) => void;
            startPaymentRequest: () => void;
        };
    }
}

type FieldErrorMap = {
    ccnumber?: string | null;
    ccexp?: string | null;
    cvv?: string | null;
};

export default function VersapayComponent({
    setIsVersapayValid,
    setVersapayToken,
}: VersapayProps) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formReady, setFormReady] = useState(false); // fields actually mounted
    const [fieldErrors, setFieldErrors] = useState<FieldErrorMap>({});
    const setCardSummary = useSetAtom(versapayCardSummaryAtom);

    const configureCollectJs = useCallback(() => {
        if (!window.CollectJS) return;

        try {
            window.CollectJS.configure({
                variant: "inline",
                styleSniffer: true,
                googleFont: "Inter",
                timeoutDuration: 10000,
                customCss: {
                    border: "0",
                    outline: "none",
                    "box-shadow": "none",
                    background: "transparent",
                    "font-size": "0.875rem",
                    width: "100%",
                    "box-sizing": "border-box",
                },
                invalidCss: {
                    color: "#B00020",
                },
                validCss: {
                    color: "#065f46",
                },
                focusCss: {
                    color: "#111827",
                },
                placeholderCss: {
                    color: "#9CA3AF",
                },
                callback: (response: any) => {
                    console.log("VersaPay callback:", response);
                    setLoading(false);

                    if (response.token) {
                        const card = response.card || {};
                        const number: string | undefined = card.number;
                        const exp: string | undefined = card.exp;
                        const brand: string | undefined = card.type;

                        const last4 =
                            typeof number === "string" && number.length >= 4
                                ? number.slice(-4)
                                : undefined;

                        setToken(response.token);
                        setIsVersapayValid(true);
                        setVersapayToken(response.token);

                        setCardSummary({
                            brand,
                            last4,
                            exp,
                        });

                        toast.success("Payment card validated successfully!");
                    } else if (response.error) {
                        console.error("VersaPay tokenization error:", response.error);
                        setIsVersapayValid(false);
                        setVersapayToken(null);
                        setCardSummary(null);
                        toast.error(response.error.message || "Card validation failed");
                    } else {
                        console.warn("VersaPay response without token or error:", response);
                        setIsVersapayValid(false);
                        setVersapayToken(null);
                        setCardSummary(null);
                        toast.error("Card validation failed");
                    }
                },
                validationCallback: (field: string, status: boolean, message: string) => {
                    // Keep a simple map of errors per field
                    setFieldErrors((prev) => ({
                        ...prev,
                        [field]: status ? null : message || "Invalid field",
                    }));
                },
                fieldsAvailableCallback: () => {
                    console.log("CollectJS fields are now available and rendered");
                    setFormReady(true);
                },
                fields: {
                    ccnumber: {
                        selector: "#vp-ccnumber",
                        title: "Card Number",
                        placeholder: "0000 0000 0000 0000",
                    },
                    ccexp: {
                        selector: "#vp-ccexp",
                        title: "Card Expiration",
                        placeholder: "MM / YY",
                    },
                    cvv: {
                        selector: "#vp-cvv",
                        title: "CVV",
                        placeholder: "CVV",
                    },
                },
            });

            console.log("CollectJS configured successfully");
        } catch (err) {
            console.error("Error configuring CollectJS:", err);
            toast.error("Failed to initialize payment form");
        }
    }, [setIsVersapayValid, setVersapayToken, setCardSummary]);

    useEffect(() => {
        const tokenizationKey = process.env.NEXT_PUBLIC_VERSAPAY_TOKENIZATION_KEY;

        if (!tokenizationKey) {
            console.error("VersaPay tokenization key is missing");
            toast.error("Payment configuration error. Please contact support.");
            return;
        }

        const scriptId = "versapay-collect-js";
        const existingScript = document.getElementById(scriptId) as
            | HTMLScriptElement
            | null;

        // If script already exists, just configure again
        if (existingScript) {
            console.log("Collect.js script already exists");
            if (window.CollectJS) {
                configureCollectJs();
            }
            return;
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://versapay.transactiongateway.com/token/Collect.js";
        script.setAttribute("data-tokenization-key", tokenizationKey);
        script.async = true;

        script.onload = () => {
            console.log("VersaPay Collect.js loaded successfully");
            if (window.CollectJS) {
                configureCollectJs();
            } else {
                console.error("CollectJS not available after script load");
                toast.error("Payment system failed to load");
            }
        };

        script.onerror = (error) => {
            console.error("Failed to load VersaPay Collect.js script:", error);
            toast.error("Failed to load payment form. Please refresh the page.");
        };

        document.body.appendChild(script);
        console.log("Collect.js script added to document");
    }, [configureCollectJs]);

    const handleGenerateToken = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();

        console.log(
            "Generate token clicked. Form ready:",
            formReady,
            "CollectJS available:",
            !!window.CollectJS
        );

        if (!formReady || !window.CollectJS) {
            toast.error("Payment form is still loading. Please wait...");
            return;
        }

        setLoading(true);

        try {
            window.CollectJS.startPaymentRequest();
        } catch (err) {
            console.error("Error calling startPaymentRequest:", err);
            toast.error("Unable to process payment. Please try again.");
            setLoading(false);
        }
    };

    const hasValidationErrors = Object.values(fieldErrors).some((v) => v);
    const buttonDisabled = loading || !formReady || hasValidationErrors;

    return (
        <div className="versapay-component mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Image
                        src={"/assets/image/Shop/Checkout/versapay.png"}
                        alt="VersaPay"
                        width={24}
                        height={24}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">VersaPay</h3>
                </div>
                <span className="text-[11px] text-gray-500">
                    PCI compliant • Tokenized
                </span>
            </div>

            <form
                id="versapay-payment-form"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3"
            >
                <style>{`
          #vp-ccnumber iframe,
          #vp-ccexp iframe,
          #vp-cvv iframe {
            border: 0 !important;
            outline: none !important;
            box-shadow: none !important;
            background: transparent !important;
            width: 100% !important;
            height: 100% !important;
          }
        `}</style>

                <div>
                    <label
                        htmlFor="vp-ccnumber"
                        className="block text-sm font-medium text-gray-900 mb-1"
                    >
                        Card Number
                    </label>
                    <div
                        id="vp-ccnumber"
                        className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-3 flex items-center"
                    />
                    {fieldErrors.ccnumber && (
                        <p className="mt-1 text-xs text-red-600">{fieldErrors.ccnumber}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex-1">
                        <label
                            htmlFor="vp-ccexp"
                            className="block text-sm font-medium text-gray-900 mb-1"
                        >
                            Expiry Date
                        </label>
                        <div
                            id="vp-ccexp"
                            className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-3 flex items-center"
                        />
                        {fieldErrors.ccexp && (
                            <p className="mt-1 text-xs text-red-600">{fieldErrors.ccexp}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label
                            htmlFor="vp-cvv"
                            className="block text-sm font-medium text-gray-900 mb-1"
                        >
                            CVV
                        </label>
                        <div
                            id="vp-cvv"
                            className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-3 flex items-center"
                        />
                        {fieldErrors.cvv && (
                            <p className="mt-1 text-xs text-red-600">{fieldErrors.cvv}</p>
                        )}
                    </div>
                </div>

                <Button
                    variant="primary"
                    size="small"
                    className="w-full"
                    onClick={handleGenerateToken}
                    type="submit"
                    disabled={buttonDisabled}
                >
                    {loading
                        ? "Validating..."
                        : !formReady
                            ? "Loading Payment Form..."
                            : "Validate Payment Card"}
                </Button>
            </form>

            {token && (
                <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-900">
                    ✓ Payment card validated successfully
                </div>
            )}
        </div>
    );
}
