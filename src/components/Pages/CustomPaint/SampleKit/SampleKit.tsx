import Button from "@/components/shared/Button";
import Image from "next/image";

export default function SampleKit() {
    return (
        <div className="baseContainer py-[1.5rem] md:py-[3rem]">
            <div className="flex flex-col md:flex-row bg-[var(--primary-500-main)] rounded-[1rem]">
                {/* Image Section */}
                <div className="w-full md:w-[45%] relative h-[174px] md:h-auto md:min-h-[387px] rounded-t-[1rem] md:rounded-t-none md:rounded-l-[1rem] overflow-hidden">
                    <Image 
                        className="object-cover" 
                        src="/assets/image/Paint/sample.svg" 
                        alt="Paint color sample kit" 
                        fill
                        priority
                    />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-[1.5rem] md:p-[2.5rem] flex flex-col gap-[1.5rem]">
                    <h2 className="text-[1.5rem] md:text-[2.5rem] text-white font-bold leading-[1.2] tracking-[0.02em]">
                        Create Your Own Color Sample Kit
                    </h2>
                    <p className="text-[var(--Neutral-100)] text-[1.125rem] font-normal leading-[1.5] tracking-[0.02em]">
                        Test your paint color before you buy! Our sample kit costs just $7 and includes a $7 coupon toward a gallon of paint. Plus, get $50 in coupons for everyday paint supplies. Stop by today and start experimenting with confidence!
                    </p>
                    <div>
                        <Button variant="secondary" size="large">
                            Find a Location
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}