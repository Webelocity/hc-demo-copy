import Image from "next/image";
import QuoteRequestPopup from "@/components/Pages/HomePage/QuoteRequest/QuoteRequestPopup";

export default function StartProjectSection() {
  return (
    <div className="baseContainer py-[1.5rem] md:py-[3rem]">
      <div className="maxWidth relative rounded-[1rem] overflow-hidden lg:min-h-[400px] md:min-h-[360px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            className="object-cover"
            src="/assets/image/Paint/projection.svg"
            alt="Paint project background"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141153]/80 to-[#141153]/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-[1.5rem] max-w-full md:max-w-[46%] p-[1.5rem] md:p-[2.5rem]">
          <h2 className="text-[1.5rem] md:text-[2.5rem] font-bold text-white leading-[1.2] tracking-[0.02em]">
            Start Your Project with Confidence
          </h2>
          <p className="text-[1.125rem] font-normal text-[var(--Neutral-100)] leading-[1.5] tracking-[0.02em]">
            Ready to repaint your wall? Request a quote online or visit any Home
            Central location in Owego, Vestal, or Candor, NY.
          </p>
          <div>
            <QuoteRequestPopup
              dashboardUrl="https://customer.homecentralstores.com"
              triggerLabel="Request a Quote"
              triggerClassName="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
