import Image from "next/image";

export default function Oppurtunities() {
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className=" flex flex-col md:flex-row items-start justify-center gap-[1rem] baseContainer py-[2.5rem] bg-[var(--Secondary-600)] rounded-[var(--Radius-md)]">
                <div className="flex flex-col items-start justify-center gap-[1.5rem] flex-[2]">
                    <h3 className="text-[2.5rem] font-bold text-white">
                        Career Opportunities
                    </h3>
                    <p className="text-[var(--Neutral-100)] text-[1.125rem]">Jobs at Home Central are diverse and are never limited to a single role. Team members are encouraged to learn all facets of our operations, including:</p>
                </div>
                <div className="flex-[1.6]">
                    <Image className="!relative object-cover aspect-[526/320] rounded-[var(--Radius-md)]" src={"/assets/image/careers/people.svg"} alt="Oppurtunities" fill />
                </div>
            </div>
        </div>

    );
}