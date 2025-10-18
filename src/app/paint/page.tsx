import PaintBanner from "@/components/Pages/CustomPaint/PaintBanner/PaintBanner";
import PerfectColorBanner from "@/components/Pages/CustomPaint/PerfectColorBanner/PerfectColorBanner";
import WhyChoseSection from "@/components/Pages/CustomPaint/WhyChoseSection/WhyChoseSection";
import SampleKit from "@/components/Pages/CustomPaint/SampleKit/SampleKit";

export default function Paint() {
    return (
        <>
            <PaintBanner />
            <PerfectColorBanner />
            <WhyChoseSection />
            <SampleKit />
        </>
    )
}