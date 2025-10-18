import Button from "@/components/shared/Button";
import Image from "next/image";

export default function PerfectColorBanner() {
    return (
        <div className="baseContainer py-[2.5rem] ">
            <div className="!relative w-[60%]  bg-[var(--secondary-500-main)] flex flex-col md:flex-row justify-between items-center gap-[2.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
                <div className="flex flex-col gap-[1.5rem] flex-1  p-[2.5rem]">
                    <h3 className="text-[2.5rem] font-bold text-white text-center md:text-start">
                        Get the Perfect Color Match Every Time                    </h3>
                    <p className="text-[1.125rem] font-normal text-white text-center md:text-start">
                        Bring us a sample color, and our experts will create a custom paint mix for your walls, cabinets, or trim. We ensure every shade is precise, even when repainting an old wall.                    </p>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center md:justify-start gap-[1.5rem]">
                        <Button size="large" variant="primary">Find a Location</Button>
                    </div>
                </div>
                <div className="flex-1">

                </div>
                <Image className="!relative md:!absolute aspect-[594/395] !right-[0] !top-[-5rem] !left-auto  !w-[37rem] !h-[24rem] " src="/assets/image/Paint/paint.svg" alt="quote-request" fill />
            </div>

        </div>
    );
}