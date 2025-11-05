'use client';

import { Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function VariantAttributes({
    product,
    currentVariantId,
}: {
    product: Product;
    currentVariantId: string;
}) {
    const router = useRouter();
    const params = useSearchParams();

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

    // Initialize attributes from URL variant_Id or use default
    useEffect(() => {
        if (!product) return;

        const variantId = params.get('variant_Id') || currentVariantId;
        const variant = product.productVariants.find(pv => pv._id === variantId)
            ?? product.productVariants[0];

        const init: Record<string, string> = {};

        if (variant?.attribute) {
            // Use the variant's attributes
            Object.entries(variant.attribute).forEach(([k, val]) => {
                init[k] = String(val);
            });
            setSelectedVariant(variant);
        } else if (product.attributes) {
            // Fallback to first value of each attribute
            Object.entries(product.attributes).forEach(([k, vals]) => {
                if (Array.isArray(vals) && vals.length) init[k] = vals[0];
            });
        }

        setSelectedAttributes(init);
    }, [product, currentVariantId, params]);

    // When user changes attributes, find matching variant and update URL
    useEffect(() => {
        if (!product || Object.keys(selectedAttributes).length === 0) return;

        const match = product.productVariants.find(v =>
            Object.keys(selectedAttributes).every(a => v.attribute?.[a] === selectedAttributes[a])
        );

        if (match) {
            setSelectedVariant(match);

            const currentVariantInUrl = params.get('variant_Id');

            // Only update URL if the variant actually changed (prevents infinite loop)
            if (currentVariantInUrl !== match._id) {
                const usp = new URLSearchParams(params.toString());
                usp.set('variant_Id', match._id);
                router.replace(`/product/${product._id}?${usp.toString()}`, { scroll: false });
            }
        } else {
            setSelectedVariant(null);
        }
    }, [selectedAttributes, product, params, router]);

    const changeAttr = (attr: string, val: string) =>
        setSelectedAttributes(prev => ({ ...prev, [attr]: val }));

    return (
        <>
            {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div className="attributes-container">
                    {Object.entries(product.attributes).map(([attr, values]) => (
                        <div key={attr} className="attribute-block">
                            <p>Select {attr}</p>
                            <div className="attribute-values">
                                {values.map((v) => (
                                    <Button
                                        key={v}
                                        type="button"
                                        className={selectedAttributes[attr] === v ? 'active' : ''}
                                        onClick={() => changeAttr(attr, v)}
                                    >
                                        {v}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
