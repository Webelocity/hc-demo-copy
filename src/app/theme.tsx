'use client';
import "@mui/x-date-pickers/themeAugmentation";
import React from "react";
import { createTheme } from "@mui/material";

// No custom icons. Style base MUI classes and slots instead.

export const CUstomMUITheme = createTheme({
    palette: {
        primary: {
            main: '#841618',
        },
    },
    components: {
        // Date picker input wrappers (outer input styles)
        MuiPickersOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderRadius: 'var(--Radius-md)',
                    '&:hover .MuiPickersOutlinedInput-notchedOutline': {
                        borderColor: 'var(--Neutral-100)'
                    },
                    '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary-500-main)'
                    }
                },
                notchedOutline: {
                    borderColor: 'var(--Neutral-100)'
                },
            },
        },
        MuiPickersInputBase: {
            styleOverrides: {
                root: {
                    fontFamily: 'inherit',
                    borderRadius: 'var(--Radius-md)'
                },
                input: {
                    fontSize: '0.95rem',
                },
            },
        },
        MuiPickersTextField: {
            defaultProps: {
                fullWidth: true,
            },
        },
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderRadius: 'var(--Radius-md)',
                    fontFamily: 'inherit',
                },
            },
        },
        // Calendar header (month/year and arrows)
        MuiPickersCalendarHeader: {
            styleOverrides: {
                root: {
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                },
                label: {
                    fontWeight: 600,
                    color: 'var(--Neutral-700)',
                },
                switchViewButton: {
                    color: 'var(--Neutral-500)',
                    '&:hover': { color: 'var(--primary-500-main)' },
                },
                switchViewIcon: {
                    color: 'inherit',
                },
            },
        },
        // Individual day cells
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    fontFamily: 'inherit',
                    borderRadius: '0.5rem',
                    color: 'var(--Neutral-700)',
                    '&:hover': {
                        backgroundColor: 'var(--Neutral-50)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'var(--primary-500-main)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'var(--primary-500-main)',
                            filter: 'brightness(0.95)',
                        },
                    },
                    '&.MuiPickersDay-today': {
                        border: '1px solid var(--primary-500-main)',
                    },
                },
            },
        },
        // Text inputs and textareas (Outlined)
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderRadius: 'var(--Radius-md)',
                    '& .MuiOutlinedInput-input': {
                        // Ensure consistent font sizing inside inputs
                        fontSize: '0.95rem',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--Neutral-100)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary-500-main)',
                    },
                },
                notchedOutline: {
                    borderColor: 'var(--Neutral-100)',
                },
            },
        },
        // TextField wrapper to ensure label styling
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            },
        },
        // Selects share the same OutlinedInput, but tweak icon color if needed
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    backgroundColor: 'white',
                    borderRadius: 'var(--Radius-md)',
                },
                icon: {
                    color: 'var(--Neutral-500)',
                },
            },
        },
        // Labels (for TextField/Select)
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'var(--Neutral-500)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&.Mui-focused': {
                        color: 'var(--primary-500-main)',
                    },
                },
                asterisk: {
                    color: '#d32f2f', // red for required asterisk
                    fontSize: '1rem',
                },
            },
        },
        // Group labels (e.g., for RadioGroup)
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'var(--Neutral-500)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&.Mui-focused': {
                        color: 'var(--primary-500-main)',
                    },
                },
                asterisk: {
                    color: '#d32f2f',
                    fontSize: '1rem',
                },
            },
        },
        // Label text next to checkbox/radio
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    color: 'var(--Neutral-500)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                },
            },
        },
        // Checkbox with custom square icon and radius 0.25rem
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '0.375rem',
                    color: 'var(--Neutral-100)', // unchecked border color
                    '&.Mui-checked': { color: 'var(--primary-500-main)' },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.125rem',
                        borderRadius: '0.25rem', // try to visually match radius
                    },
                },
            },
        },
        // Radio with custom circle icon
        MuiRadio: {
            styleOverrides: {
                root: {
                    padding: '0.375rem',
                    color: 'var(--Neutral-100)', // unchecked ring color
                    '&.Mui-checked': { color: 'var(--primary-500-main)' },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.125rem',
                    },
                },
            },
        },
        // Helper text under fields (optional consistency)
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginLeft: 0,
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderRadius: 'var(--Radius-md) !important',
                    border: '1px solid var(--Neutral-100)',
                    boxShadow: 'none',
                    marginBottom: '0 !important',
                    '&:before': {
                        display: 'none',
                    },
                },
                heading: {
                    fontSize: '1rem',
                    fontWeight: 600,
                },

            },
        },
    },
});

export default CUstomMUITheme;