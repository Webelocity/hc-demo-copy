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
    console.log(pricing);
    const row = pricing.productVariants.find(pv => pv._id === variantId)

    const price = row?.lowestFinalPrice;

    return (
        <div>
            <div>variantId: {variantId}</div>
            <div>price: {price !== undefined ? price.toFixed(2) : 'N/A'}</div>
        </div>
    );
}
