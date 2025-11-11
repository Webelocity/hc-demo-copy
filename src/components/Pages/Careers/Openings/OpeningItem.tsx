import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";

export default function OpeningItem() {
  return (
    <div className="flex-[1] p-[1.5rem] flex flex-col gap-[1rem] border-[var(--Colors-Neutral-100)] border rounded-[var(--Radius-md)]">
      <span className="text-[1.25rem] text-[var(--primary-500-main)] font-bold text-start">
        Building Material Estimator
      </span>
      <span className="text-[var(--Neutral-700)] line-clamp-3">
        Delivery drivers are expected to maintain a positive representation of
        Home Central both on the road and off. The main task of a delivery
        driver is to provide timely delivery of customers' orders and provide
        setup and operational instructions to the customer as needed. They
        should also provide an outstanding customer service experience
        consistent with company values. Their job will include, but is not
        limited to, the following responsibilities.
      </span>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-[1.5rem]">
          <span className="flex gap-[0.5rem] items-center">
            <SlLocationPin className="text-2xl" />

            <p className="text-[var(--Neutral-700)]">Owego</p>
          </span>
          <span className="flex gap-[0.5rem] items-center">
            <Image
              className="!relative !w-[1.5rem] !h-[1.5rem]"
              src="/assets/image/Careers/icons/Calendar.svg"
              alt="Calendar"
              fill
            />

            <p className="text-[var(--Neutral-700)]">Owego</p>
          </span>
        </div>
        <Link href="/careers/apply">
          <Button variant="primary" className="w-fit">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
