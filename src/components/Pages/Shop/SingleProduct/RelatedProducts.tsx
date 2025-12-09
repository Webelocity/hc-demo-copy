'use client';

import { fetchRelatedProducts } from "@/Api/Apis";
import Button from "@/components/shared/Button";
import ProductCard from "@/components/shared/productCard";
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export default function RelatedProducts({ productId }: { productId: string }) {
    const {
        data: productsResponse,
        isLoading,
        isError,
    } = useQuery<Product[]>({
        queryKey: ['RelatedProducts', productId],
        queryFn: () => fetchRelatedProducts(productId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    console.log(productsResponse);
    const router = useRouter();
    return (
        <div className="p-[2.5rem] maxWidth flex flex-col gap-[1.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
            <div className="flex justify-between items-center">
                <h3 className="text-[2.5rem] font-bold text-start">
                    Related Products
                </h3>
                <Button onClick={() => router.push(`/shop/catalogue`)} variant="secondary">All Products </Button>
            </div>

            <ReUsableSwiper
                className="swiper-pagination-related-products"
                data={productsResponse ?? []}
                isLoading={isLoading}
                renderSlide={(product) => (
                    <ProductCard product={product} key={product._id} />
                )}
                slideStyles="!h-[-webkit-fill-available]"
                swiperOptions={{
                    spaceBetween: 20,
                    slidesPerView: 5,
                    breakpoints: {
                        320: { slidesPerView: 2, spaceBetween: 10 },
                        640: { slidesPerView: 3, spaceBetween: 15 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1280: { slidesPerView: 5, spaceBetween: 20 },
                    },
                }}
            />
        </div>
    );
}