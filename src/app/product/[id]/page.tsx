// app/products/[id]/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiRefreshCw, FiEdit3 } from 'react-icons/fi';
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
import Button from '@/components/shared/Button';
import RelatedProducts from '@/components/Pages/Shop/SingleProduct/RelatedProducts';


export const revalidate = 300;

type PageParams = { id: string };
type Search = { variant_Id?: string; q?: string };

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: Promise<PageParams>;
    searchParams: Promise<Search>;
}) {
    const { id } = await params;
    const { q, variant_Id } = await searchParams;
    const cookieStore = await cookies()
    const storeAddressId = cookieStore.get('storeAddressId')?.value;
    try {
        const product = await fetchSingleProductById(id);
        console.log(product);
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
            const selectedInventory = selectedVariant?.allInventories.find(inventory => inventory.addressId === storeAddressId);

            if (product?.trackQuantity && selectedVariant && selectedInventory) {
                if (selectedInventory?.quantity > 0) {
                    return <div className="flex justify-start items-center gap-[0.5rem]">
                        <span className="text-[0.75rem] font-semibold">{selectedInventory?.quantity} In stock</span>
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
                    <RelatedProducts productId={product._id} />
                </div>
            </div>

        );
    } catch (error: any) {
        console.error(error);
        return (
            <div className="baseContainer">
                <div className="maxWidth py-[4rem] flex flex-col items-center text-center gap-[1.5rem]">
                    <div className="flex flex-col items-center gap-[1rem]">
                        <div className="w-[4.5rem] h-[4.5rem] flex items-center justify-center rounded-full bg-[var(--Colors-Primary-50)] text-[var(--Colors-Primary-500)]">
                            <FiAlertTriangle size={36} />
                        </div>
                        <div className="flex flex-col gap-[0.5rem] max-w-2xl">
                            <h1 className="text-[2rem] font-bold text-[var(--Colors-Primary-600)]">Oops! An error occurred</h1>
                            <p className="text-[1rem] text-[var(--Neutral-600)]">
                                We couldn&apos;t load this product right now. {error?.message ? `(${error.message})` : 'Please try again shortly.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-[1rem] w-full md:w-auto justify-center">
                        <Button
                            href="/shop/catalogue?category_active=69143ed86ac9361831e465f6&page=1"
                            variant="primary"
                            size="large"
                        >
                            Browse the shop
                        </Button>
                        <Button
                            href="/"
                            variant="secondary"
                            size="large"
                            className="px-[1.5rem] py-[0.85rem] rounded-[0.75rem] font-semibold border border-[var(--Colors-Primary-200)] text-[var(--Colors-Primary-600)] bg-white hover:bg-[var(--Colors-Primary-50)] transition-colors"
                        >
                            Back to home
                        </Button>
                    </div>

                    <div className="mt-[2rem] w-full max-w-2xl">
                        <div className="p-[1.5rem] rounded-[1rem] border border-[var(--Colors-Neutral-100)] bg-[var(--Colors-Neutral-10)] text-left flex flex-col gap-[1rem]">
                            <p className="text-[0.95rem] font-semibold text-[var(--Neutral-700)]">Helpful hints</p>
                            <ul className="flex flex-col gap-[0.75rem] text-[0.9rem] text-[var(--Neutral-600)]">
                                <li className="flex items-start gap-[0.5rem]">
                                    <FiEdit3 className="text-[var(--Colors-Primary-500)] mt-[0.2rem]" />
                                    Make sure the product ID in the URL has no typos.
                                </li>
                                <li className="flex items-start gap-[0.5rem]">
                                    <FiRefreshCw className="text-[var(--Colors-Primary-500)] mt-[0.2rem]" />
                                    Refresh the page or come back in a moment if the issue persists.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }




}
