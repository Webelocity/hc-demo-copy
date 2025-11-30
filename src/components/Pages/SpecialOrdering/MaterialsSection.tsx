"use client";

import Button from "@/components/shared/Button";
import Image from "next/image";

export default function MaterialsSection() {
  return (
    <section >
      <div className="w-full baseContainer">
        <div
          className="relative maxWidth w-full rounded-[1.5rem]  pb-[1.5rem] md:p-[2.5rem] overflow-hidden"
          style={{
            backgroundColor: "var(--Secondary-50)",
          }}
        >
          {/* Image on top for mobile, positioned absolutely on desktop */}
          <div className="relative lg:absolute lg:right-0 lg:top-[-13rem] w-full lg:w-[25.56rem] h-[12.94rem] lg:h-[30.5rem] mb-[1.5rem] lg:mb-0 pointer-events-none z-10 rounded-[1rem] overflow-hidden">
            <Image
              src="/assets/image/SpecialOrdering/materials-placeholder.svg"
              alt="Construction materials"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-full flex flex-col gap-[2rem] md:gap-[2.56rem]">
            <div className="flex flex-col gap-[1.5rem]">
              <h2
                className="text-black font-bold leading-[1.2] text-[1.5rem] md:text-[2.5rem]"
                style={{
                  fontFamily: "var(--font-sora)",
                  letterSpacing: "0.03rem",
                }}
              >
                Get the Materials You Need
              </h2>

              <div
                className="text-[1.125rem] leading-[1.5] max-w-full lg:max-w-[75%]"
                style={{
                  color: "var(--Neutral-600, #555566)",
                  fontFamily: "var(--font-figtree)",
                  letterSpacing: "0.0225rem",
                }}
              >
                <p className="mb-0">
                  Request hard-to-find items, unique materials, or products not
                  normally stocked.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="mb-0">
                  Our experienced team will source materials, handle job-lot
                  quantities, and ensure you get the right products for your
                  project — saving you time and shipping fees.
                </p>
              </div>

              <Button variant="primary" sx={{ alignSelf: "flex-start" }}>
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
