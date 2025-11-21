import Button from "@/components/shared/Button";
import Image from "next/image";

export default function PerfectColorBanner() {
  return (
    <div className="baseContainer py-[1.5rem] md:py-[3rem]">
      <div className="relative maxWidth bg-[var(--Secondary-600)] rounded-[1.5rem] overflow-hidden min-h-[253px] md:min-h-[395px]">
        <div className="flex flex-col md:flex-row items-end justify-between relative">
          {/* Content Section */}
          <div className="flex flex-col gap-[1.5rem] max-w-full md:max-w-[46%] p-[1.5rem] md:p-[2.5rem] z-10 relative">
            <h2 className="text-[1.5rem] md:text-[2.5rem] font-bold text-white leading-[1.2] tracking-[0.02em]">
              Get the Perfect Color Match Every Time
            </h2>
            <p className="text-[1.125rem] font-normal text-[var(--Neutral-100)] leading-[1.5] tracking-[0.02em]">
              Bring us a sample color, and our experts will create a custom
              paint mix for your walls, cabinets, or trim. We ensure every shade
              is precise, even when repainting an old wall.
            </p>
            <div className="flex items-center justify-start">
              <Button size="large" variant="primary">
                Find a Location
              </Button>
            </div>
          </div>

          {/* Image Section - Absolutely positioned on desktop, stacked on mobile */}
          <div className="relative w-full md:w-[50%] md:absolute md:right-0 md:bottom-0 md:top-auto h-[253px] md:h-[395px] md:max-w-[594px]">
            <Image
              className="object-contain object-bottom md:object-right-bottom"
              src="/assets/image/Paint/paint.svg"
              alt="Paint color matching service"
              fill
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
