"use client";
import ReUsableSwiper from "@/components/shared/ReUsableSwiper/reUsableSwiper";
import CustomNoData from "@/components/shared/CustomNoData";
import { useReviews } from "@/hooks/useStrapi";
import { getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";

export default function Reviews() {
  const { data: reviewsData, isLoading, error, isError } = useReviews();
  const reviews = reviewsData?.data ?? [];

  return (
    <div className="baseContainer py-[5rem]">
      <div className="flex maxWidth flex-col gap-[3rem] bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[2.5rem]">
        <p className="font-bold text-[2.5rem] text-black">
          What Our Customers Say
        </p>
        {reviews.length === 0 && !isLoading ? (
          <CustomNoData text="No Current Reviews" />
        ) : (
          <ReUsableSwiper
            data={reviews}
            isLoading={isLoading}
            isError={isError}
            error={error}
            className="swiper-pagination-reviews"
            slideStyles="pt-[2.75rem]"
            renderSlide={(item) => {
              return (
                <div className="flex-1 flex flex-col gap-[2.5rem] p-[1.5rem] pt-[3.25rem] bg-white rounded-[var(--Radius-md)] h-[16.25rem] relative box-content">
                  <Image
                    className="absolute top-0 !left-[50%] -translate-x-1/2 -translate-y-1/2 !w-[5.5rem] !h-[5.5rem] !rounded-[5.5rem]"
                    src={getStrapiImageUrl(item.image.url)}
                    alt="Review"
                    fill
                  />
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-[1.125rem] text-center line-clamp-3">
                      {item.review}
                    </p>
                  </div>
                  <p className="text-[1.25rem] font-bold text-center">
                    {item.name}
                  </p>
                </div>
              );
            }}
            swiperOptions={{
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
            }}
          />
        )}
      </div>
    </div>
  );
}
