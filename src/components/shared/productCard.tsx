import { Rating } from "@mui/material";
import Image from "next/image";
import Button from "./Button";
import { LuShoppingCart } from "react-icons/lu";

export default function ProductCard() {
    return (
        <div className="p-[1.125rem] flex flex-col gap-[0.75rem] rounded-[var(--Radius-xs)] border-[var(--Colors-Neutral-100)] border-solid border-[1px] bg-white">
            <div className="flex justify-between items-center relative w-[11.5rem] h-[4.3rem] m-auto">
                <Image src={"/assets/image/HomePage/nail.svg"} fill alt="product-card" />
            </div>
            <div className="flex flex-col gap-[0.25rem]">
                <span className="py-[0.25rem] px-[0.5rem] rounded-[1.125rem] bg-[var(--Colors-Neutral-50)] w-fit">Category</span>
                <span className="text-[0.875rem] font-semibold ">Baby Bok Choy</span>
                <div className="flex items-center gap-[0.25rem] text-[0.75rem] ">
                    <span className="text-[var(--Colors-Neutral-500)]">SKU: </span>
                    <span className="">514BASEFJ</span>
                </div>
            </div>
            <div className="flex justify-start items-center gap-[0.4rem]">
                <Rating size="small" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                <span className="text-[0.75rem] text-[var(--Neutral-500)]">2.5 (435)</span>
            </div>
            <div className="text-[var(--Colors-Neutral-700)] text-[0.75rem] underline cursor-pointer">
                +12 variants
            </div>
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-[0.5rem]">
                    <span className="text-[0.75rem] font-semibold">In stock</span>
                </div>
                <div>
                    <span className="text-[0.875rem] font-semibold">$599/<p className="inline text-[0.75rem] text-[var(--Colors-Neutral-500)] font-normal">each</p></span>
                </div>
            </div>
            <Button variant="primary">   <LuShoppingCart className="text-xl cursor-pointer" />Add to cart</Button>
            <span className="text-[0.75rem] text-center cursor-pointer">
                Parcel Shipping
            </span>
        </div>
    )
}