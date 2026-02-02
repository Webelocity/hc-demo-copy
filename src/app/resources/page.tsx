import type { Metadata } from "next";
import ResourcesBanner from "@/components/Pages/Resources/ResourcesBanner/ResourcesBanner";
import UsefulLinks from "@/components/Pages/Resources/UsefulLinks/UsefulLinks";
import ContactUs from "@/components/shared/ContactUs/ContactUs";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Useful resources, links, and guides from Home Central Stores – hardware tips, building supplies info, and support for contractors and homeowners in NY.",
  openGraph: {
    title: "Resources | Home Central Stores",
    description:
      "Resources and useful links from Home Central Stores.",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <ResourcesBanner />
      <UsefulLinks />
    </>
  );
}
