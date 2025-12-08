'use client';

import { fetchAllProducts, fetchProductsByCategoryId } from "@/Api/Apis";
import Button from "@/components/shared/Button";
import ProductCard from "@/components/shared/productCard";
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";
import { useQuery } from "@tanstack/react-query";

// Temporary mock data - replace with your actual data
const mockProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
    { id: 6, name: "Product 6" },
    { id: 7, name: "Product 7" },
    { id: 8, name: "Product 8" },
    { id: 9, name: "Product 9" },
    { id: 10, name: "Product 10" },
];

interface CategorySwiperProps {
    categoryId: string;
    categoryName: string;
}
export default function CategorySwiper({ categoryId, categoryName }: CategorySwiperProps) {
    const {
        data: productsResponse,
        isLoading,
        isError,
    } = useQuery<ApiResponse<Product>>({
        queryKey: ['CategorySwiper', categoryId],
        queryFn: () => fetchProductsByCategoryId(categoryId, { page: 1, limit: 10 }),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    return (
        <div className="baseContainer py-[5rem]">
            <div className="maxWidth p-[2.5rem] flex flex-col gap-[1.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
                <div className="flex justify-between items-center">
                    <h3 className="text-[2.5rem] font-bold text-start">
                        {categoryName}
                    </h3>
                    <Button variant="secondary" href={`/shop/catalogue?category_active=${categoryId}&page=1`}>View Shop</Button>
                </div>

                <ReUsableSwiper
                    className="swiper-pagination-new-arrivals"
                    data={productsResponse?.data ?? []}
                    isLoading={isLoading}
                    renderSlide={(product) => (
                        <ProductCard key={product._id} product={product} />
                    )}
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
    );
}