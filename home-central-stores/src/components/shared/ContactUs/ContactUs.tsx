
import Map from "./Map/Map";
import ContactUsForm from "./ContactUsForm/ContactUsForm";

export default function ContactUs() {

    return (
        <div className="baseContainer py-[5rem] flex flex-col lg:flex-row gap-[2.5rem] items-center ">
            <div className="flex flex-col gap-[1.5rem] flex-1">
                <p className="text-[2.5rem] font-bold ">Reach Out to Home Central Stores</p>
                <Map />
                <div className="flex  gap-[1.5rem] align-center">
                    <div className="flex flex-col gap-[1rem]">
                        <p className="text-[1rem] font-bold">Owego, NY</p>
                        <div className="flex flex-col ">
                            <p className="text-[1rem] font-medium font-normal">151 Central Ave. Owego, NY 13827</p>
                            <p className="text-[var(--secondary-500-main)] font-medium">(607) 687-3284</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[1rem]">
                        <p className="text-[1rem] font-bold">Vestal, NY</p>
                        <div className="flex flex-col ">
                            <p className="text-[1rem] font-medium font-normal">199 Stage Rd. Vestal, NY 13850</p>
                            <p className="text-[var(--secondary-500-main)] font-medium">(607) 785-3307</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[1rem]">
                        <p className="text-[1rem] font-bold">Candor, NY</p>
                        <div className="flex flex-col ">
                            <p className="text-[1rem] font-medium font-normal">309 Owego Rd. Candor, NY 13743</p>
                            <p className="text-[var(--secondary-500-main)] font-medium">(607) 687-3284</p>
                        </div>
                    </div>

                </div>

            </div>
            <div className="flex-1 w-full h-fit p-[1.75rem] p-[3rem]  rounded-[var(--Radius-md)] bg-[var(--Secondary-50)] w-fit">
                <p className="text-[1.75rem] font-bold mb-[1.5rem]">Contact Us</p>
                <ContactUsForm />
            </div>

        </div>
    )
}