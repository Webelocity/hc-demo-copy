import Button from "@/components/shared/Button";
import Image from "next/image";

export default function SampleKit() {
    return (
        <div className=" baseContainer py-[2.5rem] ">
            <div className="flex flex-col md:flex-row  rounded-[var(--Radius-md)]">
                <div className="flex-[1] relative bg-[var(--primary-500-main)] rounded-t-[var(--Radius-md)] md:rounded-t-none   md:rounded-tl-[var(--Radius-md)] md:rounded-bl-[var(--Radius-md)]">
                    <Image className="!aspect-[616/387] !relative object-cover" src="/assets/image/Paint/sample.svg" alt="Sample Kit" fill />
                </div>
                <div className="flex-[1.1] p-[2.5rem] flex flex-col gap-[1.5rem] bg-[var(--primary-500-main)] rounded-b-[var(--Radius-md)] md:rounded-b-none md:rounded-tr-[var(--Radius-md)] md:rounded-br-[var(--Radius-md)]">
                    <p className="text-[2.5rem] text-white font-bold text-start w-full md:w-[80%]">Create Your Own Color Sample Kit</p>
                    <p className="text-[var(--Neutral-100)] text-[1.125rem] font-normal">Test your paint color before you buy! Our sample kit costs just $7 and includes a $7 coupon toward a gallon of paint. Plus, get $50 in coupons for everyday paint supplies. Stop by today and start experimenting with confidence!</p>
                    <Button variant="secondary" className="w-fit">
                        Find a Location
                    </Button>
                </div>
            </div>

        </div>
    );
}