import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import type { StrapiCareer } from "@/lib/strapi";
import { useRouter } from "next/navigation";

interface OpeningItemProps {
  career: StrapiCareer;
}

export default function OpeningItem({ career }: OpeningItemProps) {
  const { documentId, Job_Name, Job_Description, Job_Location, employmentType } = career;
  const router = useRouter();
  return (
    <div
      className="flex-[1] p-[1.5rem] flex flex-col gap-[1rem] border-[var(--Colors-Neutral-100)] border rounded-[var(--Radius-md)] cursor-pointer"
      onClick={() => router.push(`/careers/${documentId}`)}
    >
      <span className="text-[1.25rem] text-[var(--primary-500-main)] font-bold text-start">
        {Job_Name}
      </span>
      <span className="text-[var(--Neutral-700)] line-clamp-3">
        {Job_Description}
      </span>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-[1.5rem]">
          {Job_Location && (
            <span className="flex gap-[0.5rem] items-center">
              <SlLocationPin className="text-2xl" />
              <p className="text-[var(--Neutral-700)]">{Job_Location}</p>
            </span>
          )}
          {employmentType && (
            <span className="flex gap-[0.5rem] items-center">
              <Image
                className="!relative !w-[1.5rem] !h-[1.5rem]"
                src="/assets/image/Careers/icons/Calendar.svg"
                alt="Calendar"
                fill
              />
              <p className="text-[var(--Neutral-700)]">{employmentType}</p>
            </span>
          )}
        </div>
        <Link href={`/careers/apply?job=${encodeURIComponent(Job_Name)}`}>
          <Button variant="primary" className="w-fit">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
