import HeroSection from "@/components/Pages/SpecialOrdering/HeroSection";
import MaterialsSection from "@/components/Pages/SpecialOrdering/MaterialsSection";
import CustomQuotesSection from "@/components/Pages/SpecialOrdering/CustomQuotesSection";
import BulkOrdersSection from "@/components/Pages/SpecialOrdering/BulkOrdersSection";
import PoliciesSection from "@/components/Pages/SpecialOrdering/PoliciesSection";
import ContactUs from "@/components/shared/ContactUs/ContactUs";

export const metadata = {
  title: "Special Ordering for Contractors - Home Central Stores",
  description:
    "Request hard-to-find items, custom quotes, and bulk orders for your construction projects. Home Central Stores offers comprehensive special ordering services in Owego, Vestal, and Candor.",
};

export default function SpecialOrdering() {
  return (
    <>
      <HeroSection />
      <div className="bg-white py-[3rem] flex flex-col gap-[5rem] w-full">
        <MaterialsSection />
        <CustomQuotesSection />
        <BulkOrdersSection />
        <PoliciesSection />
      </div>
    </>
  );
}
