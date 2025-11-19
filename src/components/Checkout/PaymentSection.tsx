'use client';

import { useCallback, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import VersapayComponent from './VersaPay';
import { versapayCardSummaryAtom, versapayTokenAtom, versapayValidAtom } from '@/atoms/paymentAtom';
import Button from '@/components/shared/Button';
import VersaPaySuccess from './VersaPaySuccess';
import { toast } from 'react-toastify';

type PaymentSectionProps = {
    isCompleted: boolean;
    onComplete: () => void;
};

export default function PaymentSection({ isCompleted, onComplete }: PaymentSectionProps) {
    const [isValid, setIsValid] = useState<boolean>(false);
    const setTokenAtom = useSetAtom(versapayTokenAtom);
    const setValidAtom = useSetAtom(versapayValidAtom);
    const cardSummary = useAtomValue(versapayCardSummaryAtom);

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
                        <Button
                            type="button"
                            variant="primary"
                            size="small"
                            onClick={() => {
                                if (!isValid) {
                                    toast.error('Please validate your card first');
                                    return;
                                }
                                onComplete();
                            }}
                        >
                            Proceed to Payment
                        </Button>
                    </div>
                </>
            ) : null}
        </div>
    );
}


