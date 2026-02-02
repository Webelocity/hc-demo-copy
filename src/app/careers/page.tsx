import type { Metadata } from "next";
import CareersBanner from "@/components/Pages/Careers/CareersBanner/CareersBanner";
import Openings from "@/components/Pages/Careers/Openings/Openings";
import Oppurtunities from "@/components/Pages/Careers/Oppurtunities/Oppurtunities";
import WhyJoinUs from "@/components/Pages/Careers/WhyJoin/WhyJoin";
import WhyUs from "@/components/Pages/Careers/Whyus/WhyUs";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Home Central Stores team in Owego, Vestal, or Candor, NY. Explore career opportunities in hardware retail, building supplies, and contractor services.",
  openGraph: {
    title: "Careers | Home Central Stores",
    description:
      "Career opportunities at Home Central Stores – join our team in NY.",
  },
};

export default function Careers() {
  return (
    <>

      <CareersBanner />
      <WhyUs />
      <Oppurtunities />
      <Openings />
      <WhyJoinUs />
    </>
  );
}