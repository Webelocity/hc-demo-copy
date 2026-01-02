import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";

export default function JoinZone() {
  const features = [
    {
      title: "Pro Pricing",
      icon: "/assets/image/ContractorZone/pro-pricing-icon.svg",
    },
    {
      title: "Pro Offers",
      icon: "/assets/image/ContractorZone/pro-offers-icon.svg",
    },
    {
      title: "Special & Custom Orders",
      icon: "/assets/image/ContractorZone/custom-orders-icon.svg",
    },
    {
      title: "Track Sales Better",
      icon: "/assets/image/HomePage/Illustrations.png",
    },
  ];

  return (
    <div className="baseContainer py-[2.5rem]">
      <div className="relative maxWidth rounded-[var(--Radius-md)] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/image/ContractorZone/joinzone-bg.jpg"
            alt="Join Contractor Zone Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(132,22,24,0.86)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-[2.5rem] py-[2.5rem]">
          <div className="flex flex-col lg:flex-row gap-[1.5rem] items-center max-w-[1352px] mx-auto">
            {/* Left Section */}
            <div className="flex-1 flex flex-col gap-[1rem]">
              {/* Heading */}
              <div className="flex flex-col gap-[1rem]">
                <div className="flex flex-wrap items-center gap-[1rem]">
                  <h2 className="font-[family-name:var(--font-sora)] text-[2.5rem] font-bold text-[var(--Secondary-50)] leading-[1.2] tracking-[0.05rem]">
                    Join the
                  </h2>
                  <div className="bg-[var(--secondary-500-main)] rounded-[var(--Radius-md)] px-[1.0625rem] py-[0.5rem]">
                    <h2 className="font-[family-name:var(--font-sora)] text-[2.5rem] font-bold text-[var(--Secondary-50)] leading-[1.2] tracking-[0.05rem] whitespace-nowrap">
                      Contractor Zone
                    </h2>
                  </div>
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-[2rem] font-semibold text-[var(--Secondary-50)] leading-[1.2] tracking-[0.6rem]">
                  Become a Pro Today
                </h3>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-[2rem] pt-[1.25rem]">
                <Button variant="secondary" href="https://customer.homecentralstores.com/auth/register/pro" rel="noopener noreferrer" size="large">
                  Sign Up Now
                </Button>

                <Link
                  href="/contact"
                  className="font-[family-name:var(--font-figtree)] text-white text-[1rem] font-medium tracking-[0.02rem] py-[1rem] hover:opacity-80 transition-opacity"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Section - Features */}
            <div className="flex-1">
              <div className="flex flex-row flex-wrap gap-y-[1.5rem] gap-x-[4.1875rem] py-[0.75rem] justify-center lg:justify-start">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[1rem] min-w-[16.4375rem] flex-1 basis-[16.4375rem]"
                  >
                    <div className="bg-[#ad6465] rounded-full p-[0.375rem] flex-shrink-0">
                      <Image
                        className="!relative !w-[2rem] !h-[2rem]"
                        src={feature.icon}
                        alt={feature.title}
                        fill
                      />
                    </div>
                    <p className="font-[family-name:var(--font-sora)] text-white text-[1.25rem] font-bold leading-[1.2] tracking-[0.025rem]">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
