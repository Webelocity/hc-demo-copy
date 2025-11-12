"use client";

import Button from "@/components/shared/Button";
import Image from "next/image";

export default function MaterialsSection() {
  return (
    <section className="baseContainer">
      <div className="w-full mx-auto">
        <div
          className="relative w-full rounded-[1.5rem] p-[1.5rem] md:p-[2.5rem] overflow-hidden"
          style={{
            backgroundColor: "var(--Secondary-50)",
          }}
        >
          {/* Image on the right - hidden on mobile */}
          <div className="hidden lg:block absolute right-0 top-[-13rem] w-[25.56rem] h-[30.5rem] pointer-events-none z-10">
            <Image
              src="/assets/image/SpecialOrdering/materials-placeholder.svg"
              alt="Construction materials"
              fill
              className="object-cover rounded-[1rem]"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-full  flex flex-col gap-[2rem] md:gap-[2.56rem]">
            <div className="flex flex-col gap-[1.5rem]">
              <h2
                className="text-black font-bold leading-[1.2] tracking-[0.05rem] text-[1.75rem] md:text-[2.5rem]"
                style={{
                  fontFamily: "var(--font-sora)",
                }}
              >
                Get the Materials You Need
              </h2>

              <div
                className="text-[1rem] md:text-[1.125rem] leading-[1.5] tracking-[0.0225rem] max-w-3/4"
                style={{
                  color: "var(--Neutral-600, #555566)",
                  fontFamily: "var(--font-figtree)",
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
