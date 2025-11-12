"use client";

import Image from "next/image";

export default function CustomQuotesSection() {
  return (
    <section className="baseContainer">
      <div className="max-w-[84.5rem] mx-auto">
        <div 
          className="relative w-full rounded-[1rem] overflow-hidden flex flex-col md:flex-row gap-[1.5rem] md:gap-[2.5rem] items-center min-h-[20rem] md:h-[24.19rem] p-[1.5rem] md:p-0"
          style={{
            backgroundColor: 'var(--secondary-500-main)',
          }}
        >
          {/* Image on the left */}
          <div className="relative w-full md:w-[38.5rem] h-[15rem] md:h-full shrink-0">
            <Image
              src="/assets/image/SpecialOrdering/quotes-placeholder.svg"
              alt="Home Central Stores offers order quotes"
              fill
              className="object-cover rounded-[1rem]"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[1.5rem] md:pr-[2.5rem] flex-1">
            <h2 
              className="text-white font-bold leading-[1.2] tracking-[0.05rem] text-[1.75rem] md:text-[2.5rem]"
              style={{ 
                fontFamily: 'var(--font-sora)',
              }}
            >
              Custom Quotes for Your Project
            </h2>
            
            <p 
              className="text-[1rem] md:text-[1.125rem] leading-[1.5] tracking-[0.0225rem]"
              style={{
                color: 'var(--Neutral-100, #ededf0)',
                fontFamily: 'var(--font-figtree)',
              }}
            >
              Simply tell us what you need and how much, and we&apos;ll create a detailed special order quote with material quantities, costs, and bulk options. Our <span className="underline decoration-solid" style={{ textUnderlinePosition: 'from-font' }}>team</span> ensures your high-volume products and supplies are calculated accurately for your job.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

