"use client";
import Button from "@/components/shared/Button";
import { useOffers } from "@/hooks/useStrapi";
import { getStrapiImageUrl, type StrapiOffer } from "@/lib/strapi";
import Image from "next/image";

export default function WeeklyOffers() {
    const { data: weeklyOffers } = useOffers();

    const offers = weeklyOffers?.data || [];

    if (!offers.length) return null;

    const renderOfferCard = (offer: StrapiOffer) => {
        const bgUrl = getStrapiImageUrl(offer.BG_Image?.url);
        const dealImageUrl = getStrapiImageUrl(offer.Deal_Image?.url);
        const dealTitle = offer.DealName || offer.DealTitle || "Special Offer";
        const ctaHref = offer.CTA || "/shop/catalogue";

        return (
            <div
                key={offer.documentId || offer.id}
                className="relative flex flex-col justify-between gap-[1.5rem] p-[1.5rem] rounded-[var(--Radius-md)] text-white overflow-hidden min-h-[14rem] bg-[var(--primary-500-main)]"
                style={bgUrl ? { backgroundImage: `url('${bgUrl}')`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
            >
                {bgUrl && <div className="absolute inset-0 bg-black/35" aria-hidden />}
                <div className="relative flex justify-between gap-[1.5rem]">
                    <div className="flex flex-col gap-[0.75rem]">
                        {offer.Category && (
                            <p className="text-[0.9rem] font-semibold text-[var(--Neutral-100)] uppercase tracking-wide">
                                {offer.Category}
                            </p>
                        )}
                        <p className="text-[1.5rem] font-bold leading-tight">{dealTitle}</p>
                        <div className="w-fit">
                            <Button href={ctaHref} variant="secondary">
                                View Products
                            </Button>
                        </div>
                    </div>
                    {dealImageUrl ? (
                        <div className="relative w-[12.5rem] h-[8.125rem] shrink-0">
                            <Image
                                src={dealImageUrl}
                                alt={dealTitle}
                                fill
                                className="object-contain"
                                sizes="200px"
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    };

    return (
        <div className="baseContainer">
            <div className="w-full maxWidth flex flex-col align-center py-[2.5rem] gap-[3rem]">
                <div className="flex justify-between items-center w-full">
                    <p className="text-[2.5rem] font-bold">Weekly Offers</p>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1.5rem] items-stretch">
                    {offers.map(renderOfferCard)}
                </div>
            </div>
        </div>
    );
}