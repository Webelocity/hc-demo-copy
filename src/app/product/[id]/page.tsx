// app/products/[id]/page.tsx
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { fetchSingleProductById } from '@/Api/Apis';
import SelectedVariantAndPrice from '@/components/Pages/Shop/SingleProduct/SelectedVariantAndPrice';
import VariantAttributes from '@/components/Pages/Shop/SingleProduct/VariantSelector';
import QuantityPicker from '@/components/Pages/Shop/SingleProduct/QuantityPicker';
import PricingSkeleton from '@/components/Pages/Shop/SingleProduct/PricingSkeleton';
import ProductDetails from '@/components/Pages/Shop/SingleProduct/ProductDetails';
import Gallery from '@/components/Pages/Shop/SingleProduct/Gallery';
import { Rating } from '@mui/material';
import BulkTable from '@/components/Pages/Shop/SingleProduct/BulkTable';
import { cookies } from 'next/headers';


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
    const cookieStore = await cookies()
    const storeAddressId = cookieStore.get('storeAddressId')?.value;
    try {
        const product = await fetchSingleProductById(id, storeAddressId);
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
        const getLastDefaultPathName = (p?: Product) => {
            const path = p?.defaultPath;
            if (!Array.isArray(path) || path.length === 0) return '';
            const last = path[path.length - 1];
            return (last as any)?.name ?? '';
        };
        const renderStock = () => {
            if (product?.trackQuantity && selectedVariant) {
                if (selectedVariant?.inventoryCount > 0) {
                    return <div className="flex justify-start items-center gap-[0.5rem]">
                        <span className="text-[0.75rem] font-semibold">{selectedVariant?.inventoryCount} In stock</span>
                    </div>
                } else {
                    return <div className="flex justify-start items-center gap-[0.5rem]">
                        <span className="text-[0.75rem] font-semibold">Out of stock</span>
                    </div>
                }
            }
        }
        return (
            <div className='baseContainer'>
                <div className='maxWidth py-[2.5rem]  flex flex-col  gap-[1.5rem]'>
                    {/* Product Gallery */}
                    <div className='w-full flex flex-col lg:flex-row gap-[1.5rem]'>
                        <div className='flex-1' >
                            <Gallery product={product} selectedVariant={selectedVariant} />

                        </div>
                        <div className='flex-1 p-[1.5rem] flex flex-col gap-[0.75rem] border border-[var(--Colors-Neutral-100)] rounded-[1rem] lg:rounded-[0.75rem]'>
                            <h1 className='text-[1.75rem] text-start font-bold'>{product.name}</h1>
                            <div className="flex justify-start items-center gap-[0.4rem]">
                                <Rating size="medium" name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                                <span className="text-[0.75rem] text-[var(--Neutral-500)]">{product?.rating} ({product?.totalSold})</span>
                            </div>
                            {renderStock()}
                            <div className='flex flex-col gap-[1rem] py-[1rem]'>
                                <span className='text-[0.875rem] font-semibold text-start'>Specifications:</span>
                                <div className='flex justify-between items-center'>
                                    <span className='text-[0.75rem] font-medium'>SKU:</span>
                                    <span className='text-[0.75rem] font-medium'>{product?.sku}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-[0.75rem] font-medium'>Brand:</span>
                                    <span className='text-[0.75rem] font-medium'>{product?.brand}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-[0.75rem] font-medium'>Category:</span>
                                    <span className='text-[0.75rem] font-medium'>{getLastDefaultPathName(product)}</span>
                                </div>
                            </div>
                            <VariantAttributes
                                product={product}
                                currentVariantId={variantId}
                            />

                        </div>
                        <div className='flex-1 p-[1.5rem] flex flex-col gap-[0.75rem] border border-[var(--Colors-Neutral-100)] rounded-[1rem] lg:rounded-[0.75rem]'>
                            <Suspense key={`${variantId}-${qty}`} fallback={<PricingSkeleton />}>
                                <SelectedVariantAndPrice
                                    productId={product._id}
                                    variantId={variantId}
                                    quantity={qty}
                                />
                            </Suspense>

                            <QuantityPicker
                                productId={product._id}
                                variantId={variantId}
                                quantity={qty}
                                selectedVariant={selectedVariant}
                                product={product}
                            />
                            <BulkTable product={product} />


                        </div>
                    </div>








                    <div className="mt-8 border-t pt-8">
                        <ProductDetails product={product} />
                    </div>
                </div>
            </div>

        );
    } catch (error: any) {
        console.error(error);
        return <div>Error fetching product {error.message}</div>;
    }




}
