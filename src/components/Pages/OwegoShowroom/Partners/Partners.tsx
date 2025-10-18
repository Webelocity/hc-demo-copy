import Image from "next/image";

export default function Partners() {
    return (
        <div className="baseContainer py-[2.5rem] flex flex-col gap-[1.5rem] items-center justify-center ">
            <h2 className="text-[2.5rem] font-bold text-center :w-full md:w-[40%]">
                Partners in Design
            </h2>
            <p className="text-[1rem] font-normal text-center w-full md:w-[40%]">
                Home Central Showroom offers top-quality brands that contractors and vendors trust, ensuring your project is completed with durable, reliable materials.
            </p>
            <div className="flex flex-col gap-[1.75rem]">
                <div className="flex justify-center items-center gap-[1.75rem] flex-wrap ">
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_1.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_2.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_3.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_4.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_5.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_6.svg"} alt="partner" fill />
                </div>
                <div className="flex justify-center items-center gap-[1.75rem] flex-wrap ">
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_7.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_8.svg"} alt="partner" fill />
                    <Image className="!relative !w-[11.7rem] !h-[4.6rem]" src={"/assets/image/OwegoShowroom/brands/brands_9.svg"} alt="partner" fill />
                </div>
            </div>
        </div>
    )
}