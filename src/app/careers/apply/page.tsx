import { Suspense } from 'react';
import ApplyContent from './ApplyContent';

export default function Apply() {
    return (
        <Suspense>
            <ApplyContent />
        </Suspense>
    );
}
