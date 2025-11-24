import Button from "@/components/shared/Button";
import Image from "next/image";

export default function Banners() {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
    return (
        <div className="baseContainer">
            <div className="maxWidth  flex flex-col gap-[1.5rem] py-[1.5rem]">
                <div className=" flex flex-col lg:flex-row gap-[1.5rem]">
                    <div className="flex flex-col py-[4rem] px-[2.5rem]  items-start flex-[6] aspect-[815/368] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/winter.png')] bg-cover bg-center bg-no-repeat">
                        <h1 className="text-[2.5rem] font-bold text-white" >
                            Winter Essentials Sale!
                        </h1>
                        <p className="pt-[1rem] text-[1.125rem] text-[var(--Neutral-200)] font-normal w-[100%] lg:w-[60%]">
                            From snow removal tools to heaters and cozy home must-haves, get ready for winter with special seasonal savings at Home Central Stores.
                        </p>
                        <div className="mt-[2.5rem] ">
                            <Button variant="primary">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col py-[4rem] px-[2.5rem] items-start flex-[4] aspect-[516/368] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/construction.svg')] bg-cover bg-center bg-no-repeat">
                        <h1 className="text-[2.5rem] font-bold text-white" >
                            Top Savings For Your Building Materials
                        </h1>
                        <p className="pt-[1rem] text-[1.125rem] text-[var(--Neutral-200)] font-normal w-[100%] lg:w-[60%]">
                            Find great deals and special prices.                    </p>
                        <div className="mt-[2.5rem] ">
                            <Button href="/shop/catalogue?category_active=69143ed86ac9361831e465f6&page=1" variant="primary">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[1.5rem]">
                    <div className="p-[1.5rem] flex flex-col items-center gap-[1rem] flex-[1] aspect-[721/404] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/lighting.png')] bg-cover bg-center bg-no-repeat ">
                        <h1 className="text-[2.5rem] font-bold text-white text-center lg:text-start" >Brighten Up Your Space and get </h1>
                        <span className="flex flex-col lg:flex-row items-center gap-[0.5rem]">
                            <span className="text-[2rem] font-bold text-white rounded-[var(--Radius-md)] bg-[var(--primary-500-main)] p-[0.8rem]">
                                20% OFF
                            </span>
                            <span className="text-[2.5rem] font-bold text-white">
                                Exterior Lighting
                            </span>
                        </span>
                        <p className=" text-[1.125rem] text-[var(--Neutral-200)] font-normal text-center">
                            From snow removal tools to heaters and cozy home must-haves, get ready for winter with special seasonal savings at Home Central Stores.
                        </p>
                        <div className="flex justify-center mt-[2.5rem]">
                            <Button href="/shop/catalogue?category_active=69143f1d6ac9361831e4752d&page=1" variant="primary">
                                Shop Electrical Now
                            </Button>
                        </div>
                    </div>
                    <div className="p-[1.5rem] flex flex-col items-center gap-[1rem] flex-[0.9] aspect-[721/404] rounded-[var(--Radius-md)] bg-[url('/assets/image/HomePage/Contractorcard.png')] bg-cover bg-center bg-no-repeat ">
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
                                <p className="text-[1.25rem] font-bold text-white ">Pro Pricing</p>
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