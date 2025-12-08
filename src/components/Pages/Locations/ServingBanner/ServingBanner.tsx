import Image from "next/image";
import Link from "next/link";

export default function ServingBanner() {
  return (
    <div className="baseContainer py-[2.5rem] ">
      <div className="maxWidth flex flex-col xl:flex-row gap-[3rem] p-[2.5rem] rounded-[var(--Radius-md)] bg-[var(--secondary-500-main)] relative pb-[26rem] xl:pb-[2.5rem]">
        <div className="flex-1">
          <p className="text-white text-[2rem] font-semibold">
            Serving Homeowners & Contractors Across the Southern Tier of New
            York
          </p>
        </div>
        <div className="flex-[2.2] flex flex-col gap-[1rem]">
          <div className="flex flex-col lg:flex-row gap-[1rem]">
            <div className="flex flex-col lg:flex-row  gap-[1rem]">
              <div className="flex flex-1 flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                  <Image
                    className="!relative !w-[2.5rem] !h-[2.5rem]"
                    src="/assets/image/Locations/locations_1.svg"
                    alt="paint can"
                    fill
                  />
                </div>
                <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">
                  24/7 Online Ordering
                </p>
                <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">
                  From lumber and decking to millwork, hardware, and specialty
                  tools, Home Central Stores carries everything you need for
                  your projects, including hardware, building materials, and
                  tools. We also offer{" "}
                  <Link
                    className="text-[var(--primary-500-main)] underline"
                    href={"/owego-showroom"}
                  >
                    {" "}
                    kitchen and bath{" "}
                  </Link>{" "}
                  materials, windows, doors, flooring, and siding, ensuring you
                  can access high-quality products for any job.{" "}
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                  <Image
                    className="!relative !w-[2.5rem] !h-[2.5rem]"
                    src="/assets/image/Locations/locations_3.svg"
                    alt="paint can"
                    fill
                  />
                </div>
                <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">
                  Expert Services for Every Project
                </p>
                <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">
                  Beyond products, we provide a variety of
                  <Link
                    className="text-[var(--primary-500-main)] underline"
                    href={"/services"}
                  >
                    {" "}
                    services
                  </Link>
                  , including:
                  <ul className="list-disc list-inside">
                    Delivery and job-site logistics
                    <li>Material cutting and pipe threading</li>
                    <li>Tool repair, sharpening, and rentals</li>
                    <li>Blueprint takeoffs and project estimating</li>
                    <li>Custom paint mixing and color matching</li>
                    <li>Lock re-keying and key cutting</li>
                    <li>Special ordering and sourcing assistance</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
            <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
              <Image
                className="!relative !w-[2.5rem] !h-[2.5rem]"
                src="/assets/image/Locations/locations_2.svg"
                alt="paint can"
                fill
              />
            </div>
            <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">
              Committed to Local Customers
            </p>
            <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">
              Whether working on a small renovation, a large construction
              project, or managing a business, Home Central Stores is your
              trusted partner in Owego, Vestal, and Candor, NY. Our
              knowledgeable staff, quality products, and reliable services make{" "}
              construction , renovation, and home improvement easy for{" "}
              <Link
                className="text-[var(--primary-500-main)] underline"
                href={"/contractor-zone"}
              >
                contractors
              </Link>{" "}
              and homeowners.{" "}
            </p>
          </div>
        </div>
        <Image
          src="/assets/image/Locations/contractor.png"
          alt="serving banner"
          fill
          className="lg:absolute !w-[37rem] !top-auto !h-auto aspect-[729/455] !bottom-0 !left-0 object-contain rounded-bl-[var(--Radius-md)]"
        />
      </div>
    </div>
  );
}
