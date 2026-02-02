import type { Metadata } from "next";
import ServiceBanner from "@/components/Pages/Services/ServiceBanner/ServiceBanner";
import ServiceList from "@/components/Pages/Services/ServiceList/ServiceList";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive hardware and building supply services for contractors and homeowners – delivery, special orders, paint matching, and more in Owego, Vestal, and Candor, NY.",
  openGraph: {
    title: "Our Services | Home Central Stores",
    description:
      "Services for contractors and homeowners in Owego, Vestal, and Candor, NY.",
  },
};

export default function Services() {
  return (
    <>
      <ServiceBanner />
      <ServiceList />

    </>
  );
}