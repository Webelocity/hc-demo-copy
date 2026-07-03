"use client"
import { useMemo } from "react";
import Button from "@/components/shared/Button";
import { useBanners } from "@/hooks/useStrapi";
import { getStrapiImageUrl, type StrapiBanner } from "@/lib/strapi";
import Image from "next/image";

type BannerSlot = "banner1" | "banner2" | "banner3";

function getBannerSlot(value?: string): BannerSlot | undefined {
    const normalized = value
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, "");

    if (!normalized) return undefined;
    if (normalized.includes("banner1(815/368)")) return "banner1";
    if (normalized.includes("banner2(513/368)")) return "banner2";
    if (normalized.includes("banner3(721/412)")) return "banner3";
    return undefined;
}

function getBannerStyle(banner?: StrapiBanner) {
    const backgroundUrl = banner?.Background_Image?.url
        ? `url('${getStrapiImageUrl(banner.Background_Image.url)}')`
        : undefined;

    return backgroundUrl ? { backgroundImage: backgroundUrl } : undefined;
}

function getBannerImageUrl(banner: StrapiBanner | undefined, fallback: string) {
    const url = banner?.Background_Image?.url
        ? getStrapiImageUrl(banner.Background_Image.url)
        : '';

    return url || fallback;
}

function BannerSkeleton({ className }: { className?: string }) {
    return (
        <div
            className={`relative overflow-hidden rounded-[var(--Radius-md)] bg-[#1f2937] bg-opacity-50 ${className}`}
        >
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
        </div>
    );
}

