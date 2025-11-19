import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { toast } from 'react-toastify';

// Define the shape of a wishlist item. 
// For now, we'll store the entire product object to avoid refetching.
// In a real app, you might just store IDs and fetch details, but this is simpler for now.
export type WishlistItem = Product; 

const WISHLIST_STORAGE_KEY = 'hc_wishlist';

export const wishlistAtom = atomWithStorage<WishlistItem[]>(WISHLIST_STORAGE_KEY, []);

export const toggleWishlistAtom = atom(
    null,
    (get, set, product: WishlistItem) => {
        const currentWishlist = get(wishlistAtom);
        const ispwishlisted = currentWishlist.some((item) => item._id === product._id);

        if (ispwishlisted) {
            const newWishlist = currentWishlist.filter((item) => item._id !== product._id);
            set(wishlistAtom, newWishlist);
            toast.info(`${product.name} removed from wishlist`);
        } else {
            const newWishlist = [...currentWishlist, product];
            set(wishlistAtom, newWishlist);
            toast.success(`${product.name} added to wishlist`);
        }
    }
);
