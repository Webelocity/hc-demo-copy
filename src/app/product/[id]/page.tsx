// app/products/[id]/page.tsx
import { redirect } from 'next/navigation';
import { fetchSingleProductById } from '@/Api/Apis';
import SelectedVariantAndPrice from '@/components/Pages/Shop/SingleProduct/SelectedVariantAndPrice';
import VariantAttributes from '@/components/Pages/Shop/SingleProduct/VariantSelector';
import QuantityPicker from '@/components/Pages/Shop/SingleProduct/QuantityPicker';


export const revalidate = 300;

type PageParams = { id: string };
type Search = { variant_Id?: string; q?: string };

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: Promise<PageParams>;            // sync
    searchParams: Promise<Search>; // must be awaited
}) {
    const { id } = await params;
    const { q, variant_Id } = await searchParams;

    const product = await fetchSingleProductById(id);

    // decide default variant (your priority rule)
    const defaultVariant = product.lowestPriceVariant ?? product.productVariants[0];

    // always ensure URL has variant_Id (canonical, shareable)
    // if (!variant_Id) {
    //     const qPart = q ? `&q=${encodeURIComponent(q)}` : '';
    //     redirect(`/product/${id}?variant_Id=${encodeURIComponent(defaultVariant._id)}`);
    // }

    // now read (guaranteed) selected variant + qty
    const variantId = variant_Id ?? defaultVariant?._id!;
    const selectedVariant = product.productVariants.find(pv => pv._id === variantId);
    const qty = Math.max(1, Number(q ?? 1) || 1);

    return (
        <div className='baseContainer py-[2.5rem]  flex flex-col gap-[1.5rem]'>
            <SelectedVariantAndPrice
                productId={product._id}
                variantId={variantId}
                quantity={qty}
            />

            <VariantAttributes
                product={product}
                currentVariantId={variantId}
            />

            <QuantityPicker
                productId={product._id}
                variantId={variantId}
                quantity={qty}
                selectedVariant={selectedVariant}
            />
        </div>
    );
}
