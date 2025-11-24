"use client";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import FallBackImage from "@/components/shared/FallBackImage";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import ErrorModal from "@/components/shared/ErrorModal";
import Link from "next/link";

export default function Categories() {
    const { data: categories, status: categoriesStatus, error: categoriesError, refetch: refetchCategories } = useAtomValue(categoriesQueryAtom);
    const [errorOpen, setErrorOpen] = useState(false);
    // const categories = [
    //     {
    //         name: "Building Materials",
    //         products: 56,
    //     },
    //     {
    //         name: "Paint",
    //         products: 42,
    //         image: "/assets/image/HomePage/category_2.svg"
    //     },
    //     {
    //         name: "Tools",
    //         products: 78,
    //         image: "/assets/image/HomePage/category_3.svg"
    //     },
    //     {
    //         name: "Fasteners & Hardware",
    //         products: 34,
    //         image: "/assets/image/HomePage/category_4.svg"
    //     },
    //     {
    //         name: "Electrical",
    //         products: 91,
    //         image: "/assets/image/HomePage/category_5.svg"
    //     },
    //     {
    //         name: "Plumbing/Heating",
    //         products: 63,
    //         image: "/assets/image/HomePage/category_6.svg"
    //     },
    //     {
    //         name: "Lumber",
    //         products: 47,
    //         image: "/assets/image/HomePage/category_1.svg"
    //     },
    //     {
    //         name: "Garden & Outdoor",
    //         products: 85,
    //         image: "/assets/image/HomePage/category_2.svg"
    //     },
    //     {
    //         name: "Safety Equipment",
    //         products: 29,
    //         image: "/assets/image/HomePage/category_3.svg"
    //     }
    // ]
    return (
        <div className="baseContainer !my-[2.5rem]">
            <div className="p-[2.5rem] maxWidth rounded-[var(--Radius-md)] bg-[var(--Teritary-100)] flex flex-col gap-[3rem]">
                <h1 className="text-[2.5rem] font-bold">Featured Categories </h1>
                <div>
                    {(categoriesStatus === 'pending') ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[1.25rem] justify-center">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <div key={idx} className="flex flex-col gap-[0.5rem] text-center justify-start items-center">
                                    <div className="relative w-fit h-fit py-[1.5rem] px-[1.7rem] rounded-[10rem] bg-white">
                                        <div className="!w-[6rem] !h-[6.5rem] rounded-xl bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                    </div>
                                    <div className="mt-[0.5rem] h-5 w-32 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                    <div className="h-4 w-24 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : categoriesStatus === 'error' ? (
                        <div className="rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] p-4 text-[0.95rem] text-[var(--Colors-Error-600)]">
                            Failed to load categories.
                            <button
                                type="button"
                                className="ml-2 underline text-[var(--primary-600-main)] cursor-pointer"
                                onClick={() => setErrorOpen(true)}
                            >
                                View details
                            </button>
                            <button
                                type="button"
                                className="ml-3 underline text-[var(--primary-600-main)] cursor-pointer"
                                onClick={() => refetchCategories()}
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[1.25rem] justify-center">
                            {/* category card */}
                            {(categories ?? []).map((category) => (
                                <Link href={`/shop/catalogue?category_active=${category._id}`} key={category.name} className="flex flex-col gap-[0.5rem] text-center justify-start items-center cursor-pointer">
                                    <div className="relative w-fit h-fit py-[1.5rem] px-[1.7rem] rounded-[10rem] bg-white">
                                        {category.image ? (
                                            <Image src={category.image} className="!relative !w-[6rem] !object-contain !h-[6.5rem]" alt="category" fill />
                                        ) : (
                                            <FallBackImage className="!w-[6rem] !h-[6.5rem]" />
                                        )}
                                    </div>
                                    <p className="mt-[0.5rem] text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                                        {category.name}
                                    </p>
                                    <p className="text-[1rem] font-semibold text-[var(--Colors-Neutral-500)]">
                                        {category.productCount} Products
                                    </p>

                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <ErrorModal
                    open={errorOpen}
                    onClose={() => setErrorOpen(false)}
                    title="Categories Error"
                    message={categoriesError instanceof Error ? categoriesError.message : 'Failed to load categories.'}
                />
            </div>

        </div>
    );
}