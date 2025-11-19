import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { CheckoutShippingLocation } from '@/types/checkout';

export const checkoutShippingLocationAtom = atom<CheckoutShippingLocation | null>(null);

// Persisted contact email used to fetch guest order details
export const checkoutContactEmailAtom = atomWithStorage<string | null>('hc_checkout_email', null);

