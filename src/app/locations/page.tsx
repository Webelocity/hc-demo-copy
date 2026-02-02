import type { Metadata } from "next";
import LocationsSelector from "@/components/Pages/Locations/LocationsSelector/LocationsSelector";
import ServingBanner from "@/components/Pages/Locations/ServingBanner/ServingBanner";

export const metadata: Metadata = {
    title: "Store Locations",
    description:
        "Find your nearest Home Central Stores in Owego, Vestal, and Candor, NY. Store hours, directions, and contact info for hardware and building supplies.",
    openGraph: {
        title: "Store Locations | Home Central Stores",
        description:
            "Home Central Stores in Owego, Vestal, and Candor, NY – find your nearest location.",
    },
};

export default function Locations() {
    return (
        <>
            <div className="baseContainer">
                <div className="flex flex-col gap-[1.5rem] maxWidth py-[2.5rem]">
                    <h1 className="text-[3rem] font-bold w-full lg:w-[60%] ">
                        Find Your Nearest Home Central
                    </h1>
                    <h2 className="text-[1.75rem] text-[var(--Neutral-600)] ">
                        in Owego, Vestal, and Candor, NY
                    </h2>
                </div>
            </div>

            <LocationsSelector />
            <ServingBanner />
        </>

    );
}