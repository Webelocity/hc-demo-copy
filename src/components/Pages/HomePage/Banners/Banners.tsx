"use client"
import Button from "@/components/shared/Button";
import Image from "next/image";

export default function Banners() {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;

    return (
        <div className="baseContainer">
            <div className="maxWidth flex flex-col gap-[1.5rem] py-[1.5rem]">
                <div className="p-[1.5rem] flex flex-col items-center gap-[1rem] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/Contractorcard.png')] bg-cover bg-center bg-no-repeat lg:aspect-[721/404]">
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
    );
}
