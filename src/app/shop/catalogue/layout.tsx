import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse the full Home Central Stores product catalogue – hardware, building materials, tools, paint, and more. Filter by category and find what you need.",
  openGraph: {
    title: "Product Catalogue | Home Central Stores",
    description:
      "Browse our full product catalogue – hardware, building materials, tools, and paint.",
  },
};

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
