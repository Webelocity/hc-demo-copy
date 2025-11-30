import Image from "next/image";

export default function CommunityContributions() {
  const contributions = [
    {
      name: "Boys & Girls Clubs of America",
      logo: "/assets/image/AboutUs/bgca.svg",
    },
    {
      name: "Tioga Arts Council",
      logo: "/assets/image/AboutUs/tac.svg",
    },
    {
      name: "United Way",
      logo: "/assets/image/AboutUs/uw.svg",
    },
    {
      name: "Tioga County Historical Society",
      logo: "/assets/image/AboutUs/tchs.svg",
    },
  ];

  return (
    <div className="baseContainer py-[3rem]">
      <div className="maxWidth bg-[var(--Teritary-100)] flex gap-[1rem] items-end overflow-hidden p-[2.5rem] rounded-[1rem] w-full">
        <div className="flex flex-col lg:flex-row  items-center justify-center w-full">
          {/* Title */}
          <h2 className="text-[2.5rem] font-bold text-black text-center xl:text-left leading-[1.2] tracking-[0.05rem] w-[24.8125rem] shrink-0">
            Home Central's Contributions to Our Community
          </h2>

          {/* Community Organizations */}
          <div className=" flex-1 px-0 py-[1rem] rounded-[var(--Radius-md)]">
            <div className="flex gap-[1rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center justify-center w-full">
              {contributions.map((contribution, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-[1rem] items-center justify-center flex-1 min-w-[12.8125rem] p-[1rem] rounded-[var(--Radius-md)]"
                >
                  <div className="h-[7.4375rem] w-full relative">
                    <Image
                      src={contribution.logo}
                      alt={contribution.name}
                      fill
                      className="object-contain"
                    />
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
