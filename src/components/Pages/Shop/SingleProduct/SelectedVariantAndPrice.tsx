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
    const row = pricing.productVariants.find(pv => pv._id === variantId)

    const price = row?.lowestFinalPrice;

    return (
        <div className='text-[1.875rem] font-semibold'> ${price !== undefined ? price.toFixed(2) : 'N/A'}/<span className='inline !text-[0.75rem] !text-[var(--Colors-Neutral-500)] !font-normal'>unit</span></div>
    );
}
