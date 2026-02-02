import type { Metadata } from "next";
import AboutUsBanner from "@/components/Pages/AboutUs/AboutUsBanner/AboutUsBanner";
import OurMission from "@/components/Pages/AboutUs/OurMission/OurMission";
import OurCoreValues from "@/components/Pages/AboutUs/OurCoreValues/OurCoreValues";
import WhyChooseUs from "@/components/Pages/AboutUs/WhyChooseUs/WhyChooseUs";
import CommunityContributions from "@/components/Pages/AboutUs/CommunityContributions/CommunityContributions";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Home Central Stores – our mission, values, and commitment to serving Owego, Vestal, and Candor, NY with quality hardware and building supplies since our founding.",
  openGraph: {
    title: "About Us | Home Central Stores",
    description:
      "Our mission, values, and commitment to quality hardware and building supplies in Owego, Vestal, and Candor, NY.",
  },
};

export default function AboutUs() {
  return (
    <>
      <AboutUsBanner />
      <OurMission />
      <OurCoreValues />
      <WhyChooseUs />
      <CommunityContributions />
    </>
  );
}
