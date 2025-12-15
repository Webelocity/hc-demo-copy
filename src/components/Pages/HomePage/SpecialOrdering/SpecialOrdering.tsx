import Image from "next/image";
import Link from "next/link";

export default function SpecialOrdering() {
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="maxWidth items-end bg-[var(--primary-500-main)] flex flex-col md:flex-row justify-between items-center gap-[1.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
                <div className="flex flex-col gap-[1.5rem] flex-[1.8] p-[2.5rem]">
                    <h3 className="text-[2.5rem] font-bold text-white text-center md:text-start">
                        Special Ordering Made Simple                    </h3>
                    <p className="text-[1.125rem] font-normal text-white text-center md:text-start">
                        Home Central offers Special Ordering for thousands of products and supplies for contractors and homeowners. Request a custom quote, enjoy bulk pricing, and let our team source exactly what your project needs.
                    </p>
                    <Link href="/special-ordering" className="text-[1.125rem] font-normal text-white text-center md:text-start">
                        Learn More
                    </Link>


                </div>

                <div className="aspect-[3/2] min-h-[18.5rem] !relative  flex-1 rounded-[var(--Radius-md)] overflow-hidden">
                    <Image src="/assets/image/HomePage/special_image.png" alt="quote-request" fill />

                </div>
            </div>
        </div>
    )
}