'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({ variant = 'primary', children, sx, ...props }: ButtonProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: 'var(--primary-500-main)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'color-mix(in srgb, var(--primary-500-main) 85%, black)',
                    },
                };
            case 'secondary':
                return {
                    backgroundColor: 'var(--Secondary-100)',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'color-mix(in srgb, var(--Secondary-100) 85%, black)',
                    },
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: 'black',
                    border: '1.5px solid var(--Colors-Neutral-500)',
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
                borderRadius: 'var(--Radius-md)',
                fontWeight: 500,
                lineHeight: 1,
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',

                ...getVariantStyles(),
                ...sx, // Allow overriding with custom sx prop
            }}
        >
            {children}
        </MuiButton>
    );
}

