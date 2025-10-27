import React from "react";

interface PolicyBannerProps {
  title: string;
}

export default function PolicyBanner({ title }: PolicyBannerProps) {
  return (
    <div className="flex flex-col gap-[1.5rem] items-center justify-end p-[1.5rem] w-full">
      <div className="bg-[var(--Secondary-50)] box-border flex h-[16.625rem] md:h-[14.625rem] items-center justify-center max-w-[84.5rem] overflow-clip px-[1.5rem] py-[4.125rem] rounded-[1rem] w-full">
        <div className="flex flex-col gap-[2rem] items-start max-w-[84.5rem] w-full md:w-[47.4375rem]">
          <h1 className="font-['Sora'] font-bold leading-[1.2] text-[2rem] md:text-[3rem] text-[var(--Neutral-800)] text-center tracking-[0.06rem] w-full">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
