"use client"
import Button from "@/components/shared/Button";
import ProductCard from "@/components/shared/productCard";
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";

export default function Rent() {
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
        <div className="baseContainer py-[2.5rem]">
            <div className="p-[2.5rem] maxWidth flex flex-col lg:flex-row justify-between items-center gap-[5rem] aspect-[1352/457] bg-[url('/assets/image/HomePage/Tools.png')] rounded-[var(--Radius-md)] bg-cover bg-center bg-no-repeat">
                <div className="flex flex-col gap-[1.5rem] flex-[1]">
                    <p className="font-bold text-[2.5rem] text-white">Rent the Tools You Need Without Breaking the Bank</p>
                    <p className="text-[var(--Neutral-200)] text-[1.125rem]">Complete your project without buying expensive equipment! Browse our growing selection of rental tools — from pneumatic nailers to shop vacs. Rent for a day, a week, or longer..</p>
                    <div className="flex items-center gap-[1.5rem]">
                        <Button variant="secondary" className="w-fit">Request a Quote</Button>
                        <span className="text-[1rem] cursor-pointer text-white">All Services</span>
                    </div>

                </div>
                <ReUsableSwiper
                    data={mockProducts}
                    renderSlide={(product) => (
                        <ProductCard key={product.id} />
                    )}
                    className="swiper-pagination-Rent flex-1"
                    swiperOptions={{
                        spaceBetween: 20,
                        slidesPerView: 3,
                        breakpoints: {
                            320: { slidesPerView: 2, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 2, spaceBetween: 20 },
                            1280: { slidesPerView: 2.5, spaceBetween: 20 },
                        },
                    }}
                />


            </div>
        </div>
    );
}