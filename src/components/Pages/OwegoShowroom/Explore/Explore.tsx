import Image from "next/image";

export default function Explore() {
  return (
    <div className="baseContainer">
      <div className="maxWidth  py-[1.5rem] flex flex-col md:flex-row gap-[2.5rem] items-stretch">
        <div className="relative w-full md:w-[28rem] h-[25rem] md:h-auto rounded-[var(--Radius-md)] overflow-hidden shrink-0">
          <Image
            className="!relative !w-full !h-full object-cover"
            src={"/assets/image/OwegoShowroom/kitchen.svg"}
            alt="explore"
            fill
          />
          <div className="absolute inset-0 bg-[rgba(24,20,100,0.55)] rounded-[var(--Radius-md)]" />
        </div>
        <div className="flex-1 flex flex-col gap-[1rem] min-w-0">
          <h1 className="text-[2.5rem] font-bold tracking-[0.05rem] leading-[1.2]">
            Explore Our Showroom Displays
          </h1>
          <p className="text-[1.125rem] text-[var(--Neutral-700)] tracking-[0.0225rem] leading-[1.5]">
            Our showroom highlights a variety of premium products, including:
          </p>
          <div className="flex flex-wrap gap-[1.25rem] w-full">
            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem] flex-1 min-w-[15.875rem]">
              <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                <Image
                  className="!relative !w-[2.5rem] !h-[2.5rem]"
                  src="/assets/image/OwegoShowroom/icons/window.svg"
                  alt="Windows and doors"
                  fill
                />
              </div>
              <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold tracking-[0.0225rem] leading-[1.2]">
                Windows and doors
              </p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem] flex-1 min-w-[15.875rem]">
              <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                <Image
                  className="!relative !w-[2.5rem] !h-[2.5rem]"
                  src="/assets/image/OwegoShowroom/icons/Bath.svg"
                  alt="Kitchen, bath, and shower displays"
                  fill
                />
              </div>
              <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold tracking-[0.0225rem] leading-[1.2]">
                Kitchen, bath, and shower displays
              </p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem] flex-1 min-w-[15.875rem]">
              <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                <Image
                  className="!relative !w-[2.5rem] !h-[2.5rem]"
                  src="/assets/image/OwegoShowroom/icons/table.svg"
                  alt="Hardwood and luxury vinyl tile options"
                  fill
                />
              </div>
              <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold tracking-[0.0225rem] leading-[1.2]">
                Hardwood and luxury vinyl tile options
              </p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem] flex-1 min-w-[15.875rem]">
              <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                <Image
                  className="!relative !w-[2.5rem] !h-[2.5rem]"
                  src="/assets/image/OwegoShowroom/icons/Garage.svg"
                  alt="Siding and millwork"
                  fill
                />
              </div>
              <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold tracking-[0.0225rem] leading-[1.2]">
                Siding and millwork
              </p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem] flex-1 min-w-[15.875rem]">
              <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                <Image
                  className="!relative !w-[2.5rem] !h-[2.5rem]"
                  src="/assets/image/OwegoShowroom/icons/ThreeSquares.svg"
                  alt="Interior and exterior railing"
                  fill
                />
              </div>
              <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold tracking-[0.0225rem] leading-[1.2]">
                Interior and exterior railing
              </p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[1rem] flex-1 min-w-[15.875rem]">
              <div className="bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[0.75rem]">
                <Image
                  className="!relative !w-[2.5rem] !h-[2.5rem]"
                  src="/assets/image/OwegoShowroom/icons/Widget.svg"
                  alt="Decking and more"
                  fill
                />
              </div>
              <p className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold tracking-[0.0225rem] leading-[1.2]">
                Decking and more!
              </p>
            </div>
          </div>
          <div className="bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] px-[1rem] py-[0.5rem] w-full">
            <p className="text-[1.125rem] text-[var(--Neutral-700)] tracking-[0.0225rem] leading-[1.5]">
              Note: What we don't display, we can source! The showroom is a
              collaborative space for contractors and homeowners to find
              the right products for any project.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
