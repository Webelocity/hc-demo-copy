"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="baseContainer py-[1.5rem]">
      <div
        className="relative w-full min-h-[25rem] rounded-[1rem] overflow-hidden flex items-center px-[1.5rem] md:px-[2.5rem] py-[2.5rem]"
        style={{
          background:
            "url('/assets/image/SpecialOrdering/hero-placeholder.svg') no-repeat center center",
        }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-[46.75rem]">
          <h1
            className="text-white font-bold leading-[1.2] tracking-[0.06rem] text-[2rem] md:text-[3rem]"
            style={{
              fontFamily: "var(--font-sora)",
            }}
          >
            Special Orders for Contractors
          </h1>
        </div>
      </div>
    </section>
  );
}
