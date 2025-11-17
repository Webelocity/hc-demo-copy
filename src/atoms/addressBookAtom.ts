import { atomWithStorage } from 'jotai/utils';
import type { SavedAddress } from '@/types/address';

const ADDRESS_BOOK_STORAGE_KEY = 'hc_checkout_addresses';

export const addressBookAtom = atomWithStorage<SavedAddress[]>(ADDRESS_BOOK_STORAGE_KEY, []);


