import Button from "@/components/shared/Button";
import Image from "next/image";

export default function QuoteRequest() {
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="maxWidth bg-[var(--secondary-500-main)] flex flex-col md:flex-row justify-between items-center gap-[1.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
                <div className="flex flex-col gap-[1.5rem] flex-[1.8] p-[2.5rem]">
                    <h3 className="text-[2.5rem] font-bold text-white text-center md:text-start">
                        Quote Request
                    </h3>
                    <p className="text-[1.125rem] font-normal text-white text-center md:text-start">
                        Our expert staff and advanced color-matching system can replicate any sample or adjust your favorite shade, ensuring your paint is exactly what you want for your project.
                    </p>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center md:justify-start gap-[1.5rem]">
                        <Button size="large" variant="primary">Request a Quote</Button>
                        <span className="text-[1rem] cursor-pointer text-white text-center md:text-start">Get More Services</span>
                    </div>
                </div>

                <div className="aspect-[3/2] min-h-[18.5rem] !relative  flex-1 ">
                    <Image className=" " src="/assets/image/HomePage/Quote.svg" alt="quote-request" fill />
                </div>
            </div>

        </div>
    )
}