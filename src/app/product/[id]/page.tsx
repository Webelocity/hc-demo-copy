// app/products/[id]/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiAlertTriangle, FiRefreshCw, FiEdit3, FiChevronRight } from 'react-icons/fi';
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
import { STORES } from '@/util/shedule';

export const revalidate = 300;

type PageParams = { id: string };
type Search = { variant_Id?: string; q?: string };

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await fetchSingleProductById(id);
        const title = product?.name ?? 'Product';
        const rawDesc = product?.description ?? '';
        const description = rawDesc ? (stripHtml(rawDesc).slice(0, 160) + (stripHtml(rawDesc).length > 160 ? '…' : '')) : `Shop ${product?.name ?? 'this product'} at Home Central Stores – hardware and building supplies in Owego, Vestal, and Candor, NY.`;
        const image = product?.thumbnail?.file;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hcinc.com';
        return {
            title,
            description,
            openGraph: {
                title: `${title} | Home Central Stores`,
                description,
                ...(image && { images: [{ url: image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${image}` }] }),
                url: `${siteUrl}/product/${id}`,
            },
            twitter: {
                card: 'summary_large_image',
                title: `${title} | Home Central Stores`,
                description,
            },
        };
    } catch {
        return {
            title: 'Product',
            description: 'Shop at Home Central Stores – hardware and building supplies in Owego, Vestal, and Candor, NY.',
        };
    }
}

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
        const DO_IT_BEST_ADDRESS_ID = process.env.NEXT_PUBLIC_DO_IT_BEST_ID ?? '';
        const inStockInventories = selectedVariant?.trackQuantity
            ? (Array.isArray(selectedVariant?.allInventories) ? selectedVariant?.allInventories : selectedVariant?.inventory ?? [])
                .filter((inventory) => {
                    if (!inventory) return false;
                    const status = (inventory.status ?? '').toUpperCase();
                    return status === 'IN_STOCK' && (inventory.quantity ?? 0) > 0;
                })
            : [];
        const hasShippingInventory = DO_IT_BEST_ADDRESS_ID
            ? inStockInventories.some((inventory) => inventory.addressId === DO_IT_BEST_ADDRESS_ID)
            : false;
        const hasPhysicalInventory = inStockInventories.some((inventory) => inventory.addressId !== DO_IT_BEST_ADDRESS_ID);
        const shippingOnly = Boolean(selectedVariant?.trackQuantity && hasShippingInventory && !hasPhysicalInventory);
        const getLastDefaultPathName = (p?: Product) => {
            const path = p?.defaultPath;
            if (!Array.isArray(path) || path.length === 0) return '';
            const last = path[path.length - 1];
            return (last as any)?.name ?? '';
        };
        const renderStock = () => {
            if (!product?.trackQuantity || !selectedVariant) return null;
            const selectedInventory = selectedVariant.allInventories.find(inventory => inventory.addressId === storeAddressId);
            const selectedStoreName = storeAddressId
                ? STORES[storeAddressId as keyof typeof STORES]?.name ?? 'Selected store'
                : 'Selected store';
            const physicalStocks = inStockInventories.filter(
                (inv) => inv.addressId !== DO_IT_BEST_ADDRESS_ID && inv.addressId !== storeAddressId
            );
            const allPhysicalInventories = inStockInventories.filter((inv) => inv.addressId !== DO_IT_BEST_ADDRESS_ID);
            const shippingStock = DO_IT_BEST_ADDRESS_ID
                ? inStockInventories.find((inv) => inv.addressId === DO_IT_BEST_ADDRESS_ID)
                : undefined;
            const nothingAvailable = inStockInventories.length === 0;
            if (nothingAvailable) {
                return (
                    <div className="flex items-center gap-[0.5rem]">
                        <span className="text-[0.75rem] font-semibold text-[var(--Colors-Danger-600)]">Out of stock</span>
                    </div>
                );
            }

            const renderLocationRow = (inventory: Inventory) => {
                const label = STORES[inventory.addressId as keyof typeof STORES]?.name ?? 'Other location';
                return (
                    <div key={inventory.addressId} className="flex items-center justify-between rounded-[0.65rem] bg-[var(--Colors-Neutral-10)] px-[0.65rem] py-[0.45rem]">
                        <span className="text-[0.8rem] font-semibold text-[var(--Colors-Neutral-800)]">{label}</span>
                        <span className="text-[0.8rem] font-semibold text-[var(--Colors-Primary-700)]">{inventory.quantity} available</span>
                    </div>
                );
            };

            const selectedStoreNote = selectedInventory?.quantity
                ? `${selectedStoreName}: ${selectedInventory.quantity} available`
                : `${selectedStoreName}: Out of stock`;

            const shippingOnlyNote = Boolean(shippingStock && !allPhysicalInventories.length);

            const stockPill = (text: string, type: 'in' | 'out') => (
                <span
                    className={`text-[0.8rem] font-semibold px-[0.4rem] py-[0.2rem] rounded-[0.45rem] ${type === 'in'
                        ? 'bg-[var(--Colors-Success-50)] text-[var(--Colors-Success-700)]'
                        : 'bg-[#FEF7F6] text-[#EB4337]'
                        }`}
                >
                    {text}
                </span>
            );

            return (
                <div className="flex flex-col gap-[0.6rem]">
                    <div className="flex items-center gap-[0.4rem]">
                        {selectedInventory?.quantity
                            ? stockPill(`${selectedInventory.quantity} in stock (${selectedStoreName})`, 'in')
                            : stockPill(`Out of stock (${selectedStoreName})`, 'out')}
                    </div>

                    {physicalStocks.length > 0 && (
                        <div className="flex flex-col gap-[0.35rem] border border-[var(--Colors-Neutral-100)] rounded-[0.65rem] p-[0.6rem] bg-[var(--Colors-Neutral-10)]">
                            <span className="text-[0.75rem] font-semibold text-[var(--Colors-Neutral-700)]">Available nearby:</span>
                            <div className="flex flex-col gap-[0.3rem]">
                                {physicalStocks.map((inventory) => {
                                    const label = STORES[inventory.addressId as keyof typeof STORES]?.name ?? 'Other location';
                                    return (
                                        <div
                                            key={inventory.addressId}
                                            className="flex items-center justify-between rounded-[0.65rem] bg-white px-[0.7rem] py-[0.45rem] shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                                        >
                                            <div className="flex items-center gap-[0.5rem] text-[0.85rem] text-[var(--Colors-Neutral-800)]">
                                                <span className="font-medium">{label}</span>
                                            </div>
                                            <span className="text-[0.85rem] font-semibold text-[var(--Colors-Success-700)]">
                                                {inventory.quantity} in stock
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {shippingStock && shippingOnlyNote && (
                        <div className="flex items-center gap-[0.4rem] text-[0.8rem] font-semibold">
                            <span className="px-[0.55rem] py-[0.15rem] rounded-full border border-[var(--Colors-Primary-200)] bg-[var(--Colors-Primary-50)] text-[var(--Colors-Primary-700)]">
                                Available for online order only
                            </span>
                        </div>
                    )}
                </div>
            );
        }

        const defaultPathSegments = Array.isArray(product?.defaultPath) ? product.defaultPath.filter(Boolean) : [];
        const primaryCategoryId = defaultPathSegments[0]?._id;
        const breadcrumbItems = [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop/catalogue' },
            ...defaultPathSegments
                .map((segment, idx) => {
                    if (!segment?._id) return null;
                    const label = segment?.name ?? 'Category';
                    const href = idx === 0
                        ? `/shop/catalogue?cat=${segment._id}`
                        : `/shop/catalogue?sub=${segment._id}`;
                    return { label, href };
                })
                .filter((item): item is { label: string; href: string } => Boolean(item)),
        ];
        return (
            <div className='baseContainer'>
                <div className='maxWidth py-[2.5rem]  flex flex-col  gap-[1.5rem]'>
                    <div className="w-full overflow-x-auto">
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-[0.5rem] rounded-[0.75rem] border border-[var(--Colors-Neutral-100)] bg-white px-[1rem] py-[0.9rem] shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                        >
                            {breadcrumbItems.map((crumb, idx) => (
                                <div key={`${crumb.href}-${idx}`} className="flex items-center gap-[0.5rem] text-[0.9rem] text-[var(--Colors-Primary-700)] whitespace-nowrap">
                                    <Link
                                        href={crumb.href}
                                        className="flex items-center gap-[0.35rem] transition-colors hover:text-[var(--Colors-Primary-600)]"
                                    >
                                        <span
                                            className="truncate max-w-[8rem] sm:max-w-[11rem] md:max-w-[14rem]"
                                            title={crumb.label}
                                        >
                                            {crumb.label}
                                        </span>
                                    </Link>
                                    {idx < breadcrumbItems.length - 1 && (
                                        <FiChevronRight className="text-[var(--Colors-Neutral-400)]" aria-hidden />
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
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
                                    shippingOnly={shippingOnly}
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
                            href="/shop/catalogue"
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
