import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for a Job",
  description:
    "Apply for a position at Home Central Stores in Owego, Vestal, or Candor, NY. Submit your application for careers in hardware retail and building supplies.",
  openGraph: {
    title: "Apply for a Job | Home Central Stores",
    description:
      "Apply to join the Home Central Stores team.",
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
