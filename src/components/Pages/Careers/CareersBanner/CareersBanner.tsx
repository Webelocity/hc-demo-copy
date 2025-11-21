import Button from "@/components/shared/Button";
import Link from "next/link";

export default function CareersBanner() {
  return (
    <div className="baseContainer py-[2.5rem]">
      <div className="h-[25rem] maxWidth p-[2.5rem] rounded-[var(--Radius-md)] flex flex-col items-start justify-center bg-[url('/assets/image/Careers/careers.svg')] bg-cover bg-center bg-no-repeat">
        <span className="w-full text-[var(--Secondary-600)] font-bold text-[3rem]">
          Home Central Stores{" "}
          <p className="inline text-[var(--primary-500-main)]">Careers</p>
        </span>
        <span className="text-[var(--Secondary-600)] text-[1.75rem] font-bold">
          Join Our{" "}
          <p className="inline text-[var(--primary-500-main)]">Team </p> in
          Owego, Vestal & Candor, NY
        </span>
        <Link href="/careers/apply">
          <Button variant="primary" className="!mt-[2rem]" size="large">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
