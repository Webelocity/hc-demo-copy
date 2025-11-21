import Button from "@/components/shared/Button";

export default function GiftCards() {
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="p-[2.5rem] maxWidth flex flex-col justify-center items-center gap-[5rem] aspect-[1352/474] bg-[url('/assets/image/HomePage/Gift_Cards.png')] rounded-[var(--Radius-md)] bg-cover bg-center bg-no-repeat">
                <div className="flex flex-col gap-[1.5rem] justify-center items-start flex-[1] w-full">
                    <p className="font-bold text-[2.5rem] text-white">Home Central Stores Gift Cards</p>
                    <p className="text-[var(--Neutral-200)] text-[1.125rem]">Purchase your Home Central Stores digital Gift Cards and redeem them toward millions of eligible products.</p>
                    <Button variant="primary" className="w-fit">Purchase Your Gift Card</Button>
                </div>
            </div>
        </div>
    );
}