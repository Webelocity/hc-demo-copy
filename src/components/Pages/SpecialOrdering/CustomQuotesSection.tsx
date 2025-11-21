"use client";

import Image from "next/image";

export default function CustomQuotesSection() {
  return (
    <section className="baseContainer">
      <div className="w-full maxWidth ">
        <div
          className="relative w-full rounded-[1rem] overflow-hidden flex flex-col md:flex-row gap-0 md:gap-[2.5rem] items-stretch min-h-[20rem] md:h-[24.19rem]"
          style={{
            backgroundColor: "var(--secondary-500-main)",
          }}
        >
          {/* Image on top for mobile, left for desktop */}
          <div className="relative w-full md:w-[38.5rem] h-[19.375rem] md:h-full shrink-0">
            <Image
              src="/assets/image/SpecialOrdering/quotes-placeholder.svg"
              alt="Home Central Stores offers order quotes"
              fill
              className="object-cover md:rounded-[1rem]"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[1.5rem] p-[1.5rem] md:pr-[2.5rem] md:py-0 md:pl-0 flex-1 justify-center">
            <h2
              className="text-white font-bold leading-[1.2] text-[1.5rem] md:text-[2.5rem]"
              style={{
                fontFamily: "var(--font-sora)",
                letterSpacing: "0.03rem",
              }}
            >
              Custom Quotes for Your Project
            </h2>

            <p
              className="text-[1.125rem] leading-[1.5]"
              style={{
                color: "var(--Neutral-100, #ededf0)",
                fontFamily: "var(--font-figtree)",
                letterSpacing: "0.0225rem",
              }}
            >
              Simply tell us what you need and how much, and we&apos;ll create a
              detailed special order quote with material quantities, costs, and
              bulk options. Our{" "}
              <span
                className="underline decoration-solid"
                style={{ textUnderlinePosition: "from-font" }}
              >
                team
              </span>{" "}
              ensures your high-volume products and supplies are calculated
              accurately for your job.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
