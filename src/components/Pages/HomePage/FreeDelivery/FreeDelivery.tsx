"use client"
import Button from "@/components/shared/Button";
import ProductCard from "@/components/shared/productCard";
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";
import Image from "next/image";

export default function FreeDelivery() {
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
    return (
        <div className="baseContainer py-[5rem]">
            <div className="flex flex-col ">
                <div className="flex flex-col-reverse lg:flex-row justify-between  items-center p-[2.5rem] w-full bg-[var(--Teritary-100)] rounded-t-[var(--Radius-md)] border-t border-r border-l border-[var(--Teritary-100)]">
                    <div className="flex flex-col gap-[1rem] w-full lg:w-1/2 flex-[2]">
                        <p className="text-[2.5rem] font-bold">Free Delivery</p>
                        <p className="text-[var(--Neutral-500)] text-[1.125rem]">Get your essential tools, building materials, and hardware delivered safely and on schedule.</p>
                        <Button variant="primary" className="w-fit">Shop Now</Button>
                    </div>
                    <div className="flex-[1]">
                        <Image className="aspect-[517/295] !relative" src={'/assets/image/HomePage/delivery_truck.svg'} alt="delivery_truck" fill />
                    </div>
                </div>
                <div className="p-[1.5rem] rounded-b-[var(--Radius-md)]  border-[var(--Teritary-100)] border-r border-b border-l">
                    <ReUsableSwiper
                        data={mockProducts}
                        renderSlide={(product) => (
                            <ProductCard />
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