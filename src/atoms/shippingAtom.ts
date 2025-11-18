'use client';

import { atom } from 'jotai';
import type { ShippingOption } from '@/Api/Apis';

export const selectedShippingOptionAtom = atom<ShippingOption | null>(null);


