import Button from "@/components/shared/Button";

export default function Paint() {
    return (
        <div className="baseContainer py-[2.5rem] ">
            <div className="p-[2.5rem] flex flex-col gap-[1.5rem] aspect-[1352/288] bg-[url('/assets/image/HomePage/paint.svg')] rounded-[var(--Radius-md)] bg-cover bg-center bg-no-repeat">
                <h1 className="text-[2.5rem] font-bold text-white text-center">
                    Customize Your Paint Mixing for the Perfect Color
                </h1>
                <p className="text-[1.125rem] font-normal text-[var(--Neutral-100)] text-center tracking-[0.36px]">
                    Our expert staff and advanced color-matching system can replicate any sample or adjust your favorite shade, ensuring your paint is exactly what you want for your project.
                </p>
                <div className="flex justify-center items-center gap-[1.5rem]">
                    <Button variant="primary">Request a Quote</Button>
                    <span className="text-[1rem] cursor-pointer text-white">More Details</span>
                </div>
            </div>
        </div>
    )
}