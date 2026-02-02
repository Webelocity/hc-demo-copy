import type { Metadata } from "next";
import HeroSection from "@/components/Pages/SpecialOrdering/HeroSection";
import MaterialsSection from "@/components/Pages/SpecialOrdering/MaterialsSection";
import CustomQuotesSection from "@/components/Pages/SpecialOrdering/CustomQuotesSection";
import BulkOrdersSection from "@/components/Pages/SpecialOrdering/BulkOrdersSection";
import PoliciesSection from "@/components/Pages/SpecialOrdering/PoliciesSection";
import ContactUs from "@/components/shared/ContactUs/ContactUs";

export const metadata: Metadata = {
  title: "Special Ordering for Contractors",
  description:
    "Request hard-to-find items, custom quotes, and bulk orders for your construction projects. Home Central Stores offers comprehensive special ordering services in Owego, Vestal, and Candor.",
  openGraph: {
    title: "Special Ordering for Contractors | Home Central Stores",
    description:
      "Special ordering, custom quotes, and bulk orders in Owego, Vestal, and Candor, NY.",
  },
};

export default function SpecialOrdering() {
  return (
    <>
      <HeroSection />
      <div className="bg-white py-[1.5rem] md:py-[3rem] flex flex-col gap-[2rem] md:gap-[5rem] w-full">
        <MaterialsSection />
        <CustomQuotesSection />
        <BulkOrdersSection />
        <PoliciesSection />
      </div>
    </>
  );
}
