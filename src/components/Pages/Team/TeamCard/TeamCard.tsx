"use client";

interface TeamCardProps {
  name: string;
  position: string;
  phone: string;
}

export default function TeamCard({ name, position, phone }: TeamCardProps) {
  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessageClick = () => {
    // Open email client or contact form
    window.location.href = `mailto:info@homecentral.com?subject=Message for ${name}`;
  };

  return (
    <div className="flex flex-col gap-[1rem] items-center p-[1.5rem] rounded-[var(--Radius-md)] w-full">
      <div className="flex flex-col gap-[0.25rem] items-center w-full">
        {/* Name */}
        <p className="font-bold text-[1.25rem] leading-[1.2] tracking-[0.025rem] text-[var(--Neutral-800)] text-center whitespace-pre-wrap min-w-full w-min font-[family-name:var(--font-sora)]">
          {name}
        </p>

        {/* Position */}
        <p className="font-normal text-[1.125rem] leading-[1.5] tracking-[0.0225rem] text-[#555566] text-center whitespace-pre-wrap min-w-full w-min">
          {position}
        </p>

        {/* Phone */}
        <button
          onClick={handlePhoneClick}
          className="flex gap-[0.5rem] items-center justify-center rounded-[var(--Radius-md)] mt-[0.5rem] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <p className="font-medium text-[1rem] leading-[1.2] tracking-[0.02rem] text-[var(--secondary-500-main)]">
            {phone}
          </p>
        </button>

        {/* Send a Message */}
        <button
          onClick={handleMessageClick}
          className="flex gap-[0.5rem] items-center justify-center rounded-[var(--Radius-md)] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <p className="font-medium text-[1rem] leading-[1.2] tracking-[0.02rem] text-[var(--secondary-500-main)]">
            Send a Message
          </p>
        </button>
      </div>
    </div>
  );
}
