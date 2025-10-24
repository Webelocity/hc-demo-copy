import Button from "@/components/shared/Button";
import Link from "next/link";

export default function ContractorBanner() {
    return (
        <div className="baseContainer py-[2.5rem] ">
            <div className="p-[2.5rem] flex flex-col justify-start items-center lg:items-start aspect-[1304/416] bg-[url('/assets/image/ContractorZone/contractorzone.svg')] rounded-[var(--Radius-md)] bg-cover bg-center bg-no-repeat ">
                <h1 className="text-[3rem] font-bold text-white leading-[1.2] text-center lg:text-start w-full lg:w-[50%] ">
                    Exclusive Access for
                </h1>
                <span className="text-[3rem] leading-[1.2] w-fit font-bold text-white text-center lg:text-start bg-[var(--secondary-500-main)] rounded-[var(--Radius-md)] px-[1rem] py-[0.5rem]">Professional Contractors</span>
                <div className="flex flex-col items-center mt-[1rem] lg:items-start gap-[1rem] w-full lg:w-[45%]">

                    <h2 className="text-[1.75rem] font-bold text-white text-center lg:text-start">Join the Contractor Zone</h2>
                    <p className="text-[1.125rem] font-medium text-white text-center lg:text-start">Not yet a member of Home Central’s Contractor Zone? Get your Contractor Zone username and password today! Enjoy access to tools designed specifically for contractors, builders, and commercial customers in Owego, Vestal, and Candor, NY.</p>
                    <Button variant="primary" size="large" ><Link href="/contact">Contact Us</Link></Button>
                </div>
            </div>
        </div>
    );
}