'use client';
import Button from "@/components/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WhyJoinUs() {
    const router = useRouter();
    return (
        <div className="baseContainer bg-[var(--primary-500-main)]">
            <div className="maxWidth py-[5rem] flex flex-col lg:flex-row gap-[1.5rem] items-start">
                <div className=" flex flex-col gap-[1.5rem] flex-[1] ps-[1rem]">
                    <h2 className="text-[2.5rem] font-bold text-white tracking-[0.8px]">Why Join Home Central Stores Team</h2>

                    <p className="text-[1.125rem] text-[var(--Neutral-100)]">Jobs at Home Central are diverse and are never limited to a single role. Team members are encouraged to learn all facets of our operations, including</p>
                    <div className="flex flex-col md:flex-row gap-[1.5rem] items-center">
                        <Button onClick={() => router.push('/careers/apply')} variant="secondary" size="large" className="bg-[var(--Neutral-100)] text-[var(--primary-500-main)] w-full md:w-fit">
                            Apply Now
                        </Button>

                    </div>
                    <div className="flex flex-col gap-[0.5rem] lg:hidden">
                        <div className="w-full md:min-w-[15rem] 2xl:min-w-[20rem]  py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/MedicalKit.svg'} alt="medical" fill />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Medical and supplemental insurance</p>
                        </div>
                        <div className=" md:min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]   flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <Image className="!relative !w-[1.5rem] !h-[1.5rem] " src={'/assets/image/Careers/icons/Star.svg'} alt="medical" fill />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Bonus programs</p>
                        </div>
                        <div className=" md:min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/Banknote.svg'} alt="medical" fill />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Paid Time Off (PTO)</p>
                        </div>


                        <div className=" min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]   flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/Case.svg'} alt="medical" fill />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Merchandise discounts</p>
                        </div>
                        <div className="  min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]   flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                            <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/Sale.svg'} alt="medical" fill />
                            <p className="text-[1.125rem] text-white md:whitespace-nowrap">Opportunities for career advancement</p>
                        </div>

                    </div>
                </div>
                <div className=" flex-[1] relative  w-full">
                    <div className="w-full h-full ">
                        <div className="w-full relative ">
                            <Image className="aspect-[624/375] object-cover rounded-[var(--Radius-md)] !relative" src="/assets/image/Careers/team.svg" alt="owego-showroom" fill />
                            <div className="hidden lg:flex absolute flex-col items-end gap-[1rem] bottom-[-1.7rem] xl:bottom-[0.5rem] right-[-2rem]">
                                <div className="flex gap-[1rem] items-center justify-end">
                                    <div className=" md:min-w-[15rem] 2xl:min-w-[20rem] w-max py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] hidden xl:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                                        <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/MedicalKit.svg'} alt="medical" fill />
                                        <p className="text-[1.125rem] text-white md:whitespace-nowrap">Medical and supplemental insurance</p>
                                    </div>
                                    <div className=" md:min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]   md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                                        <Image className="!relative !w-[1.5rem] !h-[1.5rem] " src={'/assets/image/Careers/icons/Star.svg'} alt="medical" fill />
                                        <p className="text-[1.125rem] text-white md:whitespace-nowrap">Bonus programs</p>
                                    </div>
                                    <div className=" md:min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)] md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                                        <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/Banknote.svg'} alt="medical" fill />
                                        <p className="text-[1.125rem] text-white md:whitespace-nowrap">Paid Time Off (PTO)</p>
                                    </div>

                                </div>
                                <div className="flex items-center gap-[1rem] justify-end">

                                    <div className="w-max min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]   md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                                        <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/Case.svg'} alt="medical" fill />
                                        <p className="text-[1.125rem] text-white md:whitespace-nowrap">Merchandise discounts</p>
                                    </div>
                                    <div className=" w-max min-w-[15rem] 2xl:min-w-[20rem] py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]   md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                                        <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/Sale.svg'} alt="medical" fill />
                                        <p className="text-[1.125rem] text-white md:whitespace-nowrap">Opportunities for career advancement</p>
                                    </div>
                                </div>
                                <div className="flex xl:hidden items-center gap-[1rem] justify-end">

                                    <div className=" md:min-w-[15rem] 2xl:min-w-[20rem] w-max py-[1rem] px-[1.5rem] bg-[var(--Primary-600)]  md:flex gap-[1.25rem] items-center rounded-[var(--Radius-md)] border-[var(--Primary-100)] border">
                                        <Image className="!relative !w-[1.5rem] !h-[1.5rem]" src={'/assets/image/Careers/icons/MedicalKit.svg'} alt="medical" fill />
                                        <p className="text-[1.125rem] text-white md:whitespace-nowrap">Medical and supplemental insurance</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}