import PaintBanner from "@/components/Pages/CustomPaint/PaintBanner/PaintBanner";
import PerfectColorBanner from "@/components/Pages/CustomPaint/PerfectColorBanner/PerfectColorBanner";
import WhyChoseSection from "@/components/Pages/CustomPaint/WhyChoseSection/WhyChoseSection";
import SampleKit from "@/components/Pages/CustomPaint/SampleKit/SampleKit";
import StartProjectSection from "@/components/Pages/CustomPaint/StartProjectSection/StartProjectSection";

export const metadata = {
    title: "Custom Paint Matching & Mixing - Home Central Stores",
    description: "Get the perfect color match every time with Home Central's custom paint mixing and color matching services. Serving Owego, Vestal, and Candor, NY.",
};

export default function Paint() {
    return (
        <>
            <PaintBanner />
            <PerfectColorBanner />
            <WhyChoseSection />
            <SampleKit />
            <StartProjectSection />
        </>
    )
}