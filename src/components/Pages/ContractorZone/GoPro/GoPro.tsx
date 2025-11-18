import Image from "next/image";

export default function GoPro() {
    return (
        <div className="baseContainer" >
            <div className="maxWidth  py-[2.5rem] flex flex-col md:flex-row gap-[2.5rem]">
                <div className="flex-[1] relative h-full">
                    <Image className="rounded-[var(--Radius-md)] aspect-[448/406] !relative" src="/assets/image/ContractorZone/GOPro.svg" alt="Engineers Professional" fill />
                </div>
                <div className="flex-[1.7] flex flex-col gap-[1.5rem] ">
                    <h2 className="text-[2.5rem] font-bold text-start">
                        GoPro – Streamlined Ordering for Contractors                </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] flex-1">
                        <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                            <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                                <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/ContractorZone/Filters.svg" alt="paint can" fill />
                            </div>
                            <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">24/7 Online Ordering</p>
                            <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">
                                With GoPro system, professional customers can place high-volume orders anytime, anywhere. Powered by ToolSwift, the platform connects directly to our in-store computer system, ensuring your order information and pricing is always accurate and up-to-date.                            </p>
                        </div>
                        <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                            <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                                <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/ContractorZone/Subtract.svg" alt="paint can" fill />
                            </div>
                            <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Bulk & Special Orders</p>
                            <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">
                                Whether you need lumber, hardware, or building materials in bulk, our Contractor Zone make it easy to place large or volume orders efficiently.                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}