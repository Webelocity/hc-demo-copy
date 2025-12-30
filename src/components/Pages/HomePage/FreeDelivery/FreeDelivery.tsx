"use client"
import { fetchAllProducts } from "@/Api/Apis";
import Button from "@/components/shared/Button";
import ProductCard from "@/components/shared/productCard";
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function FreeDelivery() {
    const promoCategoryId = "6952ef7ddd75a9969c9755c5";

    const {
        data: productsResponse,
        isLoading,
        isError,
        error,
    } = useQuery<ApiResponse<Product>>({
        queryKey: ['MonthlyDeals'],
        queryFn: () => fetchAllProducts({ page: 1, limit: 10, promotionalCategories: promoCategoryId }),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    return (
        <div className="baseContainer py-[5rem]">
            <div className="flex flex-col maxWidth">
                <div className="flex flex-col-reverse lg:flex-row justify-between  items-center p-[2.5rem] w-full bg-[var(--Teritary-100)] rounded-t-[var(--Radius-md)] border-t border-r border-l border-[var(--Teritary-100)]">
                    <div className="flex flex-col gap-[1rem] w-full lg:w-1/2 flex-[2]">
                        <p className="text-[2.5rem] font-bold">Monthly Deals</p>
                        <p className="text-[var(--Neutral-500)] text-[1.125rem]">Grab this month’s limited-time deals and get everything delivered fast.</p>
                        <Button variant="primary" href="/shop/catalogue?promotionalCategories=6952ef7ddd75a9969c9755c5" className="w-fit">Shop Now</Button>
                    </div>
                    <div className="flex-[1]">
                        <Image className="aspect-[517/295] !relative" src={'/assets/image/HomePage/delivery_truck.png'} alt="delivery_truck" fill />
                    </div>
                </div>
                <div className="p-[1.5rem] rounded-b-[var(--Radius-md)]  border-[var(--Teritary-100)] border-r border-b border-l">
                    <ReUsableSwiper
                        data={productsResponse?.data ?? []}
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        renderSlide={(product) => (
                            <ProductCard key={product._id} product={product} />
                        )}
                        className="swiper-pagination-free-delivery"
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
            </div>
        </div>
    );
}