import type { Metadata } from "next";
import PaintBanner from "@/components/Pages/CustomPaint/PaintBanner/PaintBanner";
import PerfectColorBanner from "@/components/Pages/CustomPaint/PerfectColorBanner/PerfectColorBanner";
import WhyChoseSection from "@/components/Pages/CustomPaint/WhyChoseSection/WhyChoseSection";
import SampleKit from "@/components/Pages/CustomPaint/SampleKit/SampleKit";
import StartProjectSection from "@/components/Pages/CustomPaint/StartProjectSection/StartProjectSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Custom Paint Matching & Mixing",
  description:
    "Get the perfect color match every time with Home Central's custom paint mixing and color matching services. Serving Owego, Vestal, and Candor, NY.",
  openGraph: {
    title: "Custom Paint Matching & Mixing | Home Central Stores",
    description:
      "Custom paint mixing and color matching in Owego, Vestal, and Candor, NY.",
  },
};

export default function Paint() {
  return (
    <>
      <PaintBanner />
      <PerfectColorBanner />
      <WhyChoseSection />
      {/* <SampleKit /> */}
      {/* <StartProjectSection /> */}
      <div className="baseContainer py-[2.5rem]">
        <div className="maxWidth relative aspect-[1338/338]">
          <Image src="/assets/image/Paint/MooreBanner.svg" alt="paint" fill />
        </div>
      </div>
    </>
  )
}