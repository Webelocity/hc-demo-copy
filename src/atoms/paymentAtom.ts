'use client';

import { atom } from 'jotai';

export const versapayTokenAtom = atom<string | null>(null);
export const versapayValidAtom = atom<boolean>(false);
export type VersapayCardSummary = {
    brand?: string;
    last4?: string;
    exp?: string;
};
export const versapayCardSummaryAtom = atom<VersapayCardSummary | null>(null);


