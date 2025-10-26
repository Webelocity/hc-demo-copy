export default function AboutUsBanner() {
  return (
    <div className="baseContainer flex flex-col gap-[1.5rem] items-center justify-end p-[1.5rem]">
      <div className="min-h-[25rem] max-w-[84.5rem] w-full p-[1.5rem] rounded-[var(--Radius-md)] flex items-center justify-center bg-[url('/assets/image/AboutUs/banner.svg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] rounded-[var(--Radius-md)]" />

        <div className="flex flex-col gap-[2rem] items-start max-w-[84.5rem] relative w-[47.4375rem]">
          <h1 className="text-[3rem] text-white font-bold leading-[1.2] tracking-[0.06rem] w-full">
            About Home Central Stores
          </h1>
        </div>
      </div>
    </div>
  );
}
