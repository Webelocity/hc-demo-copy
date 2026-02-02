import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Details",
  description:
    "View job details and apply for this position at Home Central Stores in Owego, Vestal, or Candor, NY.",
  openGraph: {
    title: "Job Details | Home Central Stores",
    description: "Career opportunity at Home Central Stores.",
  },
};

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
