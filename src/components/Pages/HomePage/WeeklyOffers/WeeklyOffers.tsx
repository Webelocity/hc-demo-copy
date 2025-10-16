import Button from "@/components/shared/Button";
import Image from "next/image";

export default function WeeklyOffers() {
    return (
        <div className="w-full baseContainer flex flex-col align-center  py-[2.5rem] gap-[3rem]">
            <div className="flex justify-between items-center w-full">
                <p className="text-[2.5rem] font-bold">Weekly Offers</p>
                <Button variant="secondary">View All</Button>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-[1.5rem] items-center items-stretch">
                <div className="flex-1 p-[1.5rem] justify-between flex gap-[3rem] bg-[var(--secondary-500-main)] rounded-[var(--Radius-md)]">
                    <div className="flex flex-col gap-[0.75rem]  ">
                        <p className="text-[var(--Neutral-100)] text-normal font-semibold">Best Deal</p>
                        <p className="text-[1.5rem] text-white font-bold">Buy One, Get One 50% Off</p>
                        <div className="w-fit">
                            <Button variant="secondary">View Products</Button>
                        </div>
                    </div>
                    <div className="relative w-[12.5rem] h-[8.125rem] ">
                        <Image src="assets/image/HomePage/weekly_offer_1.svg" alt="Machine" fill />
                    </div>
                </div>
                <div className="flex-1 p-[1.5rem] justify-between flex gap-[3rem] bg-[var(--primary-500-main)] rounded-[var(--Radius-md)]">
                    <div className="flex flex-col gap-[0.75rem] ">
                        <p className="text-[var(--Neutral-100)] text-normal font-semibold">Best Deal</p>
                        <p className="text-[1.5rem] text-white font-bold">Buy One, Get One 50% Off</p>
                        <div className="w-fit">
                            <Button variant="secondary">View Products</Button>
                        </div>
                    </div>
                    <div className="relative w-[12.5rem] h-[8.125rem] ">
                        <Image src="assets/image/HomePage/weekly_offer_1.svg" alt="Machine" fill />
                    </div>
                </div>
            </div>
        </div >
    );
}