import Image from "next/image";

export default function OurCoreValues() {
  const values = [
    {
      icon: "/assets/image/AboutUs/positive.svg",
      title: "Make Your Legacy Positive",
      description:
        "We strive to leave a lasting impact on our communities and our team. Every action reflects the sustainability and strength of Home Central Stores, benefiting the contractors, vendors, and neighborhoods we serve in Owego, Vestal, and Candor, NY.",
    },
    {
      icon: "/assets/image/AboutUs/book.svg",
      title: "Learn & Adapt",
      description:
        "The world of hardware and building supplies is always evolving. Embrace innovation, seek knowledge, and share insights to better serve homeowners, contractors and vendors while improving the team around you",
    },
    {
      icon: "/assets/image/AboutUs/ears.svg",
      title: "Open Ears & Eager Communication",
      description:
        "Honest, clear communication is key. Listening and responding thoughtfully to our customers, vendors, and coworkers builds trust and strengthens relationships.",
    },
    {
      icon: "/assets/image/AboutUs/tread.svg",
      title: "Tread Lightly",
      description:
        "Treat everyone—customers, coworkers, and partners—with integrity, fairness, and respect. Diverse perspectives make our company stronger, and every interaction should reflect our values.",
    },
    {
      icon: "/assets/image/AboutUs/truth.svg",
      title: "Speak the Truth",
      description:
        "Honesty guides everything we do. From answering questions to acknowledging successes and learning from mistakes, trust is the foundation of our relationships.",
    },
    {
      icon: "/assets/image/AboutUs/best.svg",
      title: "Be the Best",
      description:
        "Always give your best. Be approachable, dependable, and friendly. When everyone brings their best, Home Central becomes the top choice for homeowners, contractors, and vendors, and the best company to work with",
    },
  ];

  return (
    <div className="baseContainer py-[3rem]">
      <div className="bg-[#841618] flex gap-[2.5rem] items-center p-[2.5rem] rounded-[1.5rem] w-full">
        <div className="flex flex-1 flex-wrap gap-[2.5625rem] items-start min-w-px shrink-0">
          {/* Left Section - Title and Image */}
          <div className="flex flex-col flex-1 gap-[1rem] items-start min-w-[30.625rem] shrink-0">
            <h2 className="text-[2.5rem] font-bold text-white leading-[1.2] tracking-[0.05rem] w-full">
              Our Core Values
            </h2>
            <div className="h-[72.25rem] mix-blend-screen relative shrink-0 w-full rounded-[var(--Radius-md)] overflow-hidden">
              <Image
                src="/assets/image/AboutUs/core-values.svg"
                alt="Our Core Values"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-[1rem] flex-1 min-w-[42.5625rem] shrink-0">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[rgba(255,255,255,0.15)] p-[1rem] rounded-[var(--Radius-md)] flex flex-col gap-[1rem] min-w-[15.1875rem] "
              >
                {/* Icon */}
                <div className="bg-[rgba(255,255,255,0.39)] p-[0.75rem] rounded-[var(--Radius-md)] w-fit">
                  <div className="w-[2.5rem] h-[2.5rem] relative overflow-hidden">
                    <Image
                      src={value.icon}
                      alt={value.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[1.125rem] font-semibold text-white leading-[1.2] tracking-[0.0225rem]">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-[1rem] text-[var(--Secondary-50)] leading-[1.5] tracking-[0.02rem]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
