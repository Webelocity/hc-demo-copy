import Button from "@/components/shared/Button";
import QuoteRequestPopup from "../QuoteRequest/QuoteRequestPopup";

export default function Paint() {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
    return (
        <div className="baseContainer py-[2.5rem] ">
            <div className="p-[2.5rem] maxWidth flex flex-col gap-[1.5rem] aspect-[1352/288] bg-[url('/assets/image/HomePage/Paint.svg')] rounded-[var(--Radius-md)] bg-cover bg-center bg-no-repeat">
                <h1 className="text-[2.5rem] font-bold text-white text-center">
                    Customize Your Paint Mixing for the Perfect Color
                </h1>
                <p className="text-[1.125rem] font-normal text-[var(--Neutral-100)] text-center tracking-[0.36px]">
                    Our expert staff and advanced color-matching system can replicate any sample or adjust your favorite shade, ensuring your paint is exactly what you want for your project.
                </p>
                <div className="flex justify-center items-center gap-[1.5rem]">
                    <QuoteRequestPopup dashboardUrl={Customer_Dashboard_Url} />
                </div>
            </div>
        </div>
    )
}