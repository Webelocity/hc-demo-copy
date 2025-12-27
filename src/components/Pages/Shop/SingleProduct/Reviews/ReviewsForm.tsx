'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    Slide,
    TextField,
    ThemeProvider,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@/components/shared/Button';
import { CUstomMUITheme } from '@/app/theme';
import { reviewFormSchema, type ReviewFormData } from './ReviewsForm.schema';
import { submitAnonymousReview } from '@/Api/Apis';

type ReviewsFormProps = {
    product: Product;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewsForm({ product }: ReviewsFormProps) {
    const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormData>({
        resolver: joiResolver(reviewFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            rating: 0,
            reviewTitle: '',
            reviewMessage: '',
        },
    });

    const onSubmit = async (data: ReviewFormData) => {
        setSubmitError(null);
        const productId = product?._id || product?.id;
        if (!productId) {
            setSubmitError('Missing product id.');
            return;
        }

        const payload = {
            productId,
            reviewType: 'product',
            reviewTitle: data.reviewTitle,
            review: data.reviewMessage,
            rating: data.rating,
            guestName: `${data.firstName} ${data.lastName}`.trim(),
            guestEmail: data.email,
        };

        try {
            await submitAnonymousReview(payload);
            setIsSuccessOpen(true);
            reset();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to submit review';
            setSubmitError(message);
        }
    };

    return (
        <ThemeProvider theme={CUstomMUITheme}>
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 space-y-2">
                    <p className="text-[1.25rem] font-semibold text-[var(--Colors-Neutral-800)]">
                        Tell us about your experience
                    </p>
                    <p className="text-sm text-[var(--Neutral-700)]">
                        Share a few details so others can make informed decisions.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-[1.75rem]">
                    {submitError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {submitError}
                        </div>
                    )}
                    <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-[var(--Colors-Neutral-800)]">Rating</p>
                                <Rating
                                    name="rating"
                                    value={Number(field.value) || 0}
                                    precision={0.5}
                                    size="large"
                                    onChange={(_, value) => field.onChange(value ?? 0)}
                                    onBlur={field.onBlur}
                                />
                                {errors.rating?.message && (
                                    <span className="text-xs text-red-600">{errors.rating.message}</span>
                                )}
                            </div>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-[1.75rem] sm:grid-cols-2">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col gap-2">
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col gap-2">
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    />

                    <Controller
                        name="reviewTitle"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <TextField
                                    {...field}
                                    label="Review Title"
                                    error={!!errors.reviewTitle}
                                    helperText={errors.reviewTitle?.message}
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    />

                    <Controller
                        name="reviewMessage"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <TextField
                                    {...field}
                                    label="Review Message"
                                    multiline
                                    minRows={4}
                                    error={!!errors.reviewMessage}
                                    helperText={errors.reviewMessage?.message}
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                    />

                    <div className="flex justify-start">
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            disabled={isSubmitting}
                            sx={{
                                boxShadow: '0 10px 30px rgba(132, 22, 24, 0.15)',
                                transition: 'transform 150ms ease, box-shadow 150ms ease',
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 12px 34px rgba(132, 22, 24, 0.2)',
                                },
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>

            <Dialog
                open={isSuccessOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsSuccessOpen(false)}
                aria-describedby="review-submitted-description"
                PaperProps={{
                    sx: {
                        borderRadius: '1.25rem',
                        padding: '1rem',
                    },
                }}
            >
                <DialogTitle className="flex items-center gap-3 text-[1.15rem] font-semibold text-[var(--Colors-Neutral-800)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--Secondary-50)] text-[var(--secondary-500-main)]">
                        <CheckCircleOutlineIcon />
                    </span>
                    Review Submitted
                </DialogTitle>
                <DialogContent className="space-y-2">
                    <p className="text-[var(--Colors-Neutral-700)]">
                        Your review was submitted successfully. Please ensure your email is verified for approval.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSuccessOpen(false)} variant="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}