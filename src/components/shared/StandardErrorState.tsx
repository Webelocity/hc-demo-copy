// Reusable error / empty state component aligned with product/careers pages
"use client";

import React from 'react';
import { FiAlertTriangle, FiRefreshCw, FiEdit3 } from 'react-icons/fi';
import Button from './Button';

type Tone = 'primary' | 'secondary';

type ErrorAction = {
    label: string;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: () => void;
};

interface StandardErrorStateProps {
    title?: string;
    description?: string;
    tone?: Tone;
    icon?: React.ReactNode;
    className?: string;
    actions?: ErrorAction[];
    hints?: string[];
    dense?: boolean;
}

const toneStyles: Record<Tone, { iconBg: string; iconColor: string; title: string; accent: string; badge?: string }> = {
    primary: {
        iconBg: 'var(--Colors-Primary-50)',
        iconColor: 'var(--Colors-Primary-500)',
        title: 'var(--Colors-Primary-600)',
        accent: 'var(--Colors-Primary-500)',
    },
    secondary: {
        iconBg: 'var(--Secondary-100)',
        iconColor: 'var(--secondary-500-main)',
        title: 'var(--secondary-600-main)',
        accent: 'var(--secondary-500-main)',
    },
};

export default function StandardErrorState({
    title = "Oops! Something went wrong",
    description = "We couldn't complete this action right now. Please try again shortly.",
    tone = 'primary',
    icon,
    className = '',
    actions = [],
    hints,
    dense = false,
}: StandardErrorStateProps) {
    const colors = toneStyles[tone];
    const hasActions = actions.length > 0;
    const hasHints = hints && hints.length > 0;

    return (
        <div className={`w-full ${dense ? '' : 'baseContainer'}`}>
            <div className={`w-full ${dense ? '' : 'maxWidth'} ${dense ? 'py-[1.5rem]' : 'py-[4rem]'} flex flex-col items-center text-center gap-[1.5rem] ${className}`}>
                <div className="flex flex-col items-center gap-[1rem]">
                    <div
                        className="w-[4.5rem] h-[4.5rem] flex items-center justify-center rounded-full"
                        style={{ background: colors.iconBg, color: colors.iconColor }}
                    >
                        {icon ?? <FiAlertTriangle size={36} />}
                    </div>
                    <div className="flex flex-col gap-[0.5rem] max-w-2xl">
                        <h1 className="text-[2rem] font-bold" style={{ color: colors.title }}>
                            {title}
                        </h1>
                        {description && (
                            <p className="text-[1rem] text-[var(--Neutral-600)]">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {hasActions && (
                    <div className="flex flex-col md:flex-row gap-[1rem] w-full md:w-auto justify-center">
                        {actions.map((action) => (
                            <Button
                                key={action.label}
                                href={action.href}
                                variant={action.variant ?? 'primary'}
                                size="large"
                                onClick={action.onClick}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                )}

                {hasHints && (
                    <div className="mt-[1rem] w-full max-w-2xl">
                        <div className="p-[1.25rem] rounded-[1rem] border border-[var(--Colors-Neutral-100)] bg-[var(--Colors-Neutral-10)] text-left flex flex-col gap-[1rem]">
                            <p className="text-[0.95rem] font-semibold text-[var(--Neutral-700)]">Helpful hints</p>
                            <ul className="flex flex-col gap-[0.75rem] text-[0.9rem] text-[var(--Neutral-600)]">
                                {hints.map((hint, idx) => {
                                    const Icon = idx % 2 === 0 ? FiEdit3 : FiRefreshCw;
                                    return (
                                        <li key={idx} className="flex items-start gap-[0.5rem]">
                                            <Icon className="mt-[0.2rem]" style={{ color: colors.accent }} />
                                            <span>{hint}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

