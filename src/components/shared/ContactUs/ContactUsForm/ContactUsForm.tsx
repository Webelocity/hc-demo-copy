'use client';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { TextField, ThemeProvider } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { contactFormSchema, ContactFormData } from './ContactUsForm.schema';
import { toast } from 'react-toastify';
import Button from '../../Button';
import CUstomMUITheme from '@/app/theme';



export default function ContactUsForm() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: joiResolver(contactFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            // TODO: Replace with your actual API call
            console.log('Form submitted:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success('Thank you for contacting us! We will get back to you soon.');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <ThemeProvider theme={CUstomMUITheme}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-full"
            >
                {/* First Row - First Name and Last Name */}
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

                {/* Second Row - Email and Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                type="email"
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
                            validate: (value) => matchIsValidTel(value || '') || 'Please enter a valid phone number'
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
                                        '& fieldset': {
                                            borderColor: 'var(--Neutral-100)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--Neutral-100)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--primary-500-main)',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666',
                                        '&.Mui-focused': {
                                            color: 'var(--primary-500-main)',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </div>

                {/* Third Row - Message Textarea */}
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="How can we help you?"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            disabled={isSubmitting}
                        />
                    )}
                />

                <div className="flex justify-start">
                    <Button
                        type="submit"
                        variant="primary"
                        size='large'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </ThemeProvider>
    );
}
