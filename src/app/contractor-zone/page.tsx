import ContractorBanner from "@/components/Pages/ContractorZone/ContractorBanner/ContractorBanner";
import GoPro from "@/components/Pages/ContractorZone/GoPro/GoPro";
import JoinZone from "@/components/Pages/ContractorZone/JoinZone/JoinZone";
import ServiceTailored from "@/components/Pages/ContractorZone/ServiceTailored/ServiceTailored";
import CategorySwiper from "@/components/shared/CategorySwiper/CategorySwiper";

export default function ContractorZone() {
  return (
    <div>
      <ContractorBanner />
      <GoPro />
      <JoinZone />
      <CategorySwiper categoryId="69143ed86ac9361831e465f6" categoryName="Building Materials" />
      <ServiceTailored />
    </div>
  );
}
