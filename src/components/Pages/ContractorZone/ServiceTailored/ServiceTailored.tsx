import { contractorServices } from "@/Data/Services";
import Image from "next/image";
import Link from "next/link";

export default function ServiceTailored() {
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="flex flex-col items-center gap-[1.5rem] bg-[var(--Teritary-100)] rounded-[var(--Radius-md)] p-[2.5rem]">
                <div className="flex flex-col items-center">
                    <p className="text-[2.5rem] font-bold">Services Tailored to the Pro</p>
                    <p className="text-[1.5rem] text-[var(--Neutral-500)]">Contractors, Builders & Commercial Customers</p>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.75rem]">
                    {contractorServices.map((service, index) => (
                        <div key={index} className="p-[1.5rem] flex flex-col gap-[1rem] bg-white rounded-[var(--Radius-md)]" >
                            <div className="relative ">
                                <Image className="aspect-[381/303] !relative rounded-[var(--Radius-md)] " src={service.imagePath} alt="Service1" fill />
                                <div className="absolute bg-white left-0 bottom-0 translate-y-1/2 p-[0.75rem] rounded-[var(--Radius-md)]">
                                    <Image className="!relative " src={service.icon} alt="Service1" fill />
                                </div>
                            </div>
                            <p className="text-[1.75rem] font-bold text-black mb-[0.5rem]">{service.title}</p>
                            <p className="text-[1.25rem] text-[var(--Neutral-700)] font-normal">{service.description}</p>
                            {service.ctaLink && <Link href={service.ctaLink} className="text-[1rem] text-[var(--primary-500-main)] cursor-pointer">{service.ctaName}</Link>}
                        </div>
                    ))}
                </div>


            </div>

        </div>
    );
}