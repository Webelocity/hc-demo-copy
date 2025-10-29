'use client';

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode, useMemo } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { queryClientAtom } from 'jotai-tanstack-query';
import { QueryClientProvider } from '@tanstack/react-query';

function HydrateJotaiQueryClient({ children, client }: { children: React.ReactNode; client: QueryClient }) {
    useHydrateAtoms(new Map([[queryClientAtom, client]]));
    return children as React.ReactElement;
}

export default function JotaiProvider({ children }: { children: ReactNode }) {
    const queryClient = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 60,
                staleTime: 1000 * 60 * 5,
                retry: 1,
            },
        },
    }), []);

    return (
        <QueryClientProvider client={queryClient}>
            <Provider>
                <HydrateJotaiQueryClient client={queryClient}>{children}</HydrateJotaiQueryClient>
            </Provider>
        </QueryClientProvider>
    );
}

