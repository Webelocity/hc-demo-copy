'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
    interface Window {
        VersaPay?: any;
        PayFabric?: any;
    }
}

type VersaPaySdk = {
    init?: (opts: { publicKey: string }) => any;
    mount?: (config: Record<string, { selector: string; placeholder?: string }>) => void;
    tokenize?: () => Promise<{ token?: string; error?: { message?: string } }>;
};

export function useVersaPay(publicKey: string | undefined) {
    const [sdk, setSdk] = useState<VersaPaySdk | null>(null);
    const [ready, setReady] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const scriptAddedRef = useRef<boolean>(false);

    const scriptSrc = useMemo(() => {
        // Allow configuring the SDK script via env for flexibility:
        // e.g. NEXT_PUBLIC_VERSAPAY_JS_SRC=https://example.com/payfabric.js
        return process.env.NEXT_PUBLIC_VERSAPAY_JS_SRC;
    }, []);

    useEffect(() => {
        if (!publicKey) {
            setError('Payment is unavailable: missing tokenization key.');
            return;
        }
        if (!scriptSrc) {
            setError('Payment is unavailable: missing SDK script (NEXT_PUBLIC_VERSAPAY_JS_SRC).');
            return;
        }
        if (scriptAddedRef.current) {
            return;
        }
        scriptAddedRef.current = true;

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.onload = () => {
            try {
                const possible = (window.PayFabric as VersaPaySdk) || (window.VersaPay as VersaPaySdk);
                if (!possible) {
                    setError('Payment SDK failed to load.');
                    return;
                }
                const instance = possible.init ? possible.init({ publicKey }) : possible;
                setSdk(instance || possible);
                setReady(Boolean(instance || possible));
            } catch (e) {
                setError('Payment SDK initialization failed.');
            }
        };
        script.onerror = () => {
            setError('Failed to load payment SDK script.');
        };
        document.body.appendChild(script);
        return () => {
            try {
                document.body.removeChild(script);
            } catch {
                // ignore
            }
        };
    }, [publicKey, scriptSrc]);

    return { sdk, ready, error };
}


