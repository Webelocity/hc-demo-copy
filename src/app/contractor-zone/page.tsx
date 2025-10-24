import ContractorBanner from "@/components/Pages/ContractorZone/ContractorBanner/ContractorBanner";
import GoPro from "@/components/Pages/ContractorZone/GoPro/GoPro";
import ServiceTailored from "@/components/Pages/ContractorZone/ServiceTailored/ServiceTailored";
import CategorySwiper from "@/components/shared/CategorySwiper/CategorySwiper";

export default function ContractorZone() {
    return (
        <div>
            <ContractorBanner />
            <GoPro />
            <CategorySwiper category="Building Materials" />
            <ServiceTailored />

        </div>
    );
}