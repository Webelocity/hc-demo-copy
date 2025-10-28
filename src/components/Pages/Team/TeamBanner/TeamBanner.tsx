export default function TeamBanner() {
  return (
    <div className="baseContainer py-[1.5rem]">
      <div
        className="min-h-[25rem] p-[1.5rem] md:p-[2.5rem] rounded-[var(--Radius-md)] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: "url('/assets/image/Team/landing.svg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(24,20,100,0.49)] rounded-[var(--Radius-md)]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-[2rem] items-center max-w-[45rem] text-center px-4">
          <h1 className="text-white font-bold text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.2] tracking-[0.06rem] font-[family-name:var(--font-sora)]">
            Home Central Stores Team
          </h1>
          <p className="text-white font-bold text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] leading-[1.2] tracking-[0.04rem] font-[family-name:var(--font-sora)]">
            Your Trusted Hardware Experts
          </p>
        </div>
      </div>
    </div>
  );
}
