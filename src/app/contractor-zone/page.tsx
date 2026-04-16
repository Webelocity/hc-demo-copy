import type { Metadata } from "next";
import ContractorBanner from "@/components/Pages/ContractorZone/ContractorBanner/ContractorBanner";
import GoPro from "@/components/Pages/ContractorZone/GoPro/GoPro";
import JoinZone from "@/components/Pages/ContractorZone/JoinZone/JoinZone";
import ServiceTailored from "@/components/Pages/ContractorZone/ServiceTailored/ServiceTailored";
import CategorySwiper from "@/components/shared/CategorySwiper/CategorySwiper";


export const metadata: Metadata = {
  title: "Contractor Zone",
  description:
    "Home Central Contractor Zone – rewards, bulk pricing, and tailored services for contractors in Owego, Vestal, and Candor, NY. Join and save on building materials.",
  openGraph: {
    title: "Contractor Zone | Home Central Stores",
    description:
      "Contractor rewards, bulk pricing, and tailored services in NY.",
  },
};

export default function ContractorZone() {
  return (
    <div>
      <ContractorBanner />
      <GoPro />
      <JoinZone />
      <CategorySwiper categoryId="699ed1e538be36fe0c381f2b" categoryName="Building Materials" />
      <ServiceTailored />
    </div>
  );
}
