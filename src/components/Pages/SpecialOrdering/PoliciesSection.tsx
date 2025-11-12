"use client";

export default function PoliciesSection() {
  return (
    <section className="baseContainer w-full">
      <div className="w-full mx-auto">
        <div
          className="w-full rounded-[1.5rem] p-[1.5rem] md:p-[2.5rem]"
          style={{
            backgroundColor: "var(--Teritary-100)",
          }}
        >
          <div className="flex flex-col gap-[1.5rem]">
            <h2
              className="text-black font-bold leading-[1.2] tracking-[0.05rem] text-[1.75rem] md:text-[2.5rem]"
              style={{
                fontFamily: "var(--font-sora)",
              }}
            >
              Special Order Policies
            </h2>

            <div
              className="text-[1rem] md:text-[1.125rem] leading-[1.5] tracking-[0.0225rem]"
              style={{
                color: "var(--Neutral-700, #444452)",
                fontFamily: "var(--font-figtree)",
              }}
            >
              <p className="mb-0">
                To make sure everyone has a clear understanding of the process,
                some special orders have conditions.
              </p>
              <p className="mb-0">
                Some special order returns are subject to a 15% restocking fee.
              </p>
              <p className="mb-0">
                Cancellations may also incur a 15% restocking fee.
              </p>
              <p className="mb-0">
                Most custom-made products cannot be returned or exchanged unless
                defective.
              </p>
              <p className="mb-0">
                Our goal is to make special ordering hassle-free while providing
                access to materials and products you can&apos;t find anywhere
                else
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
