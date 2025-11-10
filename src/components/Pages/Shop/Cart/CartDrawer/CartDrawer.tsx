'use client';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useAtom, useAtomValue } from 'jotai';
import { cartDrawerOpenAtom } from '@/atoms/cartDrawerAtom';
import { cartAtom } from '@/atoms/cartAtom';
import { useCartTotals } from '@/hooks/useCartTotals';
import CartItem from '../CartItem/CartItem';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/navigation';
import { TiShoppingCart } from "react-icons/ti";

export default function CartDrawer() {
    const [open, setOpen] = useAtom(cartDrawerOpenAtom);
    const cart = useAtomValue(cartAtom);
    const router = useRouter();
    // Warm the cache and keep totals synced with cart changes
    const { data: totals, isLoading } = useCartTotals();

    const handleClose = () => setOpen(false);
    const navigateToCatalogue = () => {
        router.push('/shop/catalogue')
        handleClose();
    }
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            keepMounted
            PaperProps={{
                sx: {
                    width: '33.3333%',
                    '@media (max-width: 1024px)': {
                        width: '70%',
                    },
                    '@media (max-width: 768px)': {
                        width: '90%',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start'
                },
            }}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--Neutral-100)]">
                <Typography variant="h6" component="h2">
                    Cart
                </Typography>
                <IconButton aria-label="Close cart" onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </div>

            <div className=" overflow-y-auto px-4 py-4">
                {cart.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center gap-4">
                        <TiShoppingCart className='text-[6rem] text-[var(--secondary-500-main)]' />

                        <Typography variant="body1">
                            No Products yet!
                        </Typography>
                        <Button
                            variant="primary"
                            onClick={navigateToCatalogue}
                        >
                            Go to Catalogue
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cart.map((item) => (
                            <CartItem key={item.variant._id} item={item} isLoading={!!isLoading} />
                        ))}
                    </div>
                )}
            </div>

            {/* Totals Area */}
            {cart.length > 0 ? (
                <div className="px-4 py-4 border-t border-[var(--Neutral-100)]">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Subtotal</span>
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                <span className="text-sm font-semibold">${(totals?.subTotal ?? 0).toFixed(2)}</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Discount</span>
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                <span className="text-sm font-semibold">-${(totals?.subTotalDiscount ?? 0).toFixed(2)}</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--Colors-Neutral-700)]">Taxes</span>
                            {isLoading ? (
                                <span className="inline-block h-[1rem] w-[6rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                <span className="text-sm font-semibold">Calculated at checkout</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--Neutral-100)]">
                            <span className="text-base font-medium">Grand Total</span>
                            {isLoading ? (
                                <span className="inline-block h-[1.25rem] w-[7rem] rounded-[var(--Radius-sm)] bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            ) : (
                                <span className="text-base font-bold">
                                    ${((totals?.subTotal ?? 0) - (totals?.subTotalDiscount ?? 0)).toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
            <div className='flex items-center gap-[1rem] px-4 py-4'>
                <Button variant="outline" fullWidth onClick={navigateToCatalogue}>
                    View Cart                </Button>
                <Button variant="primary" fullWidth>
                    Proceed to Checkout
                </Button>
            </div>
        </Drawer>
    );
}