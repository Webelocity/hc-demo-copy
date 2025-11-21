import OpeningItem from "./OpeningItem";

export default function Openings() {
    return (
        <div className="flex flex-col gap-[1.5rem] baseContainer py-[2.5rem]">
            <h4 className="maxWidth text-[2.5rem] font-bold text-start">
                Currently Hiring
            </h4>
            <div className="maxWidth grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                <OpeningItem />
                <OpeningItem />

                <OpeningItem />
                <OpeningItem />

            </div>
        </div>
    );
}