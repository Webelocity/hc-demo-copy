import AboutUsBanner from "@/components/Pages/AboutUs/AboutUsBanner/AboutUsBanner";
import OurMission from "@/components/Pages/AboutUs/OurMission/OurMission";
import OurCoreValues from "@/components/Pages/AboutUs/OurCoreValues/OurCoreValues";
import WhyChooseUs from "@/components/Pages/AboutUs/WhyChooseUs/WhyChooseUs";
import CommunityContributions from "@/components/Pages/AboutUs/CommunityContributions/CommunityContributions";

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
