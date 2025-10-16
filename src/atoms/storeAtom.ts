import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { StoreId } from '@/util/shedule';

const DEFAULT_STORE_ID = 'ow-homecentralstores';
export const selectedStoreAtom = atomWithStorage<StoreId>('selectedStore', DEFAULT_STORE_ID);

