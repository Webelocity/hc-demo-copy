import { atomWithStorage } from 'jotai/utils';
import { DEFAULT_STORE_ID, StoreId } from '@/util/shedule';

export const selectedStoreAtom = atomWithStorage<StoreId>('selectedStore', DEFAULT_STORE_ID);

