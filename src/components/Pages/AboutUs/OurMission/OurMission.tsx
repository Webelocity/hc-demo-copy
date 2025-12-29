import Image from "next/image";

export default function OurMission() {
  return (
    <div className="bg-white baseContainer flex items-center justify-center rounded-[1.5rem] w-full">
      <div className=" maxWidth py-[3rem]">
        <div className=" flex flex-col lg:flex-row flex-wrap gap-[1.25rem] items-stretch rounded-[var(--Radius-md)] w-full">
          {/* Text Content */}
          <div className="bg-[var(--Secondary-50)] w-full lg:flex-1 lg:min-w-[26.5625rem] flex flex-col gap-[1.5rem] p-[1.5rem] rounded-[var(--Radius-md)] h-[19rem]">
            <h2 className="text-[2.5rem] font-bold text-black leading-[1.2] tracking-[0.05rem]">
              Our Mission
            </h2>
            <p className="text-[1.125rem] text-[var(--Neutral-700)] leading-[1.5] tracking-[0.0225rem]">
              At Home Central Stores, our mission is to provide contractors and
              homeowners with high-quality hardware, building supplies, and expert
              support across Owego, Vestal, and Candor, NY. We combine
              exceptional service, local knowledge, and exclusive rewards to
              help professionals complete projects efficiently and
              cost-effectively.
            </p>
          </div>

          {/* Image */}
          <div className="w-full lg:flex-1 lg:min-w-[26.5625rem] h-[18.8125rem] relative rounded-[var(--Radius-md)] overflow-hidden">
            <Image
              className="object-cover"
              src="/assets/image/AboutUs/mission.svg"
              alt="Home Central Stores Mission"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
