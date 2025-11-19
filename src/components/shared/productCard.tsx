import { Rating } from "@mui/material";
import Image from "next/image";
import Button from "./Button";
import { LuShoppingCart, LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import FallBackImage from "./FallBackImage";
import { useRouter } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { addToCartAtom } from "@/atoms/cartAtom";
import { toggleWishlistAtom, wishlistAtom } from "@/atoms/wishlistAtom";

interface ProductCardProps {
    product?: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const isTrackQuantity = product?.trackQuantity;
    const addToCartAction = useSetAtom(addToCartAtom);
    const toggleWishlist = useSetAtom(toggleWishlistAtom);
    const wishlist = useAtomValue(wishlistAtom);

    const isWishlisted = wishlist.some((item) => item._id === product?._id);
    const selectedVariant = product?.lowestPriceVariant || product?.productVariants?.[0];
    const isSelectedVariantOutOfStock = Boolean(
        isTrackQuantity && selectedVariant && ((selectedVariant.inventoryCount ?? 0) <= 0)
    );

    const renderStock = () => {
        if (isTrackQuantity) {
            if (product?.inventoryCount && product.inventoryCount > 0) {
                return <div className="flex justify-start items-center gap-[0.5rem]">
                    <span className="text-[0.75rem] font-semibold">In stock</span>
                </div>
            }
            return <div className="flex justify-start items-center gap-[0.5rem]">
                <span className="text-[0.75rem] font-semibold">Out of stock</span>
            </div>
        }
    }
    const showVariants = () => {
        if (product?.productVariants?.length && product.productVariants.length > 1) {
            return <div className="text-[var(--Colors-Neutral-700)] text-[0.75rem] underline cursor-pointer">
                +{product?.productVariants.length} variants
            </div>
        } else {
            return null;
        }
    }
    const navigateToProduct = () => {
        router.push(`/product/${product?._id}`);
    }
    const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!product) return;
        e.stopPropagation();
        if (isSelectedVariantOutOfStock) return;

        // Use lowestPriceVariant if available, otherwise fall back to first variant (computed above)
        const variant = selectedVariant;

        if (!variant) {
            console.error('No variant available for product:', product._id);
            return;
        }

        addToCartAction({
            productId: product?._id ?? '',
            variant: variant,
            quantity: 1,
            fulfillmentMethod: null,
        });

        console.log('add to cart');
    }
    const getLastDefaultPathName = (p?: Product) => {
        const path = p?.defaultPath;
        if (!Array.isArray(path) || path.length === 0) return '';
        const last = path[path.length - 1];
        return (last as any)?.name ?? '';
    };

    const handleWishlistToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (product) {
            toggleWishlist(product);
        }
    }

    return (
        <div className="p-[1.125rem] flex flex-col gap-[0.75rem] rounded-[var(--Radius-xs)] border-[var(--Colors-Neutral-100)] border-solid border-[1px] bg-white cursor-pointer relative group"

            onClick={navigateToProduct}
        >
            <div
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                onClick={handleWishlistToggle}
            >
                {isWishlisted ? (
                    <FaHeart className="text-red-500 text-lg" />
                ) : (
                    <LuHeart className="text-gray-400 text-lg hover:text-red-500 transition-colors" />
                )}
            </div>

            <div className="flex justify-between items-center relative w-[11.5rem] h-[4.3rem] m-auto">
                {product?.thumbnail?.file ? <Image src={product.thumbnail.file} fill alt="product-card" /> : <FallBackImage />}
            </div>
            <div className="flex flex-col gap-[0.25rem]">
                <span className="py-[0.25rem] px-[0.5rem] rounded-[1.125rem] bg-[var(--Colors-Neutral-50)] w-fit">{getLastDefaultPathName(product)}</span>
                <span className="text-[0.875rem] font-semibold ">{product?.name}</span>
                <div className="flex items-center gap-[0.25rem] text-[0.75rem] ">
                    <span className="text-[var(--Colors-Neutral-500)]">SKU: </span>
                    <span className="">{product?.sku}</span>
                </div>
            </div>
            <div className="flex justify-start items-center gap-[0.4rem]">
                <Rating size="small" name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                <span className="text-[0.75rem] text-[var(--Neutral-500)]">{product?.rating} ({product?.totalSold})</span>
            </div>
            {showVariants()}
            <div className="flex justify-between items-center">
                {renderStock()}
                <div>
                    <span className="text-[0.875rem] font-semibold">${product?.finalPrice}/<p className="inline text-[0.75rem] text-[var(--Colors-Neutral-500)] font-normal">each</p></span>
                </div>
            </div>
            <Button variant="primary" onClick={addToCart}>   <LuShoppingCart className="text-xl cursor-pointer" />Add to cart</Button>
            <span className="text-[0.75rem] text-center cursor-pointer">
                Parcel Shipping
            </span>
        </div>
    )
}