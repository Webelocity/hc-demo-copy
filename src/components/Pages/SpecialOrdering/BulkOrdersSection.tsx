"use client";

import Button from "@/components/shared/Button";
import Image from "next/image";

export default function BulkOrdersSection() {
  return (
    <section className="baseContainer">
      <div className="maxWidth mx-auto">
        <div
          className="relative w-full rounded-[1rem] overflow-hidden flex flex-col md:flex-row gap-0 md:gap-[2.5rem] items-stretch min-h-[20rem] md:h-[24.19rem]"
          style={{
            backgroundColor: 'var(--primary-500-main)',
          }}
        >
          {/* Content */}
          <div className="flex flex-col gap-[1.5rem] p-[1.5rem] md:pl-[2.5rem] md:pr-0 md:py-0 flex-1 justify-center order-1 md:order-1">
            <h2
              className="text-white font-bold leading-[1.2] text-[1.5rem] md:text-[2.5rem]"
              style={{
                fontFamily: 'var(--font-sora)',
                letterSpacing: '0.03rem',
              }}
            >
              Bulk Orders & Job-Lot Quantities
            </h2>

            <p
              className="text-[1.125rem] leading-[1.5]"
              style={{
                color: 'var(--Neutral-100, #ededf0)',
                fontFamily: 'var(--font-figtree)',
                letterSpacing: '0.0225rem',
              }}
            >
              Our bulk order service makes it easy to get high-volume products at competitive pricing for your large projects. From lumber and hardware to specialized tools and supplies, we can handle large quantities for your construction or renovation projects.
            </p>

            <Button
              variant="secondary"
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: 'var(--Secondary-100)',
                '&:hover': {
                  backgroundColor: 'color-mix(in srgb, var(--Secondary-100) 85%, black)',
                }
              }}
            >
              Request a Quote
            </Button>
          </div>

          {/* Image on bottom for mobile, right for desktop */}
          <div className="relative w-full md:w-[38.5rem] h-[15.44rem] md:h-full shrink-0 order-2 md:order-2">
            <Image
              src="/assets/image/SpecialOrdering/bulk-orders-placeholder.svg"
              alt="Home Central Stores offers bulk orders services"
              fill
              className="object-cover md:rounded-[1rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

