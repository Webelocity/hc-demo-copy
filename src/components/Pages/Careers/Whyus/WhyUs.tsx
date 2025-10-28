import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";

export default function WhyUs() {
    return (
        <div className="baseContainer py-[2.5rem] flex flex-col md:flex-row items-center justify-center gap-[1rem]">
            <div className="flex-[2] flex flex-col items-start justify-center gap-[1.5rem]  bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[2.5rem]">
                <h2 className="text-[2.5rem] font-bold">Why Work at Home Central Stores</h2>
                <p className="text-[1.125rem] text-[var(--Neutral-700)]">Do you thrive in a fast-paced, dynamic workplace? Home Central Stores offers exciting career opportunities for motivated individuals in Owego, Vestal, and Candor, NY. Whether you have a CDL, experience in distribution and logistics, or are an experienced forklift operator, our team provides a variety of tasks that keep every day fresh and challenging.<br />
                    You can apply online or at one of our <Link href="/locations" className="underline text-[var(--primary-500-main)]">locations.</Link>
                </p>
                <Button variant="primary" size="large">Apply Now</Button>
            </div>
            <div className="flex-[1.5] relative w-full h-[-webkit-fill-available] relative ">
                <Image className="aspect-[519/379] !relative  rounded-[var(--Radius-md)] object-cover" src="/assets/image/Careers/store.svg" alt="Why Us" fill />
                <Image className="!bottom-[1rem] !left-[1rem] top-unset !top-[auto] !w-[6.5rem] !h-[4.6rem]" src="/assets/image/shared/logo.svg" alt="Why Us" fill />
            </div>
        </div>
    );
}