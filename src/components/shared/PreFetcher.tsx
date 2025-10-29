"use client";

import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { categoriesQueryAtom } from '@/atoms/categoryAtom';


export default function PreFetcher() {
    // Trigger categories fetch on mount without suspending the tree
    useAtomValue(categoriesQueryAtom);



    return null;
}