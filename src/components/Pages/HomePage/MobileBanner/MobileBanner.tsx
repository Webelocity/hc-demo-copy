import Image from "next/image";

export default function MobileBanner() {
    return (
        <div className="baseContainer py-[2.5rem] 2xl:py-[5rem] ">
            <div className="maxWidth bg-secondary-500 p-5 lg:py-20 lg:px-10 rounded-2xl flex justify-between relative">
                <div className="flex flex-col 2xl:max-w-xl">
                    <h2 className="text-3xl lg:text-[40px] font-bold text-white mb-4">
                        The Home Central Experience — Now Mobile
                    </h2>
                    <p className="text-lg text-natural-200 mb-6">
                        Order materials, reorder lists, check balances, and view invoices — all directly from the jobsite with the Home Central app.
                    </p>
                    <div className="flex gap-2">
                        {/* <a href="https://play.google.com/store/apps/details?id=com.toolswift.hc" target="_blank" rel="noopener noreferrer">
                            <Image src={'/assets/image/HomePage/play_store.svg'} alt={'play store'} width={120} height={30} />
                        </a> */}

                        <a href="https://play.google.com/store/apps/details?id=com.toolswift.hc" target="_blank" rel="noopener noreferrer">
                            <Image src={'/assets/image/HomePage/play_store.svg'} alt={'play store'} width={120} height={30} />
                        </a></div>
                </div>

                <div className=" absolute h-full -right-[10%] -top-[50%]  hidden 2xl:block">
                    <Image src={'/assets/image/HomePage/mobile_app.svg'} alt={'mobile app'} width={1100} height={707} />
                </div>
            </div>
        </div>
    );
}