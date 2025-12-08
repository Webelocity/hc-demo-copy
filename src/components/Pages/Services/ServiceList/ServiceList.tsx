import { services } from "@/Data/Services";
import Image from "next/image";
import Link from "next/link";
import QuoteRequestPopup from "@/components/Pages/HomePage/QuoteRequest/QuoteRequestPopup";

export default function ServiceList() {
  return (
    <div className="baseContainer bg-[var(--Secondary-50)]">
      <div className=" maxWidth  w-full py-[3rem] flex flex-col gap-[3rem]">
        <div className="flex flex-col w-full">
          <h1 className="text-[2.5rem] font-bold text-center text-black">
            Our Comprehensive Services
          </h1>
          <p className="text-[1.5rem] text-[var(--Neutral-500)] font-normal text-center">
            for Contractors & Homeowners
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.75rem]">
          {services.map((service, index) => (
            <div
              className="p-[1.5rem] flex flex-col gap-[1rem] bg-white rounded-[var(--Radius-md)]"
              key={index}
            >
              <div className="relative ">
                <Image
                  className="aspect-[381/303] !relative rounded-[var(--Radius-md)] "
                  src={service.imagePath}
                  alt="Service1"
                  fill
                />
                <div className="absolute bg-white left-0 bottom-0 translate-y-1/2 p-[0.75rem] rounded-[var(--Radius-md)]">
                  <Image
                    className="!relative "
                    src={service.icon}
                    alt="Service1"
                    fill
                  />
                </div>
              </div>
              <p className="text-[1.75rem] font-bold text-black mb-[0.5rem]">
                {service.title}
              </p>
              <p className="text-[1.25rem] text-[var(--Neutral-700)] font-normal">
                {service.description}
              </p>
              {service.ctaName === "Request a Quote" ? (
                <QuoteRequestPopup
                  dashboardUrl="https://customer.homecentralstores.com"
                  triggerVariant="link"
                  triggerLabel={service.ctaName}
                  triggerClassName="text-[1rem] text-[var(--primary-500-main)] w-fit  cursor-pointer"
                />
              ) : (
                <Link
                  href={service.ctaLink || ""}
                  className="text-[1rem] text-[var(--primary-500-main)] cursor-pointer"
                >
                  {service.ctaName}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
