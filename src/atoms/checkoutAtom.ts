import { atom } from 'jotai';
import type { CheckoutShippingLocation } from '@/types/checkout';

export const checkoutShippingLocationAtom = atom<CheckoutShippingLocation | null>(null);


