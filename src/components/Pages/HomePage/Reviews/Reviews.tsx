"use client"
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";
import Image from "next/image";

export default function Reviews() {
    const dummyData = [
        {
            id: 1,
            image: "/assets/image/HomePage/review.svg",
            title: "Well equipped. Convenient location.",
            name: "Jesse Bush",
        },

        {
            id: 2,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
        {
            id: 3,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
        {
            id: 4,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
        {
            id: 5,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
        {
            id: 6,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
        {
            id: 7,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
        {
            id: 8,
            image: "/assets/image/HomePage/review.svg",
            title: "I went in this morning thinking of a complex answer to a construction project. An employee saw my puzzled look and meandering, so he asked if I needed help. He gave me a much simpler, easier, and cheaper solution. I was very pleased, so yes, I will be going back to this store and the one in Candor.",
            name: "Mike Blake",
        },
    ]
    return (
        <div className="baseContainer py-[5rem]">
            <div className="flex maxWidth flex-col gap-[3rem] bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[2.5rem]">

                <p className="font-bold text-[2.5rem] text-black">What Our Customers Say</p>
                <ReUsableSwiper
                    data={dummyData}
                    className="swiper-pagination-reviews"
                    slideStyles='pt-[2.75rem]'
                    renderSlide={() => {
                        return (
                            <div className="flex-1 flex flex-col gap-[2.5rem] p-[1.5rem] pt-[3.25rem] bg-white rounded-[var(--Radius-md)] h-[16.25rem] relative box-content">
                                <Image className="absolute top-0 !left-[50%] -translate-x-1/2 -translate-y-1/2 !w-[5.5rem] !h-[5.5rem] !rounded-[5.5rem]" src="/assets/image/HomePage/review.svg" alt="Review" fill />
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-[1.125rem] text-center line-clamp-3">Well equipped. Convenient location.</p>
                                </div>
                                <p className="text-[1.25rem] font-bold text-center"> Jesse Bush</p>
                            </div>
                        )
                    }}
                    swiperOptions={
                        {
                            slidesPerView: 4,
                            spaceBetween: 20,

                            breakpoints: {
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1280: {
                                    slidesPerView: 4,
                                },
                            },
                        }
                    }
                />


            </div>

        </div>
    );
}