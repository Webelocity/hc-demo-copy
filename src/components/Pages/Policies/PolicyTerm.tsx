import React from "react";

interface PolicyTermProps {
  title: string;
  children: React.ReactNode;
}

export default function PolicyTerm({ title, children }: PolicyTermProps) {
  return (
    <div className="flex flex-col gap-[0.5rem] items-center justify-center w-full">
      <div className="flex flex-col gap-[0.25rem] items-center justify-center w-full">
        <h3 className="font-['Sora'] font-bold leading-[1.2] text-[1.5rem] text-[var(--Neutral-800)] tracking-[0.03rem] w-full">
          {title}
        </h3>
      </div>
      <div className="font-['Figtree'] font-normal leading-[1.5] text-[1.125rem] text-[var(--Neutral-700)] tracking-[0.0225rem] w-full">
        {children}
      </div>
    </div>
  );
}
