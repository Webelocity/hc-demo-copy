export default function PaintBanner() {
    return (
        <div className="baseContainer py-[2.5rem] ">
            <div className="p-[2.5rem] flex items-center justify-center aspect-[1352/288] bg-[url('/assets/image/HomePage/paint.svg')] rounded-[var(--Radius-md)] bg-cover bg-center bg-no-repeat ">
                <h1 className="text-[3rem] font-bold text-white text-center w-full lg:w-[40%]">
                    Custom Paint Matching & Mixing Services at Home Central Stores
                </h1>
            </div>
        </div>
    );
}