import Image from "next/image";

export default function WhyChoseSection() {
    return (
        <div className="baseContainer py-[2.5rem] flex flex-col md:flex-row gap-[2.5rem]">
            <div className="flex-[1] relative h-full">
                <Image className="rounded-[var(--Radius-md)] aspect-[488/608] !relative" src="/assets/image/Paint/girl.svg" alt="girl holding paint" fill />
            </div>
            <div className="flex-[1.7] flex flex-col gap-[1.5rem] ">
                <h2 className="text-[2.5rem] font-bold text-start">
                    Why Choose Home Central for Paint Matching?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] flex-1">
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/Paint/UserCheck.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Expert Staff</p>
                        <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">Our experienced team ensure accurate color matching and shading.</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/Paint/UserCheck.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Advanced Technology</p>
                        <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">Using our computerized color matching system, we precisely analyze every shade to create a perfect match.</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/Paint/UserCheck.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Custom Solutions for Every Project</p>
                        <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">Whether you’re painting a small accent wall or a whole home, we match colors to your exact specifications.</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/Paint/UserCheck.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Local Service You Can Trust</p>
                        <p className="text-[var(--Neutral-700)] text-[1rem] font-normal">Serving Owego, Vestal, and Candor, NY, we help homeowners and contractors achieve high-quality paint matching and mixing.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}