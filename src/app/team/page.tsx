import type { Metadata } from "next";
import TeamBanner from "@/components/Pages/Team/TeamBanner/TeamBanner";
import TeamSection from "@/components/Pages/Team/TeamSection/TeamSection";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Home Central Stores team – the people behind your local hardware and building supplies in Owego, Vestal, and Candor, NY.",
  openGraph: {
    title: "Our Team | Home Central Stores",
    description:
      "Meet the team at Home Central Stores.",
  },
};

export default function TeamPage() {
  return (
    <>
      <TeamBanner />
      <TeamSection />
    </>
  );
}