export default function Banners() {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
    const { data: banners, isLoading } = useBanners();

    const bannerSlots = useMemo<Record<BannerSlot, StrapiBanner | undefined>>(
        () => {
            const mapped: Record<BannerSlot, StrapiBanner | undefined> = {
                banner1: undefined,
                banner2: undefined,
                banner3: undefined,
            };

            banners?.data?.forEach((banner) => {
                const slot = getBannerSlot(banner.BannerNumber);
                if (slot) mapped[slot] = banner;
            });

            return mapped;
        },
        [banners?.data]
    );

    const isLoadingBanners = isLoading || !banners?.data?.length;

    const banner1 = bannerSlots.banner1;
    const banner2 = bannerSlots.banner2;
    const banner3 = bannerSlots.banner3;

    return (
        <div className="baseContainer">
            <div className="maxWidth  flex flex-col gap-[1.5rem] py-[1.5rem]">
                <div className=" flex flex-col lg:flex-row gap-[1.5rem]">
                    {isLoadingBanners ? (
                        <>
                            <BannerSkeleton className="flex-[6] lg:aspect-[815/368] w-full" />
                            <BannerSkeleton className="flex-[4] lg:aspect-[513/368] w-full" />
                        </>
                    ) : (
                        <>
                            <div
                                className="relative flex flex-col py-[4rem] px-[2.5rem] items-start flex-[6] lg:aspect-[815/368] rounded-[var(--Radius-md)] overflow-hidden"
                            >
                                <Image
                                    src={getBannerImageUrl(banner1, '/assets/image/HomePage/heater.png')}
                                    alt={banner1?.Title || 'Stay Cozy With Compact Heaters'}
                                    fill
                                    priority
                                    className="object-cover object-center"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                                <div className="relative z-10 flex flex-col items-start">
                                <h1 className="text-[2.5rem] font-bold text-white" >
                                    {banner1?.Title || "Stay Cozy With Compact Heaters"}
                                </h1>
                                <p className="pt-[1rem] text-[1.125rem] text-[var(--Neutral-200)] font-normal w-[100%] lg:w-[60%]">
                                    {banner1?.Description || "Compact heaters that deliver serious comfort, right where you need it."}
                                </p>
                                <div className="mt-[2.5rem] ">
                                    <Button href={banner1?.CTA || "/shop/catalogue?cat=69143e9d6ac9361831e46266&page=1"} variant="primary">
                                        {"Shop Now"}
                                    </Button>
                                </div>
                                </div>
                            </div>
                            <div
                                className="flex flex-col py-[4rem] px-[2.5rem] items-start flex-[4] lg:aspect-[513/368] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/deals.png')] bg-cover bg-center bg-no-repeat"
                                style={getBannerStyle(banner2)}
                            >
                                <h1 className="text-[2.5rem] font-bold text-white" >
                                    {banner2?.Title || "Monthly Deals Built for Savings"}
                                </h1>
                                <p className="pt-[1rem] text-[1.125rem] text-[var(--Neutral-200)] font-normal w-[100%] lg:w-[60%]">
                                    {banner2?.Description || "Value-packed deals for the home, shop, and jobsite."}
                                </p>
                                <div className="mt-[2.5rem] ">
                                    <Button href={banner2?.CTA || "/shop/catalogue?cat=69143ed86ac9361831e465f6&page=1"} variant="primary">
                                        {"Shop Now"}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                    {isLoadingBanners ? (
                        <BannerSkeleton className="flex-[1] lg:aspect-[721/412] w-full" />
                    ) : (
                        <div
                            className="p-[1.5rem] flex flex-col items-center justify-center gap-[1rem] flex-[1] lg:aspect-[721/412] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/christmas.png')] bg-cover bg-center bg-no-repeat "
                            style={getBannerStyle(banner3)}
                        >
                            <h1 className="text-[2.5rem] font-bold text-white text-center lg:text-start" >{banner3?.Title || "Christmas Décor Sale"}</h1>

                            <p className=" text-[1.125rem] text-[var(--Neutral-200)] font-normal text-center">
                                {banner3?.Description || "Great prices on lights, ornaments, inflatables, and seasonal décor."}
                            </p>
                            <div className="flex justify-center mt-[2.5rem]">
                                <Button href={banner3?.CTA || "/shop/catalogue?cat=69143f1d6ac9361831e4752d&page=1"} variant="primary">
                                    {"Shop  Now"}
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className="p-[1.5rem] flex flex-col items-center gap-[1rem] flex-[0.9] lg:aspect-[721/404] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/Contractorcard.png')] bg-cover bg-center bg-no-repeat ">
                        <div className="flex flex-col lg:flex-row items-center gap-[1rem]">
                            <span className="text-[2.5rem] font-bold text-white">Join the </span>
                            <span className="text-[2.5rem] font-bold text-white rounded-[var(--Radius-md)] bg-[var(--secondary-500-main)] p-[0.8rem]">
                                Contractor Zone
                            </span>
                        </div>
                        <p className="text-[1.75rem] font-semibold text-white tracking-[9.6px]"> Become a Pro Today</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] w-full">
                            <div className="flex justify-start items-center gap-[1rem]">
                                <div className="relative p-[0.5rem] w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-[#AD6465] box-content">
                                    <Image src="/assets/image/HomePage/pro.svg" className="!relative w-[2rem] h-[2rem]" alt="contractor-zone-1" fill />
                                </div>
                                <p className="text-[1.25rem] font-bold text-white ">Volume Based Pricing</p>
                            </div>
                            <div className="flex justify-start items-center gap-[1rem]">
                                <div className="relative p-[0.5rem] w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-[#AD6465] box-content">
                                    <Image src="/assets/image/HomePage/discount.svg" className="!relative w-[2rem] h-[2rem]" alt="contractor-zone-1" fill />
                                </div>
                                <p className="text-[1.25rem] font-bold text-white ">Pro Offers</p>
                            </div>
                            <div className="flex justify-start items-center gap-[1rem]">
                                <div className="relative p-[0.5rem] w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-[#AD6465] box-content">
                                    <Image src="/assets/image/HomePage/special.svg" className="!relative w-[2rem] h-[2rem]" alt="contractor-zone-1" fill />
                                </div>
                                <p className="text-[1.25rem] font-bold text-white ">Special & Custom Orders</p>
                            </div>
                            <div className="flex justify-start items-center gap-[1rem]">
                                <div className="relative p-[0.5rem] w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-[#AD6465] box-content">
                                    <Image src="/assets/image/HomePage/Illustrations.png" className="!relative w-[2rem] h-[2rem]" alt="contractor-zone-1" fill />
                                </div>
                                <p className="text-[1.25rem] font-bold text-white ">Track Sales Better</p>
                            </div>
                        </div>
                        <div className="flex justify-start mt-[1.5rem] w-full">
                            <Button variant="primary" href={`${Customer_Dashboard_Url}/auth/register/regular?source=home-page`} className="w-full lg:w-auto">
                                Sign Up Now!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

