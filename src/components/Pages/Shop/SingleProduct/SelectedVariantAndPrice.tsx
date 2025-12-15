// components/SingleProduct/SelectedVariantAndPrice.tsx
import { fetchSingleProductByIdPrices } from '@/Api/Apis';

export default async function SelectedVariantAndPrice({
    productId,
    variantId,
    quantity,
}: {
    productId: string;       // product.id (public)
    variantId: string;
    quantity: number;
}) {
    const pricing = await fetchSingleProductByIdPrices(productId, { quantity });
    const row = pricing.productVariants.find((pv) => pv._id === variantId);

    const price = row?.lowestFinalPrice;
    const retailPrice = row?.retailPrice;
    const isDiscounted = Boolean(row?.isDiscounted && retailPrice !== undefined && price !== undefined);
    const savedAmount = isDiscounted && retailPrice !== undefined && price !== undefined
        ? Math.max(0, retailPrice - price)
        : 0;
    const savedPercentage = isDiscounted && retailPrice !== undefined && price !== undefined
        ? Math.max(0, (retailPrice - price) * 100 / retailPrice)
        : 0;
    return (
        <div className="flex flex-col gap-[0.25rem]">
            <div className="flex items-baseline gap-[0.5rem]">
                <div className="text-[1.875rem] font-semibold">
                    ${price !== undefined ? price.toFixed(2) : "N/A"}
                    <span className="inline text-[0.75rem] text-[var(--Colors-Neutral-500)] font-normal">/unit</span>
                </div>

                {isDiscounted && retailPrice !== undefined && (
                    <div className="text-[1rem] text-[var(--Colors-Neutral-500)] ">
                        <span className="line-through">${retailPrice.toFixed(2)}</span>
                        <span className="inline text-[0.75rem] text-[var(--Colors-Neutral-500)] font-normal">/unit</span>
                    </div>
                )}
            </div>

            {isDiscounted && (
                <div className="text-sm font-semibold text-[var(--Colors-Success-500)]">
                    You save ${savedAmount.toFixed(2)} ({savedPercentage.toFixed(0)}%)
                </div>
            )}
        </div>
    );
}
