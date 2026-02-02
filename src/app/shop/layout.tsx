import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop hardware, building supplies, tools, paint, and more at Home Central Stores. Browse products online or visit our stores in Owego, Vestal, and Candor, NY.",
  openGraph: {
    title: "Shop | Home Central Stores",
    description:
      "Hardware, building supplies, tools, and paint – shop online or in store in Owego, Vestal, and Candor, NY.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
