import Image from "next/image";

export default function ServiceBanner() {
    return (
        <div className="baseContainer  py-[1.5rem]">
            <div className="relative maxWidth my-[1.5rem] bg-[var(--secondary-500-main)] flex flex-col md:flex-row justify-between items-center gap-[1.5rem] w-full bg-[var(--Secondary-50)] rounded-[var(--Radius-md)]  ">
                <div className="flex-1 flex flex-col gap-[1.5rem] flex-[1.8] p-[2.5rem]">
                    <h3 className="text-[3rem] !font-bold text-white text-center md:text-start w-100 lg:w-[60%]">
                        Home Central Stores Services
                    </h3>
                </div>
                <Image className=" !relative object-cover !right-0 aspect-[1/1] !w-[23rem]  " src="/assets/image/Services/nail.svg" alt="quote-request" fill />
            </div>
        </div>



    );
}