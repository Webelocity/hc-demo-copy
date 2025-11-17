import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Store applied discounts with only the minimal fields needed across the app
export const appliedDiscountsAtom = atomWithStorage<AppliedDiscount[]>('hc_applied_discounts', []);

// Backward-compatible: derive IDs from the stored discounts
export const appliedDiscountIdsAtom = atom((get) => get(appliedDiscountsAtom).map((d) => d._id));



