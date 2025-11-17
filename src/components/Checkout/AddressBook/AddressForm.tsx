'use client';

import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { joiResolver } from '@hookform/resolvers/joi';
import { Country, State } from 'country-state-city';
import Button from '@/components/shared/Button';
import { addressFormSchema } from './addressForm.schema';

const defaultValues: AddressFormValues = {
    label: '',
    phoneNumber: '',
    country: 'US',
    state: '',
    city: '',
    streetAddress: '',
    streetAddress2: '',
    zipCode: '',
};

type AddressFormProps = {
    initialValues?: AddressFormValues;
    onSubmit: (values: AddressFormValues) => void;
    onCancel: () => void;
};

const COUNTRY_OPTIONS = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
];

export default function AddressForm({ initialValues, onSubmit, onCancel }: AddressFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<AddressFormValues>({
        resolver: joiResolver(addressFormSchema),
        defaultValues: initialValues ?? defaultValues,
        mode: 'onSubmit',
    });

    const countries = useMemo(() => COUNTRY_OPTIONS, []);
    const selectedCountry = watch('country', defaultValues.country);
    const selectedState = watch('state');
    const countryStates = useMemo(
        () => State.getStatesOfCountry(selectedCountry ?? defaultValues.country),
        [selectedCountry],
    );

    useEffect(() => {
        const nextValues = initialValues ? { ...initialValues } : { ...defaultValues };
        if (initialValues?.country) {
            const match = countries.find(
                (country) =>
                    country.value === initialValues.country ||
                    country.label.toLowerCase() === initialValues.country.toLowerCase()
            );
            if (match) {
                nextValues.country = match.value;
            }
        }
        const statesForInitialCountry = State.getStatesOfCountry(nextValues.country ?? defaultValues.country);
        if (initialValues?.state) {
            const stateMatch = statesForInitialCountry.find(
                (state) => state.isoCode === initialValues.state || state.name === initialValues.state
            );
            if (stateMatch) {
                nextValues.state = stateMatch.isoCode;
            }
        }
        reset(nextValues);
    }, [initialValues, reset, countries]);

    useEffect(() => {
        if (!selectedCountry) {
            setValue('state', '');
            return;
        }
        const nextStates = State.getStatesOfCountry(selectedCountry);
        if (selectedState && !nextStates.some((state) => state.isoCode === selectedState)) {
            setValue('state', '');
        }
    }, [selectedCountry, selectedState, setValue]);

    const submitAddress = handleSubmit(onSubmit);

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        submitAddress(event);
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
            <Controller
                name="label"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Address name" error={!!errors.label} helperText={errors.label?.message} />
                )}
            />
            <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                    <MuiTelInput
                        {...field}
                        defaultCountry="US"
                        forceCallingCode
                        label="Phone Number"
                        className="w-full"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <FormControl error={!!errors.country}>
                            <InputLabel>Country</InputLabel>
                            <Select label="Country" {...field}>
                                {countries.map((country) => (
                                    <MenuItem key={country.value} value={country.value}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.country?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                        <FormControl error={!!errors.state}>
                            <InputLabel>State</InputLabel>
                            <Select label="State" {...field}>
                                {countryStates.map((state) => (
                                    <MenuItem key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.state?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
            </div>
            <Controller
                name="city"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="City" error={!!errors.city} helperText={errors.city?.message} />
                )}
            />
            <Controller
                name="streetAddress"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Street address" error={!!errors.streetAddress} helperText={errors.streetAddress?.message} />
                )}
            />
            <Controller
                name="streetAddress2"
                control={control}
                render={({ field }) => <TextField {...field} label="Apartment, suite, etc. (optional)" />}
            />
            <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Zip / Postal code" error={!!errors.zipCode} helperText={errors.zipCode?.message} />
                )}
            />

            <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Save Address
                </Button>
            </div>
        </form>
    );
}


