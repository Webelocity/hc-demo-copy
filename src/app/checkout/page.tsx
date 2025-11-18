'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { cartAtom } from '@/atoms/cartAtom';
import { useCartTotals } from '@/hooks/useCartTotals';
import AccordionSection from '@/components/shared/AccordionSection';
import ContactSection from '@/components/Checkout/ContactSection';
import FulfillmentSection from '@/components/Checkout/FulfillmentSection';
import PaymentSection from '@/components/Checkout/PaymentSection';
import OrderSummary from '@/components/Checkout/OrderSummary';
import ContactConfirmation from '@/components/Checkout/ContactConfirmation';
import FulfillmentConfirmation from '@/components/Checkout/FulfillmentConfirmation';
import type { CheckoutContactFormData } from '@/components/Checkout/ContactSection.schema';
import ErrorModal from '@/components/shared/ErrorModal';

type StepId = 'contact' | 'fulfillment' | 'payment';

type Step = {
    id: StepId;
    title: string;
};

const STEPS: Step[] = [
    { id: 'contact', title: 'Contact Information' },
    { id: 'fulfillment', title: 'Fulfillment Method' },
    { id: 'payment', title: 'Payment Method' },
];

export default function CheckoutPage() {
    const initialCompleted: Record<StepId, boolean> = {
        contact: false,
        fulfillment: false,
        payment: false,
    };
    const [completedById, setCompletedById] = useState<Record<StepId, boolean>>(initialCompleted);
    const [openById, setOpenById] = useState<Record<StepId, boolean>>({
        contact: true,
        fulfillment: false,
        payment: false,
    });
    const [contactData, setContactData] = useState<CheckoutContactFormData | null>(null);

    const setComplete = (id: StepId) => {
        setCompletedById((prev) => {
            const nextCompleted = { ...prev, [id]: true };
            setOpenById((prevOpen) => ({ ...prevOpen, [id]: false }));
            const currentIndex = STEPS.findIndex((s) => s.id === id);
            const next = STEPS.slice(currentIndex + 1).find((s) => !nextCompleted[s.id]);
            if (next) {
                setOpenById((prevOpen) => ({ ...prevOpen, [next.id]: true }));
            }
            return nextCompleted;
        });
    };
    const editById = (id: StepId) => {
        setCompletedById((prev) => ({ ...prev, [id]: false }));
        setOpenById((prev) => ({ ...prev, [id]: true }));
    };

    const cart = useAtomValue(cartAtom);
    const { data: totals, isLoading, error: totalsError } = useCartTotals();
    const [totalsErrorOpen, setTotalsErrorOpen] = useState<boolean>(false);
    const handleCloseTotalsError = () => {
        console.log('handleCloseTotalsError');
        setTotalsErrorOpen(false);
    };
    const hasShippingOrDelivery = useMemo(
        () => cart.some((ci) => ci.fulfillmentMethod === 'delivery' || ci.fulfillmentMethod === 'shipping'),
        [cart]
    );
    const hasShipping = useMemo(
        () => cart.some((ci) => ci.fulfillmentMethod === 'shipping'),
        [cart]
    );
    const hasDelivery = useMemo(
        () => cart.some((ci) => ci.fulfillmentMethod === 'delivery'),
        [cart]
    );

    // Auto-open modal for 404 delivery-not-available errors if present
    const totalsErrorStatus = (totalsError as any)?.status as number | undefined;

    useEffect(() => {
        if (totalsErrorStatus === 404 && !totalsErrorOpen) {
            // Avoid re-render loops: open once
            // eslint-disable-next-line react-hooks/rules-of-hooks
            setTotalsErrorOpen(true);
        }
    }, [totalsError]);

    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                <div className="flex-[2] flex flex-col gap-[1rem]">
                    <h1 className="text-[1.75rem] font-bold">Checkout</h1>

                    <AccordionSection
                        index={0}
                        id={STEPS[0].id}
                        title={STEPS[0].title}
                        isOpen={!completedById.contact && openById.contact}
                        isCompleted={completedById.contact}
                        completedContent={
                            contactData ? (
                                <ContactConfirmation
                                    contact={contactData}
                                    showAddresses={hasShippingOrDelivery}
                                />
                            ) : null
                        }
                        onToggle={() => setOpenById((prev) => ({ ...prev, contact: !prev.contact }))}
                        onEdit={() => editById('contact')}
                    >
                        <ContactSection
                            isCompleted={completedById.contact}
                            onComplete={() => setComplete('contact')}
                            setOpenById={setOpenById}
                            onSubmitData={setContactData}
                            requiresAddress={hasShippingOrDelivery}
                        />
                    </AccordionSection>

                    <AccordionSection
                        index={1}
                        id={STEPS[1].id}
                        title={STEPS[1].title}
                        isOpen={!completedById.fulfillment && openById.fulfillment}
                        isCompleted={completedById.fulfillment}
                        completedContent={
                            <FulfillmentConfirmation cart={cart} deliveryCost={totals?.deliveryCosts} />
                        }
                        onToggle={() => setOpenById((prev) => ({ ...prev, fulfillment: !prev.fulfillment }))}
                        onEdit={() => editById('fulfillment')}
                    >
                        <FulfillmentSection
                            isCompleted={completedById.fulfillment}
                            onComplete={() => setComplete('fulfillment')}
                            setOpenById={setOpenById}
                        />
                    </AccordionSection>

                    <AccordionSection
                        index={2}
                        id={STEPS[2].id}
                        title={STEPS[2].title}
                        isOpen={!completedById.payment && openById.payment}
                        isCompleted={completedById.payment}
                        onToggle={() => setOpenById((prev) => ({ ...prev, payment: !prev.payment }))}
                        onEdit={() => editById('payment')}
                    >
                        <PaymentSection isCompleted={completedById.payment} onComplete={() => setComplete('payment')} />
                    </AccordionSection>
                </div>

                <aside className="flex-1">
                    {/*
                        Compute whether all steps are completed to enable place order
                    */}
                    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                    {
                        null
                    }
                    <OrderSummary
                        cart={cart}
                        totals={totals}
                        isLoading={isLoading}
                        hasShippingOrDelivery={hasShippingOrDelivery}
                        hasShipping={hasShipping}
                        hasDelivery={hasDelivery}
                        totalsError={totalsError}
                        onTotalsErrorDetails={() => setTotalsErrorOpen(true)}
                        contact={contactData}
                        allCompleted={completedById.contact && completedById.fulfillment && completedById.payment}
                        cap={5}
                    />
                </aside>
            </div>

            <ErrorModal
                open={totalsErrorOpen}
                onClose={handleCloseTotalsError}
                title={totalsErrorStatus === 404 ? 'Delivery Not Available' : 'Checkout Error'}
                message={
                    totalsError
                        ? (totalsError as Error).message
                        : 'An unknown error occurred while calculating totals.'
                }
            />
        </div>
    );
}

