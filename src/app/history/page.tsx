import type { Metadata } from "next";
import HistoryBanner from "@/components/Pages/History/HistoryBanner/HistoryBanner";
import HistoryTimeline from "@/components/Pages/History/HistoryTimeline/HistoryTimeline";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "Discover the history of Home Central Stores – serving Owego, Vestal, and Candor, NY with hardware and building supplies. Our story and milestones.",
  openGraph: {
    title: "Our History | Home Central Stores",
    description:
      "The story of Home Central Stores and our commitment to the community.",
  },
};

export default function History() {
  return (
    <>
      <HistoryBanner />
      <HistoryTimeline />
    </>
  );
}

