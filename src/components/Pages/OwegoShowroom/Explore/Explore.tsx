import Image from "next/image";

export default function Explore() {
    return (
        <div className="baseContainer py-[2.5rem] flex flex-col md:flex-row  gap-[1.5rem] items-center justify-center ">
            <div className="flex-[1]">
                <Image className="!relative !w-full !h-full " src={"/assets/image/OwegoShowroom/kitchen.svg"} alt="explore" fill />
            </div>
            <div className="flex-[2] flex flex-col gap-[1rem] justify-between  h-[-webkit-fill-available]">
                <h1 className="text-[2.5rem] font-bold">Explore Our Showroom Displays</h1>
                <p className="text-[1.125rem] text-[var(--Neutral-700)]">Our showroom highlights a variety of premium products, including:</p>
                <div className="grid grid-cols-3 gap-[1rem]">
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/OwegoShowroom/icons/Bath.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Windows and doors</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/OwegoShowroom/icons/Garage.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Windows and doors</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/OwegoShowroom/icons/table.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Windows and doors</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/OwegoShowroom/icons/ThreeSquares.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Windows and doors</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/OwegoShowroom/icons/Widget.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Windows and doors</p>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem]">
                        <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                            <Image className="!relative !w-[2.5rem] !h-[2.5rem]" src="/assets/image/OwegoShowroom/icons/window.svg" alt="paint can" fill />
                        </div>
                        <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold">Windows and doors</p>
                    </div>
                </div>
                <div className="bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[0.5rem]">
                    Note: What we don’t display, we can source! The showroom is a collaborative space for contractors, vendors, and homeowners to find the right products for any project.
                </div>
            </div>
        </div>
    );
}