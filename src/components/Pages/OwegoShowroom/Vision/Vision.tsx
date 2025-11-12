import Image from "next/image";
import Link from "next/link";

export default function Vision() {
  return (
    <div className="flex flex-col md:flex-row gap-[2.5rem] baseContainer py-[2.5rem] ">
      <div className="flex-[1] relative">
        <Image
          className="!relative !w-[37rem] !h-[17rem] object-cover rounded-[var(--Radius-md)]"
          src="/assets/image/OwegoShowroom/Vision.svg"
          alt="owego-showroom"
          fill
        />
      </div>
      <div className="flex-[1.1] flex flex-col gap-[1rem]">
        <h2 className="text-[1.75rem] font-bold text-start">
          A Vision for the Southern Tier
        </h2>
        <p className="text-[var(--Neutral-700)] text-[1.125rem] font-normal text-start">
          The showroom was inspired by our late President, Katherine Whittemore,
          who envisioned a design hub serving the Owego community and the
          greater Southern Tier region. Housed in a beautifully renovated
          +100-year-old post-and-beam building, the showroom demonstrates a wide
          variety of building materials, helping{" "}
          <Link
            className="text-[var(--primary-500-main)] underline"
            href="/contractor-zone"
          >
            contractors
          </Link>{" "}
          and vendors confidently plan and execute projects.
        </p>
      </div>
    </div>
  );
}
