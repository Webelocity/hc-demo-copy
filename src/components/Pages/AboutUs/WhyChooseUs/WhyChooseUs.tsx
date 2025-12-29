import Image from "next/image";

export default function WhyChooseUs() {
  const vendors = [
    {
      logo: "/assets/image/AboutUs/doitbest.svg",
      title: "DoItBest",
      description:
        "Do it Best, in collaboration with Home Central Stores, provides independent LBM dealers with innovative digital tools to support professional contractor customers.",
    },
    {
      logo: "/assets/image/AboutUs/lbm-advantage.svg",
      title: "LBM Advantage",
      description:
        "Home Central Stores is proud to be part of LBM Advantage – a cooperative that serves nearly a thousand independent retail stores, giving us access to over 250 vendors, with tens of thousands of lumber and building materials products.",
    },
    {
      logo: "/assets/image/AboutUs/true-value.svg",
      title: "True Value",
      description:
        "A buying cooperative that services approximately 4,000 stores worldwide, giving contractors and homeowners access to the more than 70,000 in-stock items with thousands of vendors.",
    },
    {
      logo: "/assets/image/AboutUs/additional.svg",
      title: "Additional Vendors",
      description:
        "We also purchase through several other cooperatives and wholesalers, including:\n• Reserve Supply of Central New York\n• NECO Alliance",
    },
  ];

  const partners = [
    {
      name: "Northeast Retail Lumber Association",
      logo: "/assets/image/AboutUs/nrla.svg",
    },
    {
      name: "North American Retail Hardware Association",
      logo: "/assets/image/AboutUs/narh.svg",
    },
    {
      name: "Tioga County Chamber of Commerce",
      logo: "/assets/image/AboutUs/tccc.svg",
    },
    {
      name: "National Federation of Independent Business",
      logo: "/assets/image/AboutUs/nfib.svg",
    },
    {
      name: "Candor Chamber of Commerce",
      logo: "/assets/image/AboutUs/ccc.svg",
    },

    {
      name: "NY Farm Bureau",
      logo: "/assets/image/AboutUs/nfb.svg",
    },
    {
      name: "Greater Binghamton Chamber of Commerce",
      logo: "/assets/image/AboutUs/gbcc.svg",
    },
  ];

  return (
    <div className="baseContainer py-[3rem] ">
      <div className=" maxWidth flex flex-col gap-[1rem] items-start p-[2.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]">
        {/* Main Title */}
        <h2 className="text-[2.5rem] font-bold text-black leading-[1.2] tracking-[0.05rem] w-full">
          Why Choose Us
        </h2>

        {/* Purchasing Advantages & Affiliations Section */}
        <div className="bg-[var(--secondary-500-main)] flex gap-[1rem] items-end p-[1.5rem] rounded-[var(--Radius-md)] w-full">
          <div className="flex flex-col gap-[1.5rem] items-start justify-center min-w-[19.125rem] px-0 py-[1rem] rounded-[var(--Radius-md)] shrink-0 w-full">
            {/* Title and Description */}
            <div className="flex flex-col gap-[1rem] items-start w-full">
              <h3 className="text-[2rem] font-bold text-white leading-[1.2] tracking-[0.04rem] w-full">
                Purchasing Advantages & Affiliations
              </h3>
              <p className="text-[1rem] text-[var(--Secondary-50)] leading-[1.5] tracking-[0.02rem] w-full">
                Our three-store footprint may seem small compared to big-box
                retailers, but our cooperative partnerships give us national
                purchasing power. By collaborating with thousands of stores, our
                buying department secures competitively priced hardware and
                building materials. Whether you're sourcing a single tool, a
                roll of tape, or a complete house package, Home Central Stores
                helps contractors and homeowners save—every time.
              </p>
            </div>

            {/* Vendors Grid */}
            <div className="flex flex-wrap gap-[1rem] items-stretch w-full">
              {vendors.map((vendor, index) => (
                <div
                  key={index}
                  className="bg-[rgba(255,255,255,0.15)] flex-1 flex flex-col gap-[1rem] min-w-[14.75rem] min-h-[27.9375rem] h-full p-[1rem] rounded-[var(--Radius-md)]"
                >
                  {/* Logo */}
                  <div className="h-[7.4375rem] w-full relative">
                    <Image
                      src={vendor.logo}
                      alt={vendor.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-[1rem] items-start w-full">
                    <div className="flex gap-[0.5rem] items-center justify-center w-full">
                      <h4 className="flex-1 text-[1.25rem] font-bold text-white leading-[1.2] tracking-[0.025rem]">
                        {vendor.title}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-[1rem] items-start w-full">
                      <div className="flex flex-col gap-[0.5rem] items-center justify-center w-full">
                        <p className="text-[1.125rem] text-[var(--Primary-50)] leading-[1.5] tracking-[0.0225rem] w-full whitespace-pre-line">
                          {vendor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Home Central Local & National Relationships Section */}
        <div className="bg-[var(--Secondary-100)] flex flex-col gap-[1rem] items-end p-[1.5rem] rounded-[1rem] w-full">
          <div className="flex flex-col gap-[1.5rem] items-start justify-center min-w-[19.125rem] px-0 py-[1rem] rounded-[var(--Radius-md)] shrink-0 w-full">
            {/* Title */}
            <h3 className="text-[2rem] font-bold text-[#100d43] leading-[1.2] tracking-[0.04rem] w-full">
              Home Central Local & National Relationships
            </h3>

            {/* Partners Grid */}
            <div className="flex flex-wrap gap-[1rem] items-start w-full">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-[rgba(255,255,255,0.15)] flex-1 flex flex-col gap-[1rem] items-start min-h-[16.375rem] min-w-[15.125rem] p-[1rem] rounded-[var(--Radius-md)]"
                >
                  {/* Logo */}
                  <div className="h-[7.4375rem] w-full relative">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-[1rem] items-start w-full">
                    <div className="flex gap-[0.5rem] items-center justify-center w-full">
                      <p className="flex-1 text-[1.125rem] font-semibold text-black text-center leading-[1.2] tracking-[0.0225rem]">
                        {partner.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
