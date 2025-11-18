'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { Checkbox, FormControlLabel, Radio, IconButton, Menu, MenuItem } from '@mui/material';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';
import AddressForm from './AddressForm';
import { addressBookAtom } from '@/atoms/addressBookAtom';
import { selectedAddressesAtom } from '@/atoms/checkoutSelectionAtom';
import { Country, State } from 'country-state-city';
import { toast } from 'react-toastify';
import { HiDotsHorizontal } from 'react-icons/hi';

type AddressBookSectionProps = {
    onSelectionChange: (value: AddressSelectionValue) => void;
};

const generateAddressId = () => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `addr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

export default function AddressBookSection({ onSelectionChange }: AddressBookSectionProps) {
    const [addresses, setAddresses] = useAtom(addressBookAtom);
    const setSelectedAddresses = useSetAtom(selectedAddressesAtom);
    const [selectedShippingId, setSelectedShippingId] = useState<string | null>(addresses[0]?.id ?? null);
    const [selectedBillingId, setSelectedBillingId] = useState<string | null>(addresses[0]?.id ?? null);
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);

    const countries = useMemo(() => Country.getAllCountries(), []);

    useEffect(() => {
        if (addresses.length === 0) {
            setSelectedShippingId(null);
            setSelectedBillingId(null);
            return;
        }
        if (selectedShippingId && !addresses.some((addr) => addr.id === selectedShippingId)) {
            setSelectedShippingId(addresses[0].id);
        } else if (!selectedShippingId) {
            setSelectedShippingId(addresses[0].id);
        }

        if (billingSameAsShipping) {
            setSelectedBillingId(null);
            return;
        }

        if (selectedBillingId && !addresses.some((addr) => addr.id === selectedBillingId)) {
            setSelectedBillingId(addresses[0].id);
        } else if (!selectedBillingId) {
            setSelectedBillingId(addresses[0].id);
        }
    }, [addresses, billingSameAsShipping, selectedBillingId, selectedShippingId]);

    useEffect(() => {
        const shipping = addresses.find((addr) => addr.id === selectedShippingId) ?? null;
        const billing = billingSameAsShipping ? shipping : addresses.find((addr) => addr.id === selectedBillingId) ?? null;
        const selection = {
            shipping,
            billing,
            billingSameAsShipping,
        };
        onSelectionChange(selection);
        setSelectedAddresses(selection);
    }, [addresses, billingSameAsShipping, onSelectionChange, selectedBillingId, selectedShippingId]);

    const openCreateModal = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const openEditModal = (addr: SavedAddress) => {
        setEditingAddress(addr);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingAddress(null);
        setIsModalOpen(false);
    };

    const handleSaveAddress = (values: AddressFormValues) => {
        if (editingAddress) {
            setAddresses((prev) =>
                prev.map((addr) =>
                    addr.id === editingAddress.id
                        ? {
                            ...addr,
                            ...values,
                            updatedAt: new Date().toISOString(),
                        }
                        : addr
                )
            );
            toast.success('Address updated');
        } else {
            const newAddress: SavedAddress = {
                id: generateAddressId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ...values,
            };
            setAddresses((prev) => [...prev, newAddress]);
            toast.success('Address saved');
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        const target = addresses.find((addr) => addr.id === id);
        if (!target) return;
        const confirmDelete = window.confirm(`Delete address "${target.label}"?`);
        if (!confirmDelete) return;
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        toast.info('Address removed');
    };

    const formatCountryLabel = useCallback(
        (countryCode: string) => {
            const info = countries.find((country) => country.isoCode === countryCode);
            return info?.name ?? countryCode;
        },
        [countries]
    );

    const formatStateLabel = useCallback((countryCode: string, stateCode: string) => {
        const stateList = State.getStatesOfCountry(countryCode);
        const info = stateList.find((state) => state.isoCode === stateCode);
        return info?.name ?? stateCode;
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[1.25rem] font-semibold">Shipping Address</h3>
                    <p className="text-sm text-[var(--Neutral-500)]">Choose where we should ship or deliver your items.</p>
                </div>
                <Button variant="secondary" size="small" onClick={openCreateModal}>
                    Add New Address
                </Button>
            </div>
            <address className="flex flex-col gap-3 not-italic">
                {addresses.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-[var(--Neutral-200)] p-4 text-[var(--Neutral-500)]">
                        No saved addresses yet. Add one to continue.
                    </div>
                )}
                {addresses.map((address) => (
                    <AddressCard
                        key={address.id}
                        address={address}
                        stateLabel={formatStateLabel(address.country, address.state)}
                        countryLabel={formatCountryLabel(address.country)}
                        selected={selectedShippingId === address.id}
                        onSelect={() => setSelectedShippingId(address.id)}
                        onEdit={() => openEditModal(address)}
                        onDelete={() => handleDelete(address.id)}
                    />
                ))}
                <AddAddressRow onClick={openCreateModal} />
            </address>

            <div className="border-t border-[var(--Neutral-100)] pt-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-[1.25rem] font-semibold">Billing Address</h3>
                        <p className="text-sm text-[var(--Neutral-500)]">Use the same address or pick another one for billing.</p>
                    </div>
                    <FormControlLabel
                        control={<Checkbox checked={billingSameAsShipping} onChange={(e) => setBillingSameAsShipping(e.target.checked)} />}
                        label="Billing same as shipping"
                    />
                </div>

                {!billingSameAsShipping && (
                    <address className="mt-4 flex flex-col gap-3 not-italic">
                        {addresses.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-[var(--Neutral-200)] p-4 text-[var(--Neutral-500)]">
                                No saved addresses yet. Add one to continue.
                            </div>
                        )}
                        {addresses.map((address) => (
                            <AddressCard
                                key={`billing-${address.id}`}
                                address={address}
                                stateLabel={formatStateLabel(address.country, address.state)}
                                countryLabel={formatCountryLabel(address.country)}
                                selected={selectedBillingId === address.id}
                                onSelect={() => setSelectedBillingId(address.id)}
                                onEdit={() => openEditModal(address)}
                                onDelete={() => handleDelete(address.id)}
                            />
                        ))}
                        <AddAddressRow onClick={openCreateModal} />
                    </address>
                )}
            </div>

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                title={editingAddress ? 'Edit Address' : 'Add New Address'}
                maxWidth="sm"
            >
                <AddressForm
                    initialValues={
                        editingAddress
                            ? {
                                label: editingAddress.label,
                                phoneNumber: editingAddress.phoneNumber,
                                country: editingAddress.country,
                                state: editingAddress.state,
                                city: editingAddress.city,
                                streetAddress: editingAddress.streetAddress,
                                streetAddress2: editingAddress.streetAddress2,
                                zipCode: editingAddress.zipCode,
                            }
                            : undefined
                    }
                    onSubmit={handleSaveAddress}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
}

type AddressCardProps = {
    address: SavedAddress;
    stateLabel: string;
    countryLabel: string;
    selected: boolean;
    onSelect: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

function AddressCard({ address, stateLabel, countryLabel, selected, onSelect, onEdit, onDelete }: AddressCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const openMenu = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => setAnchorEl(null);

    const selectAddress = () => {
        onSelect();
    };

    const concatenatedAddress = [
        address.streetAddress,
        address.streetAddress2,
        address.city,
        stateLabel,
        countryLabel,
        address.zipCode,
    ]
        .filter(Boolean)
        .join(', ');

    return (
        <div
            className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            onClick={selectAddress}
        >
            <Radio
                checked={selected}
                onChange={selectAddress}
                value={address.id}
                sx={{
                    color: 'var(--secondary-500-main)',
                    '&.Mui-checked': {
                        color: 'var(--secondary-500-main)',
                    },
                }}
            />
            <div className="flex flex-1 flex-col">
                <p className="text-[1rem] font-semibold text-[var(--Neutral-900)]">{address.label}</p>
                <p className="text-[0.75rem] text-[var(--Neutral-500)]">{concatenatedAddress}</p>
            </div>
            <IconButton onClick={openMenu} size="small" sx={{ color: 'var(--Neutral-500)' }}>
                <HiDotsHorizontal />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    onClick={(event) => {
                        event.stopPropagation();
                        closeMenu();
                        onEdit();
                    }}
                    sx={{ color: 'var(--secondary-500-main)' }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={(event) => {
                        event.stopPropagation();
                        closeMenu();
                        onDelete();
                    }}
                    sx={{ color: 'var(--Error-500,#c62828)' }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}

type AddAddressRowProps = {
    onClick: () => void;
};

function AddAddressRow({ onClick }: AddAddressRowProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex cursor-pointer w-full items-center justify-between rounded-2xl border border-dashed border-[var(--Neutral-200)] bg-white px-4 py-3 text-left text-[var(--secondary-500-main)]"
        >
            <div>
                <p className="font-semibold">Add New Address</p>
                <p className="text-sm text-[var(--Neutral-500)]">Save another address to reuse later.</p>
            </div>
            <span className="text-2xl">+</span>
        </button>
    );
}


