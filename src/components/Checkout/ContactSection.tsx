'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import CUstomMUITheme from '@/app/theme';
import { toast } from 'react-toastify';
import { checkoutContactSchema, type CheckoutContactFormData } from './ContactSection.schema';
import Button from '@/components/shared/Button';
import AddressBookSection from './AddressBook/AddressBookSection';
import type React from 'react';
import { useSetAtom } from 'jotai';
import { checkoutContactEmailAtom, checkoutShippingLocationAtom } from '@/atoms/checkoutAtom';

type ContactSectionProps = {
    isCompleted: boolean;
    onComplete: () => void;
    setOpenById: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    onSubmitData: (data: CheckoutContactFormData) => void;
    requiresAddress: boolean;
};

export default function ContactSection({ isCompleted, onComplete, setOpenById, onSubmitData, requiresAddress }: ContactSectionProps) {
    const [addressSelection, setAddressSelection] = useState<AddressSelectionValue>({
        shipping: null,
        billing: null,
        billingSameAsShipping: true,
    });
    const setShippingLocation = useSetAtom(checkoutShippingLocationAtom);
    const setCheckoutEmail = useSetAtom(checkoutContactEmailAtom);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<CheckoutContactFormData>({
        resolver: joiResolver(checkoutContactSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            selectedAddresses: null,
        },
        mode: 'onSubmit',
    });

    // Persist email to atom on every change (override on set)
    const watchedEmail = watch('email');
    useEffect(() => {
        setCheckoutEmail(watchedEmail || null);
    }, [watchedEmail, setCheckoutEmail]);

    useEffect(() => {
        if (!requiresAddress) {
            setShippingLocation(null);
            return;
        }
        if (addressSelection.shipping) {
            const { country, state, zipCode } = addressSelection.shipping;
            setShippingLocation({ country, state, zipCode });
        } else {
            setShippingLocation(null);
        }
    }, [addressSelection.shipping, requiresAddress, setShippingLocation]);

    const onValid = async (data: CheckoutContactFormData) => {
        let selectedAddresses: CheckoutSelectedAddresses | null = null;
        if (requiresAddress) {
            if (!addressSelection.shipping) {
                toast.error('Please add and select a shipping address.');
                return;
            }
            if (!addressSelection.billing) {
                toast.error('Please select a billing address.');
                return;
            }
            selectedAddresses = {
                shipping: addressSelection.shipping,
                billing: addressSelection.billing,
                billingSameAsShipping: addressSelection.billingSameAsShipping,
            };
        }

        // Ensure latest email is saved (override)
        setCheckoutEmail(data.email || null);

        onSubmitData({
            ...data,
            selectedAddresses,
        });
        // Open the next accordion explicitly
        setOpenById((prev) => ({ ...prev, fulfillment: true }));
        onComplete();
    };

    const onInvalid = () => {
        // Find first error and toast it
        const firstError =
            errors.firstName?.message ||
            errors.lastName?.message ||
            errors.email?.message ||
            errors.phoneNumber?.message;
        if (firstError) {
            toast.error(firstError);
        }
    };

    return (
        <ThemeProvider theme={CUstomMUITheme}>
            <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex flex-col gap-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                disabled={isSubmitting}
                            />
                        )}
                    />
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            validate: (value) => matchIsValidTel(value || '') || 'Please enter a valid phone number',
                        }}
                        render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => (
                            <MuiTelInput
                                {...fieldProps}
                                value={value ?? ''}
                                inputRef={fieldRef}
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                defaultCountry="US"
                                error={!!errors.phoneNumber || fieldState.invalid}
                                helperText={errors.phoneNumber?.message || (fieldState.invalid ? 'Please enter a valid phone number' : '')}
                                disabled={isSubmitting}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        borderRadius: 'var(--Radius-md)',
                                        '& fieldset': { borderColor: 'var(--Neutral-100)' },
                                        '&:hover fieldset': { borderColor: 'var(--Neutral-100)' },
                                        '&.Mui-focused fieldset': { borderColor: 'var(--primary-500-main)' },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666',
                                        '&.Mui-focused': { color: 'var(--primary-500-main)' },
                                    },
                                }}
                            />
                        )}
                    />
                </div>

                {requiresAddress && (
                    <>
                        <div className="border-t border-[var(--Neutral-100)]" />
                        <AddressBookSection onSelectionChange={setAddressSelection} />
                    </>
                )}

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        size="small"
                        disabled={isSubmitting}
                    >
                        Proceed to Fulfillment Methods
                    </Button>
                </div>
            </form>
        </ThemeProvider>
    );
}


