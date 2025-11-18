'use client';

import { useCallback, useState } from 'react';
import { useSetAtom } from 'jotai';
import VersapayComponent from './VersaPay';
import { versapayTokenAtom, versapayValidAtom } from '@/atoms/paymentAtom';

type PaymentSectionProps = {
    isCompleted: boolean;
    onComplete: () => void;
};

export default function PaymentSection({ isCompleted, onComplete }: PaymentSectionProps) {
    const [isValid, setIsValid] = useState<boolean>(false);
    const setTokenAtom = useSetAtom(versapayTokenAtom);
    const setValidAtom = useSetAtom(versapayValidAtom);

    const handleSetValid = useCallback((v: boolean) => {
        setIsValid(v);
        setValidAtom(v);
    }, [setValidAtom]);

    const handleSetToken = useCallback((t: string | null) => {
        setTokenAtom(t);
        if (t) {
            // Log freshly received token on validation
            try {
                // eslint-disable-next-line no-console
                console.log('VersaPay token:', String(t).slice(0, 12) + '...');
            } catch {
                // ignore
            }
        }
    }, [setTokenAtom]);

    return (
        <div className="flex flex-col gap-3">
            {!isCompleted ? (
                <>
                    <VersapayComponent
                        setIsVersapayValid={handleSetValid}
                        setVersapayToken={handleSetToken}
                    />

                    <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                            {isValid ? 'Card validated' : 'Please validate your card to continue'}
                        </div>
                        <button
                            type="button"
                            onClick={onComplete}
                            disabled={!isValid}
                            className="px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: isValid ? '#065f46' : '#9CA3AF',
                                color: '#ffffff',
                                border: 'none',
                                cursor: isValid ? 'pointer' : 'not-allowed',
                            }}
                        >
                            Confirm Payment Method
                        </button>
                    </div>
                </>
            ) : (
                <div className="rounded-md border border-gray-200 p-3 text-sm text-gray-800">
                    Payment method confirmed
                </div>
            )}
        </div>
    );
}


