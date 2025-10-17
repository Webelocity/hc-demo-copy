import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";
import { RiDiscountPercentFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";

export default function OwegoShowRoom() {
    return (
        <div className="baseContainer bg-[var(--primary-500-main)] py-[5rem] flex flex-col lg:flex-row gap-[4rem] items-center">
            <div className="flex flex-col gap-[1.5rem] flex-[1] ps-[1rem]">
                <h2 className="text-[2.5rem] font-bold text-white tracking-[0.8px]">Visit Our Home Central Showroom & Design Center in Owego</h2>
                <div className="flex flex-col gap-[0.5rem] md:hidden">
                    <div className="py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]  flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                        <RiDiscountPercentFill className="text-2xl text-white" />
                        <p className="text-[1.125rem] text-white">Hands-on access to top-quality appliances and fixtures</p>
                    </div>
                    <div className=" py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                        <HiMiniUserGroup className="text-2xl text-white" />
                        <p className="text-[1.125rem] text-white">Expert advice from our knowledgeable team</p>
                    </div>
                </div>
                <p className="text-[1.125rem] text-[var(--Neutral-100)]">See, experience, and choose the best kitchen, bath, and appliance solutions for your projects. Our experts are ready to guide homeowners,  contractors and vendors to the perfect products.</p>
                <div className="flex flex-col md:flex-row gap-[1.5rem] items-center">
                    <Button variant="secondary" size="large" className="bg-[var(--Neutral-100)] text-[var(--primary-500-main)] w-full md:w-fit">
                        Explore the Showroom
                    </Button>
                    <Link className="text-normal font-medium text-white" href="/owego-showroom">
                        Shop Products
                    </Link>
                </div>
            </div>
            <div className="flex-[1.8] relative  md:min-h-[34rem] w-full">
                <div className="relative top-0 md:top-[-6rem] md:absolute  w-full h-full ">
                    <div className="w-full relative  ">
                        <Image className="aspect-[846px/459px] !relative" src="/assets/image/HomePage/OwegoShowroom.png" alt="owego-showroom" fill />
                        <div className="hidden py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] absolute bottom-[5rem] left-[-2rem]  md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <RiDiscountPercentFill className="text-2xl text-white" />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Hands-on access to top-quality appliances and fixtures</p>
                        </div>
                        <div className="hidden py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] left-[50%] translate-x-[-50%] absolute bottom-0  md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <HiMiniUserGroup className="text-2xl text-white" />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Expert advice from our knowledgeable team</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}