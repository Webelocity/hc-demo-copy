'use client';

import { useCallback, useMemo } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { LuPhone, LuMapPin, LuMap } from 'react-icons/lu';
import { MdOutlineMail } from 'react-icons/md';
import { HiOutlineHome } from 'react-icons/hi2';
import type { CheckoutContactFormData } from './ContactSection.schema';
import type { SavedAddress } from '@/types/address';
import { State } from 'country-state-city';
import type { IconType } from 'react-icons';

type ContactConfirmationProps = {
    contact: CheckoutContactFormData;
    showAddresses: boolean;
};

export default function ContactConfirmation({ contact, showAddresses }: ContactConfirmationProps) {
    const { firstName, lastName, email, phoneNumber, selectedAddresses } = contact;
    const contactFullName = `${firstName} ${lastName}`.trim();
    const canShowAddresses = showAddresses && selectedAddresses && selectedAddresses.shipping && selectedAddresses.billing;
    const usStates = useMemo(() => State.getStatesOfCountry('US'), []);
    const getStateLabel = useCallback(
        (code: string) => {
            const match = usStates.find((state) => state.isoCode === code);
            return match?.name ?? code;
        },
        [usStates]
    );

    const contactCards = [
        { icon: FaRegCircleUser, text: contactFullName || '—' },
        { icon: MdOutlineMail, text: email },
        { icon: LuPhone, text: phoneNumber },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-[0.5rem] pl-[2rem] md:grid-cols-2">
                {contactCards.map(({ icon: Icon, text }, idx) => (
                    <InfoCard key={`${text}-${idx}`} icon={Icon} text={text} />
                ))}
            </div>

            {canShowAddresses && selectedAddresses && (
                <div className="border-t border-[var(--Neutral-100)] pt-4">
                    {selectedAddresses.billingSameAsShipping ? (
                        <AddressInfoSection
                            title="Shipping & Billing Address"
                            address={selectedAddresses.shipping}
                            contactName={contactFullName}
                            getStateLabel={getStateLabel}
                        />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            <AddressInfoSection
                                title="Shipping Address"
                                address={selectedAddresses.shipping}
                                contactName={contactFullName}
                                getStateLabel={getStateLabel}
                            />
                            <AddressInfoSection
                                title="Billing Address"
                                address={selectedAddresses.billing}
                                contactName={contactFullName}
                                getStateLabel={getStateLabel}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

type InfoCardProps = {
    icon: IconType;
    text: string;
};

function InfoCard({ icon: Icon, text }: InfoCardProps) {
    return (
        <div className="flex items-center gap-[0.5rem] rounded-xl bg-[var(--Neutral-50)] p-[1rem]">
            <Icon className="text-[1.25rem]" />
            <div className="text-[1rem] font-medium">{text}</div>
        </div>
    );
}

type AddressInfoSectionProps = {
    title: string;
    address: SavedAddress;
    contactName: string;
    getStateLabel: (code: string) => string;
};

function AddressInfoSection({ title, address, contactName, getStateLabel }: AddressInfoSectionProps) {
    const rows = [
        { icon: FaRegCircleUser, text: contactName },
        {
            icon: HiOutlineHome,
            text: `${address.streetAddress}${address.streetAddress2 ? `, ${address.streetAddress2}` : ''}`,
        },
        {
            icon: LuMapPin,
            text: `${address.city}, ${getStateLabel(address.state)}`,
        },
        { icon: LuMap, text: address.zipCode },
    ];

    return (
        <div className="rounded-2xl border border-[var(--Neutral-100)] bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--Neutral-500)]">{title}</p>
            <div className="mt-3 grid grid-cols-1 gap-[0.5rem] sm:grid-cols-2">
                {rows.map(({ icon, text }, idx) => (
                    <InfoCard key={`${title}-${idx}`} icon={icon} text={text} />
                ))}
            </div>
        </div>
    );
}
