import FallBackImage from "@/components/shared/FallBackImage";
import Image from "next/image";

export default function Categories() {
    const categories = [
        {
            name: "Building Materials",
            products: 56,
        },
        {
            name: "Paint",
            products: 42,
            image: "/assets/image/HomePage/category_2.svg"
        },
        {
            name: "Tools",
            products: 78,
            image: "/assets/image/HomePage/category_3.svg"
        },
        {
            name: "Fasteners & Hardware",
            products: 34,
            image: "/assets/image/HomePage/category_4.svg"
        },
        {
            name: "Electrical",
            products: 91,
            image: "/assets/image/HomePage/category_5.svg"
        },
        {
            name: "Plumbing/Heating",
            products: 63,
            image: "/assets/image/HomePage/category_6.svg"
        },
        {
            name: "Lumber",
            products: 47,
            image: "/assets/image/HomePage/category_1.svg"
        },
        {
            name: "Garden & Outdoor",
            products: 85,
            image: "/assets/image/HomePage/category_2.svg"
        },
        {
            name: "Safety Equipment",
            products: 29,
            image: "/assets/image/HomePage/category_3.svg"
        }
    ]
    return (
        <div className="baseContainer !my-[2.5rem]">
            <div className="p-[2.5rem] maxWidth rounded-[var(--Radius-md)] bg-[var(--Teritary-100)] flex flex-col gap-[3rem]">
                <h1 className="text-[2.5rem] font-bold">Featured Categories </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[1.25rem] justify-center">
                    {/* category card */}
                    {categories.map((category) => (
                        <div key={category.name} className="flex flex-col gap-[0.5rem] text-center justify-start items-center cursor-pointer">
                            <div className="relative w-fit h-fit py-[1.5rem] px-[1.7rem] rounded-[10rem] bg-white">
                                {category.image ? (
                                    <Image src={category.image} className="!relative !w-[6rem] !h-[6.5rem]" alt="category" fill />
                                ) : (
                                    <FallBackImage className="!w-[6rem] !h-[6.5rem]" />
                                )}
                            </div>
                            <p className="mt-[0.5rem] text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                                {category.name}
                            </p>
                            <p className="text-[1rem] font-semibold text-[var(--Colors-Neutral-500)]">
                                {category.products} Products
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}