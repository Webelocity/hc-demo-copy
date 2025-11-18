"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

export default function VersapayComponent({ setIsVersapayValid, setVersapayToken }: VersapayProps) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const tokenizationKey = process.env.NEXT_PUBLIC_VERSAPAY_TOKENIZATION_KEY;

        if (!tokenizationKey) {
            console.error("VersaPay tokenization key is missing");
            toast.error("Payment configuration error. Please contact support.");
            return;
        }

        console.log("Attempting to load VersaPay Collect.js with key:", tokenizationKey.substring(0, 5) + "...");

        // Load Collect.js script
        const scriptId = "versapay-collect-js";
        const existingScript = document.getElementById(scriptId);

        if (existingScript) {
            console.log("Collect.js script already exists");
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://versapay.transactiongateway.com/token/Collect.js";
        script.setAttribute("data-tokenization-key", tokenizationKey);
        script.async = false;

        script.onload = () => {
            console.log("VersaPay Collect.js loaded successfully");

            setTimeout(() => {
                if (typeof window.CollectJS !== 'undefined') {
                    console.log("CollectJS object is available");
                    setScriptLoaded(true);

                    try {
                        window.CollectJS.configure({
                            variant: "inline",
                            styleSniffer: true,
                            googleFont: "Inter",
                            timeoutDuration: 10000,
                            customCss: {
                                "border": "0",
                                "outline": "none",
                                "box-shadow": "none",
                                "background": "transparent",
                                "font-size": "0.875rem",
                                "width": "100%",
                                "box-sizing": "border-box"
                            },
                            invalidCss: {
                                color: "#B00020"
                            },
                            validCss: {
                                color: "#065f46"
                            },
                            focusCss: {
                                color: "#111827"
                            },
                            placeholderCss: {
                                color: "#9CA3AF"
                            },
                            callback: (response: any) => {
                                console.log("VersaPay callback received:", {
                                    hasToken: !!response.token,
                                    hasError: !!response.error,
                                    response
                                });
                                console.log('response', response);
                                setLoading(false);

                                if (response.token) {
                                    console.log("VersaPay token received:", response.token.substring(0, 10) + "...");
                                    setToken(response.token);
                                    setIsVersapayValid(true);
                                    setVersapayToken(response.token);
                                    toast.success("Payment card validated successfully!");
                                } else if (response.error) {
                                    console.error("VersaPay tokenization error:", response.error);
                                    setIsVersapayValid(false);
                                    setVersapayToken(null);
                                    toast.error(response.error.message || "Card validation failed");
                                } else {
                                    console.warn("VersaPay response without token or error:", response);
                                    setIsVersapayValid(false);
                                    setVersapayToken(null);
                                    toast.error("Card validation failed");
                                }
                            },
                            validationCallback: (field: string, status: boolean, message: string) => {
                                console.log(`Field ${field} validation:`, status, message);
                            },
                            fieldsAvailableCallback: () => {
                                console.log("CollectJS fields are now available and rendered");
                            },
                            fields: {
                                ccnumber: {
                                    selector: "#vp-ccnumber",
                                    title: "Card Number",
                                    placeholder: "0000 0000 0000 0000"
                                },
                                ccexp: {
                                    selector: "#vp-ccexp",
                                    title: "Card Expiration",
                                    placeholder: "MM / YY"
                                },
                                cvv: {
                                    selector: "#vp-cvv",
                                    title: "CVV",
                                    placeholder: "CVV"
                                }
                            }
                        });
                        console.log("CollectJS configured successfully");
                    } catch (err) {
                        console.error("Error configuring CollectJS:", err);
                        toast.error("Failed to initialize payment form");
                    }
                } else {
                    console.error("CollectJS not available after script load");
                    toast.error("Payment system failed to load");
                }
            }, 100);
        };

        script.onerror = (error) => {
            console.error("Failed to load VersaPay Collect.js script:", error);
            toast.error("Failed to load payment form. Please refresh the page.");
            setScriptLoaded(false);
        };

        document.body.appendChild(script);
        console.log("Collect.js script added to document");

        return () => {
            // Keep script loaded to avoid re-initialization issues
        };
    }, [setIsVersapayValid, setVersapayToken]);

    const handleGenerateToken = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }

        console.log("Generate token clicked. Script loaded:", scriptLoaded, "CollectJS available:", !!window.CollectJS);

        if (!scriptLoaded || !window.CollectJS) {
            toast.error("Payment form is still loading. Please wait...");
            return;
        }

        setLoading(true);
        console.log("Calling CollectJS.startPaymentRequest()");

        try {
            // This will trigger the callback with the token or error
            window.CollectJS.startPaymentRequest();
        } catch (err) {
            console.error("Error calling startPaymentRequest:", err);
            toast.error("Unable to process payment. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="versapay-component mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Image
                        src={'/assets/image/Shop/Checkout/versapay.png'}
                        alt="VersaPay"
                        width={24}
                        height={24}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">VersaPay</h3>
                </div>
                <span className="text-[11px] text-gray-500">PCI compliant • Tokenized</span>
            </div>

            <form id="versapay-payment-form" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3 space-y-3">
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
                        <label htmlFor="vp-ccnumber" className="block text-sm font-medium text-gray-900 mb-1">
                            Card Number
                        </label>
                        <div
                            id="vp-ccnumber"
                            className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-3 flex items-center"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex-1">
                            <label htmlFor="vp-ccexp" className="block text-sm font-medium text-gray-900 mb-1">
                                Expiry Date
                            </label>
                            <div
                                id="vp-ccexp"
                                className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-3 flex items-center"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="vp-cvv" className="block text-sm font-medium text-gray-900 mb-1">
                                CVV
                            </label>
                            <div
                                id="vp-cvv"
                                className="w-full h-10 rounded-lg border-2 border-gray-300 bg-white px-3 flex items-center"
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="px-3 py-2 rounded-md bg-[var(--primary-600-main)] text-white text-sm disabled:opacity-60"
                    onClick={handleGenerateToken}
                    type="submit"
                    disabled={loading || !scriptLoaded}
                >
                    {loading ? "Validating..." : !scriptLoaded ? "Loading..." : "Validate Payment Card"}
                </button>
            </form>

            {token && (
                <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-900">
                    ✓ Payment card validated successfully
                </div>
            )}
        </div>
    );
}
