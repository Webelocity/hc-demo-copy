import Image from "next/image";
import QuoteRequestPopup from "./QuoteRequestPopup";

export default function QuoteRequest() {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="maxWidth bg-[var(--secondary-500-main)] flex flex-col md:flex-row justify-between items-center gap-[1.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
                <div className="flex flex-col gap-[1.5rem] flex-[1.8] p-[2.5rem]">
                    <h3 className="text-[2.5rem] font-bold text-white text-center md:text-start">
                        Quote Request
                    </h3>
                    <p className="text-[1.125rem] font-normal text-white text-center md:text-start">
                        If you’re planning a renovation or a new construction, submit your project details and request a quote. Our team will provide a detailed quote with accurate estimates for the materials you need.                    </p>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center md:justify-start gap-[1.5rem]">
                        <QuoteRequestPopup dashboardUrl={Customer_Dashboard_Url} />
                    </div>
                </div>

                <div className="aspect-[3/2] min-h-[18.5rem] !relative  flex-1 rounded-[var(--Radius-md)] overflow-hidden">
                    <Image className="" src="/assets/image/HomePage/Quote.png" alt="quote-request" fill />
                </div>
            </div>
        </div>
    )
}