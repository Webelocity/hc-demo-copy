import type { Metadata } from "next";
import Explore from "@/components/Pages/OwegoShowroom/Explore/Explore";
import LocalHub from "@/components/Pages/OwegoShowroom/LocalHub/LocalHub";
import OwegoShowroomBanner from "@/components/Pages/OwegoShowroom/OwegoShowroomBanner/OwegoShowroomBanner";
import Partners from "@/components/Pages/OwegoShowroom/Partners/Partners";
import ReachOut from "@/components/Pages/OwegoShowroom/ReachOut/ReachOut";
import Vision from "@/components/Pages/OwegoShowroom/Vision/Vision";
import ContactUs from "@/components/shared/ContactUs/ContactUs";

export const metadata: Metadata = {
  title: "Owego Showroom",
  description:
    "Visit the Home Central Owego showroom – explore building materials, hardware, and expert advice. Your local hub in Owego, NY.",
  openGraph: {
    title: "Owego Showroom | Home Central Stores",
    description:
      "Home Central Owego showroom – explore and shop in person.",
  },
};

export default function OwegoShowroom() {
  return (
    <>
      <OwegoShowroomBanner />
      <LocalHub />
      <Vision />
      <ReachOut />
      <Partners />
      <Explore />
      <ContactUs />

    </>
  );
}