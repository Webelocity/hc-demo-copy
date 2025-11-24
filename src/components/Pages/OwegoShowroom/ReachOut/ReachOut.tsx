import Map from "@/components/shared/ContactUs/Map/Map";
import { STORES } from "@/util/shedule";
import Image from "next/image";


export default function ReachOut() {
  const owegoShowroomLocation = STORES["owego-showroom"];
  return (
    <div className="baseContainer py-[2.5rem] ">
      <div className="maxWidth flex flex-col md:flex-row gap-[2.5rem] p-[1.5rem] md:p-[2.5rem] bg-[var(--primary-500-main)] rounded-[var(--Radius-md)]">
        <div className="flex-[1] flex flex-col gap-[1rem]">
          <h3 className="text-[2.5rem] text-white font-bold text-start">
            Reach Out to Our Showroom & Design Center
          </h3>
          <Image
            className="!relative object-contain !w-[38.5rem] !h-[28.5rem] rounded-[var(--Radius-md)]"
            src="/assets/image/OwegoShowroom/owegoVisit.svg"
            alt="reach-out"
            fill
          />
        </div>
        <div className="flex-[1] flex flex-col gap-[1.5rem] p-[1.5rem] bg-[var(--Primary-400)] rounded-[var(--Radius-md)]">
          <p className="text-[1.75rem] text-white font-normal text-start">
            Visit Us
          </p>
          <Map size="small" customLocation={owegoShowroomLocation} />
          <div className="flex flex-col ">
            <div className="flex items-center gap-[0.25rem]">
              <Image
                className="!relative !w-[1.25rem] !h-[1.25rem]"
                src="/assets/image/OwegoShowroom/location.svg"
                alt="location"
                fill
              />
              <p className="text-[1.125rem] text-white font-semibold text-start">
                Address
              </p>
            </div>
            <p className="text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
              133 Central Ave, Owego, NY
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-[0.25rem]">
              <Image
                className="!relative !w-[1.25rem] !h-[1.25rem]"
                src="/assets/image/OwegoShowroom/time.svg"
                alt="location"
                fill
              />
              <p className="text-[1.125rem] text-white font-semibold text-start">
                Opening Hours
              </p>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <p className="text-[0.875rem] font-bold text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
                Monday – Friday:
              </p>
              <p className="text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
                9:00 AM – 5:00 PM
              </p>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <p className="text-[0.875rem] font-bold text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
                Saturday
              </p>
              <p className="text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
                9:00 AM – 3:00 PM
              </p>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <p className="text-[0.875rem] font-bold text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
                Evenings by appointment:
              </p>
              <p className="text-[var(--Secondary-50)] text-[var(--Secondary-50)]">
                call 607-223-2360
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
