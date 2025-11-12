export default function PaintBanner() {
    return (
        <div className="baseContainer py-[1.5rem] md:py-[3rem]">
            <div className="relative p-[2.5rem] flex items-center justify-center min-h-[400px] md:min-h-[362px] bg-[url('/assets/image/HomePage/paint.svg')] rounded-[1rem] md:rounded-[1.5rem] bg-cover bg-center bg-no-repeat overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20 rounded-[1rem] md:rounded-[1.5rem]"></div>
                <h1 className="relative z-10 text-[2rem] md:text-[3rem] font-bold text-white text-center w-full max-w-[90%] md:max-w-[50%] leading-[1.2] tracking-[0.02em]">
                    Custom Paint Matching & Mixing Services at Home Central Stores
                </h1>
            </div>
        </div>
    );
}