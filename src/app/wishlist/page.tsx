import { Suspense } from 'react';
import Wishlist from '@/components/Pages/Wishlist/Wishlist';

export default function WishlistPage() {
    return (
        <div className="baseContainer py-8">
            <Suspense>
                <Wishlist />
            </Suspense>
        </div>
    );
}
