'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

type VariantAttributesProps = {
    product: Product;
    currentVariantId: string;
    onVariantChange?: (variant: ProductVariant | null) => void;
    enableUrlSync?: boolean;
};

export default function VariantAttributes({
    product,
    currentVariantId,
    onVariantChange,
    enableUrlSync = true,
}: VariantAttributesProps) {
    const router = useRouter();
    const params = useSearchParams();

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const variantIdFromUrl = params.get('variant_Id');

    // Helper to check if an attribute value is available
    const getAttributeAvailability = useMemo(() => {
        return (attrKey: string, attrValue: string) => {
            // Create a hypothetical selection with this attribute value
            const hypotheticalSelection = { ...selectedAttributes, [attrKey]: attrValue };

            // Find variants that match this hypothetical selection
            const matchingVariants = product.productVariants.filter(variant => {
                return Object.entries(hypotheticalSelection).every(([key, value]) => {
                    return variant.attribute?.[key] === value;
                });
            });

            if (matchingVariants.length === 0) {
                return { available: false, inStock: false, reason: 'not-exist' };
            }

            // Check if any matching variant has stock
            const hasStock = matchingVariants.some(v =>
                !v.trackQuantity || (v.trackQuantity && v.inventoryCount > 0)
            );

            return {
                available: true,
                inStock: hasStock,
                reason: hasStock ? 'available' : 'out-of-stock'
            };
        };
    }, [product.productVariants, selectedAttributes]);

    // Initialize attributes from URL variant_Id or use default
    useEffect(() => {
        if (!product) return;

        const variantId = enableUrlSync && variantIdFromUrl ? variantIdFromUrl : currentVariantId;
        const variant = product.productVariants.find(pv => pv._id === variantId)
            ?? product.productVariants[0];

        const init: Record<string, string> = {};

        if (variant?.attribute) {
            // Use the variant's attributes
            Object.entries(variant.attribute).forEach(([k, val]) => {
                init[k] = String(val);
            });
            setSelectedVariant(variant);
            onVariantChange?.(variant);
        } else if (product.attributes) {
            // Fallback to first value of each attribute
            Object.entries(product.attributes).forEach(([k, vals]) => {
                if (Array.isArray(vals) && vals.length) init[k] = vals[0];
            });
        }

        setSelectedAttributes(init);
    }, [product, currentVariantId, enableUrlSync, variantIdFromUrl, onVariantChange]);

    // When user changes attributes, find matching variant and update URL
    useEffect(() => {
        if (!product || Object.keys(selectedAttributes).length === 0) return;

        const match = product.productVariants.find(v =>
            Object.keys(selectedAttributes).every(a => v.attribute?.[a] === selectedAttributes[a])
        );

        if (match) {
            setSelectedVariant(match);
            onVariantChange?.(match);

            if (enableUrlSync) {
                const currentVariantInUrl = params.get('variant_Id');

                // Only update URL if the variant actually changed (prevents infinite loop)
                if (currentVariantInUrl !== match._id) {
                    const usp = new URLSearchParams(params.toString());
                    usp.set('variant_Id', match._id);
                    router.replace(`/product/${product._id}?${usp.toString()}`, { scroll: false });
                }
            }
        } else {
            setSelectedVariant(null);
            onVariantChange?.(null);
        }
    }, [selectedAttributes, product, params, router, enableUrlSync, onVariantChange]);

    const changeAttr = (attr: string, val: string) =>
        setSelectedAttributes(prev => ({ ...prev, [attr]: val }));

    return (
        <>
            {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div className="space-y-6">
                    {Object.entries(product.attributes).map(([attr, values]) => (
                        <div key={attr} className="attribute-block">
                            <p className="text-sm font-semibold text-gray-700 mb-3">
                                {attr} :
                                {selectedAttributes[attr] && (
                                    <span className="ml-2 text-gray-500 font-normal">
                                        ({selectedAttributes[attr]})
                                    </span>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {values.map((v) => {
                                    const availability = getAttributeAvailability(attr, v);
                                    const isSelected = selectedAttributes[attr] === v;
                                    const isDisabled = !availability.available;
                                    const isOutOfStock = availability.available && !availability.inStock && selectedVariant?.trackQuantity;

                                    return (
                                        <button
                                            key={v}
                                            type="button"
                                            disabled={isDisabled || isOutOfStock}
                                            onClick={() => changeAttr(attr, v)}
                                            className={`
                                                relative px-[0.75rem] py-[0.25rem] min-w-[60px] border-[1px] rounded-[0.5rem] font-medium text-sm
                                                transition-all duration-200
                                                ${isSelected
                                                    ? 'border-[var(--primary-500-main)] text-[var(--primary-500-main)] bg-white'
                                                    : 'border-[var(--Neutral-300)] text-[var(--Colors-Neutral-700)] bg-white'
                                                }
                                                ${isDisabled
                                                    ? '!bg-[var(--Colors-Neutral-100)] text-[var(--Neutral-300)] border-[var(--Neutral-300)] cursor-not-allowed line-through'
                                                    : isOutOfStock
                                                        ? 'opacity-50 cursor-not-allowed border-red-300 text-red-600 bg-[var(--primary-500-main)]'
                                                        : 'cursor-pointer hover:border-[var(--primary-500-main)] hover:text-[var(--primary-500-main)] hover:bg-[var(--Colors-Neutral-100)]'
                                                }
                                            `}
                                            title={
                                                isDisabled
                                                    ? `${v} is not available`
                                                    : isOutOfStock
                                                        ? `${v} is out of stock`
                                                        : `Select ${v}`
                                            }
                                        >
                                            {v}
                                            {isOutOfStock && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                                                    Out
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
