import Image from "next/image";
import GalleryEmblaClient from "./GalleryEmblaClient";

type GalleryProps = {
    product: Product;
    selectedVariant?: ProductVariant | null;
};

function pickMedia(product: Product, variant?: ProductVariant | null): ProductMedia[] {
    const chosen = (variant?.productMedia?.length ? variant.productMedia : product.productMedia) ?? [];
    return [...chosen]
        .filter((m) => m?.file && (m.type?.toLowerCase?.() ?? "image").includes("image"))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export default async function Gallery({ product, selectedVariant }: GalleryProps) {
    const media = pickMedia(product, selectedVariant);
    const slides: ProductMedia[] = media.length ? media : product.thumbnail ? [product.thumbnail] : [];
    const galleryId = `gallery-${product._id}`;
    // Stable key for client enhancer to re-init cleanly on variant/image changes
    const clientKey = slides.map((s) => s.file).join("|");

    return (
        <section id={galleryId} aria-label="Product media gallery" className="w-full">
            <div className="relative flex flex-col gap-[0.5rem]">
                {/* MAIN IMAGE (SSR; Embla enhances after hydration) */}
                <div className="embla relative border border-[color:var(--Colors-Neutral-50)] rounded-[1rem] lg:rounded-[0.75rem] overflow-hidden">
                    <div className="embla__viewport relative">
                        <div className="embla__container flex">
                            {slides.map((m, i) => (
                                <figure
                                    key={m._id ?? `${m.file}-${i}`}
                                    data-index={i}
                                    className="embla__slide relative flex-[0_0_100%] min-w-0"
                                >
                                    <div className="relative w-full h-[30rem] max-h-[30rem]">
                                        <Image
                                            src={m.file}
                                            alt={`${product.name} – image ${i + 1}`}
                                            priority={i === 0}
                                            loading={i === 0 ? "eager" : "lazy"}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="w-full h-auto !relative object-contain"
                                            fill
                                        />
                                    </div>
                                </figure>
                            ))}
                        </div>
                    </div>

                    {/* Top-right overlay icons (wire actions later) */}
                    <div className="icons-wrapper absolute top-0 right-0 p-[0.5rem] flex gap-[0.5rem] z-10">
                        <div className="icon-wrapper cursor-pointer select-none" data-action="wishlist" aria-label="Add to wishlist" role="button" />
                        <div className="icon-wrapper cursor-pointer select-none" data-action="share" aria-label="Share product" role="button" />
                    </div>
                </div>

                {/* THUMBNAILS — 30% width, square, hidden scrollbar, drag-to-scroll */}
                <nav
                    className="
            thumbs
            flex flex-row gap-[0.5rem]
            overflow-x-auto whitespace-nowrap
            pb-[0.25rem] scroll-smooth
            hide-scrollbar select-none cursor-grab touch-pan-x
          "
                    aria-label="Product thumbnails"
                >
                    {slides.map((m, i) => (
                        <button
                            type="button"
                            data-index={i}
                            data-src={m.file}
                            key={`thumb-${m._id ?? `${m.file}-${i}`}`}
                            className={`
                thumb inline-block shrink-0
                border
                ${i === 0 ? "border-[color:var(--primary-500-main)]" : "border-[color:var(--Colors-Neutral-50)]"}
                rounded-[1rem]
                w-[30%] aspect-[1/1]
                overflow-hidden transition
                cursor-pointer active:opacity-80 active:scale-[0.98]
              `}
                            aria-label={`Show image ${i + 1}`}
                            aria-current={i === 0 ? "true" : "false"}
                            draggable={false}
                        >
                            <span className="relative block w-full h-full" draggable={false}>
                                <Image
                                    src={m.file}
                                    alt={`${product.name} – thumbnail ${i + 1}`}
                                    loading="lazy"
                                    className="!absolute inset-0 w-full h-full object-cover"
                                    fill
                                    draggable={false}
                                />
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Hydration-safe fallback CSS (no JS assumptions) */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            /* Before JS: only the first slide is visible */
            .embla__container > .embla__slide { display: none; }
            .embla__container > .embla__slide:first-child { display: block; }

            /* Hide scrollbar on thumbs rail */
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .hide-scrollbar::-webkit-scrollbar { display: none; }

            /* Thumb border colors */
            .thumb { border-color: var(--Colors-Neutral-50); }
            .thumb[aria-current="true"], .thumb.is-active { border-color: var(--primary-500-main) !important; }
          `,
                }}
            />

            {/* Client enhancer (key ensures clean re-init when variant/images change) */}
            <GalleryEmblaClient rootId={galleryId} key={clientKey} />
        </section>
    );
}
