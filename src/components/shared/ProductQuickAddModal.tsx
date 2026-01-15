'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { FiMinusCircle, FiPlusCircle, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Button from './Button';
import VariantAttributes from '@/components/Pages/Shop/SingleProduct/VariantSelector';
import { addToCartAtom } from '@/atoms/cartAtom';
import { selectedStoreAtom } from '@/atoms/storeAtom';
import {
    computeFulfillmentAvailability,
    formatFulfillmentMethodLabel,
    resolveFulfillmentMethod,
} from '@/util/fulfillmentInventory';
import { LuShoppingCart } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import FallBackImage from './FallBackImage';
import { createPortal } from 'react-dom';

const DO_IT_BEST_ADDRESS_ID = process.env.NEXT_PUBLIC_DO_IT_BEST_ID ?? '';

type ProductQuickAddModalProps = {
    product: Product;
    open: boolean;
    onClose: () => void;
};

export default function ProductQuickAddModal({ product, open, onClose }: ProductQuickAddModalProps) {
    const router = useRouter();
    const addToCart = useSetAtom(addToCartAtom);
    const selectedStoreId = useAtomValue(selectedStoreAtom);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const defaultVariant = useMemo(
        () => product.productVariants?.[0],
        [product]
    );
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(defaultVariant ?? null);
    const [quantity, setQuantity] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState<FulfillmentMethodEnum | null>(
        resolveFulfillmentMethod(defaultVariant, null)
    );

    useEffect(() => {
        if (!open) return;
        setSelectedVariant(defaultVariant ?? null);
        setQuantity(1);
        setSelectedMethod(resolveFulfillmentMethod(defaultVariant, null));
    }, [open, defaultVariant]);

    useEffect(() => {
        if (!selectedVariant) return;
        setSelectedMethod((prev) => resolveFulfillmentMethod(selectedVariant, prev));
        setQuantity(1);
    }, [selectedVariant?._id]);

    const availability = useMemo(() => {
        if (!selectedVariant) return null;
        console.log(selectedVariant);
        console.log(selectedStoreId);
        console.log(DO_IT_BEST_ADDRESS_ID);
        console.log(computeFulfillmentAvailability(selectedVariant, selectedStoreId, {
            doItBestId: DO_IT_BEST_ADDRESS_ID,
        }));

        return computeFulfillmentAvailability(selectedVariant, selectedStoreId, {
            doItBestId: DO_IT_BEST_ADDRESS_ID,
        });
    }, [selectedVariant, selectedStoreId]);

    const supportedMethods = selectedVariant?.supportedFulfillmentMethods ?? [];
    const activeMethod = useMemo(() => {
        if (!selectedVariant) return null;
        if (selectedMethod && supportedMethods.includes(selectedMethod)) {
            return selectedMethod;
        }
        return resolveFulfillmentMethod(selectedVariant, supportedMethods[0] ?? null);
    }, [selectedMethod, selectedVariant, supportedMethods]);

    const activeMethodInfo =
        activeMethod && availability ? availability[activeMethod] : undefined;

    const methodLimit = useMemo(() => {
        if (!selectedVariant?.trackQuantity) {
            return Number.POSITIVE_INFINITY;
        }
        if (!activeMethodInfo?.available) {
            return 0;
        }
        return activeMethodInfo.ceiling;
    }, [selectedVariant, activeMethodInfo]);

    useEffect(() => {
        if (!Number.isFinite(methodLimit)) return;
        if (quantity > methodLimit) {
            setQuantity(Math.max(1, Math.floor(methodLimit)));
        }
    }, [methodLimit, quantity]);

    const handleAddToCart = () => {
        if (!selectedVariant) {
            toast.error('Please choose a variant.');
            return;
        }
        if (!activeMethod) {
            toast.error('Select a fulfillment method to continue.');
            return;
        }
        addToCart({
            productId: product._id,
            variant: selectedVariant,
            quantity,
            fulfillmentMethod: activeMethod,
        });
        onClose();
    };

    const handleViewMore = useCallback(() => {
        const variantId = selectedVariant?._id ?? defaultVariant?._id ?? product.productVariants?.[0]?._id ?? '';
        router.push(`/product/${product._id}?variant_Id=${variantId}`);
        onClose();
    }, [product, selectedVariant, defaultVariant, router, onClose]);

    const renderFulfillmentCard = (method: FulfillmentMethodEnum) => {
        if (!selectedVariant) return null;
        const info = availability ? availability[method] : undefined;
        const isDisabled = selectedVariant.trackQuantity && !info?.available;
        const limitLabel = !selectedVariant.trackQuantity
            ? 'In stock'
            : isDisabled
                ? 'Unavailable'
                : `${info?.ceiling ?? 0} available`;
        const isSelected = activeMethod === method;

        return (
            <button
                key={method}
                type="button"
                disabled={isDisabled}
                onClick={() => setSelectedMethod(method)}
                className={`flex flex-1 flex-col gap-1 rounded-[var(--Radius-xs)] border p-3 text-left transition cursor-pointer
                    ${isSelected ? 'border-[var(--secondary-500-main)] shadow-sm' : 'border-[var(--Colors-Neutral-100)]'}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--secondary-500-main)]'}
                `}
            >
                <span className="text-sm font-semibold capitalize text-[var(--Colors-Neutral-800)]">{method}</span>
                <span className="text-xs text-[var(--Colors-Neutral-700)]">{limitLabel}</span>
            </button>
        );
    };

    const fulfillmentInventoryLabel = (() => {
        if (!activeMethod) {
            return 'Select a fulfillment method';
        }
        if (!selectedVariant?.trackQuantity) {
            return 'Unlimited availability';
        }
        if (!activeMethodInfo?.available) {
            return `${formatFulfillmentMethodLabel(activeMethod)} is unavailable for the selected store.`;
        }
        return `${activeMethodInfo.ceiling} available for ${formatFulfillmentMethodLabel(activeMethod)}.`;
    })();

    const canAddToCart =
        Boolean(selectedVariant && activeMethod) &&
        (!selectedVariant?.trackQuantity ||
            (activeMethodInfo?.available && quantity > 0 && quantity <= methodLimit));

    if (!mounted) {
        return null;
    }
    const thumbnail = selectedVariant?.thumbnail?.file ?? selectedVariant?.productMedia[0]?.file ?? product.thumbnail?.file ?? product.productMedia[0]?.file;

    const modal = (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 py-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-4xl rounded-[1rem] bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute right-4 top-4 rounded-full border border-transparent p-2 text-[var(--Colors-Neutral-500)] transition hover:border-[var(--Colors-Neutral-200)] hover:text-black cursor-pointer"
                            onClick={onClose}
                            aria-label="Close quick add"
                        >
                            <FiX className="text-xl" />
                        </button>

                        <div className="flex flex-col gap-6 lg:flex-row">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-[var(--Colors-Neutral-100)] bg-[var(--Colors-Neutral-50)]">
                                        {thumbnail ? (
                                            <Image
                                                src={thumbnail}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <FallBackImage />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-sm text-[var(--Colors-Neutral-500)]">
                                            {selectedVariant?.name}
                                        </p>
                                        {selectedVariant?.trackQuantity && (
                                            <p className="text-xs font-medium text-[var(--Colors-Neutral-700)]">
                                                {selectedVariant.inventoryCount > 0 ? `${selectedVariant.inventoryCount} in stock` : 'Out of stock'}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <VariantAttributes
                                    product={product}
                                    currentVariantId={selectedVariant?._id ?? defaultVariant?._id ?? ''}
                                    onVariantChange={setSelectedVariant}
                                    enableUrlSync={false}
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-[var(--Colors-Neutral-800)]">Fulfillment options</p>
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        {supportedMethods.length
                                            ? supportedMethods.map(renderFulfillmentCard)
                                            : (
                                                <p className="text-sm text-[var(--Colors-Neutral-500)]">
                                                    No fulfillment methods available
                                                </p>
                                            )}
                                    </div>
                                    <p className="text-xs text-[var(--Colors-Neutral-700)]">
                                        {fulfillmentInventoryLabel}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-[var(--Colors-Neutral-800)]">Quantity</p>
                                    <div className="flex items-center gap-2 rounded-[1rem] border border-[var(--Colors-Neutral-100)] p-2">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            disabled={quantity <= 1}
                                            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--Colors-Neutral-50)] disabled:opacity-50 cursor-pointer"
                                            aria-label="Decrease quantity"
                                        >
                                            <FiMinusCircle className="text-xl" />
                                        </button>
                                        <span className="w-10 text-center text-base font-semibold">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (Number.isFinite(methodLimit) && quantity >= methodLimit) return;
                                                setQuantity((q) => q + 1);
                                            }}
                                            disabled={Number.isFinite(methodLimit) && quantity >= (methodLimit as number)}
                                            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--Colors-Neutral-50)] disabled:opacity-50 cursor-pointer"
                                            aria-label="Increase quantity"
                                        >
                                            <FiPlusCircle className="text-xl" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                    <Button
                                        variant="primary"
                                        className="flex-1"
                                        disabled={!canAddToCart}
                                        onClick={handleAddToCart}
                                    >
                                        <LuShoppingCart className="text-lg" />
                                        Add to cart
                                    </Button>
                                    <Button variant="outline" className="flex-1" onClick={handleViewMore}>
                                        View more
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modal, document.body);
}

