'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
}

export default function Button({ variant = 'primary', size = 'medium', children, sx, ...props }: ButtonProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: 'var(--primary-500-main)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'color-mix(in srgb, var(--primary-500-main) 85%, black)',
                    },
                    '&:disabled': {
                        backgroundColor: 'var(--Neutral-100)',
                        color: 'var(--Neutral-500)',
                        cursor: 'not-allowed',
                    },
                };
            case 'secondary':
                return {
                    backgroundColor: 'var(--Secondary-100)',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'color-mix(in srgb, var(--Secondary-100) 85%, black)',
                    },
                    '&:disabled': {
                        backgroundColor: 'var(--Neutral-100)',
                        color: 'var(--Neutral-500)',
                        cursor: 'not-allowed',
                    },

                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: 'black',
                    border: '1.5px solid var(--Colors-Neutral-500)',
                    '&:disabled': {
                        backgroundColor: 'var(--Neutral-100)',
                        color: 'var(--Neutral-500)',
                        cursor: 'not-allowed',
                    },
                };
            default:
                return {};
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                };
            case 'medium':
                return {
                    padding: '1rem',
                    fontSize: '1rem',
                };
            case 'large':
                return {
                    padding: '1.25rem 1.5rem',
                    fontSize: '1.125rem',
                };
            default:
                return {};
        }
    };

    return (
        <MuiButton
            {...props}

            sx={{
                textTransform: 'none',
                borderRadius: '1.2rem',
                fontWeight: 500,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',

                ...getVariantStyles(),
                ...getSizeStyles(),
                ...sx, // Allow overriding with custom sx prop
            }}
        >
            {children}
        </MuiButton>
    );
}

