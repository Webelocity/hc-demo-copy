import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Home Central Stores policies – Privacy Policy, Terms of Use, Return & Refund Policy, and Shipping & Delivery Policy. Read our store policies.",
  openGraph: {
    title: "Policies | Home Central Stores",
    description:
      "Privacy, terms, returns, and shipping policies for Home Central Stores.",
  },
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
