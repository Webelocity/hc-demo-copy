import Image from "next/image";

export default function LocalHub() {
    return (
        <div className="baseContainer">
            <div className="flex flex-col md:flex-row gap-[2.5rem] maxWidth py-[2.5rem] ">
                <div className="flex-[1.1] flex flex-col gap-[1rem]">
                    <h2 className="text-[1.75rem] font-bold text-start">
                        Your Local Hub for Building Materials & Design in Owego, NY
                    </h2>
                    <p className="text-[var(--Neutral-700)] text-[1.125rem] font-normal text-start">
                        Building a new home, renovating your kitchen, or planning a major addition? Home Central’s Owego Showroom & Design Center at 133 Central Ave, Owego, NY, is your destination for expert guidance and premium building materials. Our experienced staff can help contractors and homeowners design kitchens and baths, produce accurate quotes and estimates, source and deliver materials, and brainstorm the best products for every project.
                    </p>
                </div>
                <div className="flex-[1] relative">
                    <Image className="!relative !w-[37rem] !h-[17rem] object-cover rounded-[var(--Radius-md)]" src="/assets/image/OwegoShowroom/OwegoShowroom.svg" alt="owego-showroom" fill />
                </div>
            </div>
        </div>

    );
}