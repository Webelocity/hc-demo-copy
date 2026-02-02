import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart at Home Central Stores.",
  robots: { index: false, follow: true },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
