import LocationsSelector from "@/components/Pages/Locations/LocationsSelector/LocationsSelector";
import ServingBanner from "@/components/Pages/Locations/ServingBanner/ServingBanner";

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