"use client";

import { useEffect } from "react";
import EmblaCarousel, { EmblaOptionsType } from "embla-carousel";

export default function GalleryEmblaClient({ rootId }: { rootId: string }) {
    useEffect(() => {
        const scope = document.getElementById(rootId);
        if (!scope) return;

        const viewport = scope.querySelector<HTMLElement>(".embla__viewport");
        const container = scope.querySelector<HTMLElement>(".embla__container");
        const slides = Array.from(scope.querySelectorAll<HTMLElement>(".embla__slide"));
        const thumbRail = scope.querySelector<HTMLElement>("nav.thumbs");
        const thumbs = Array.from(scope.querySelectorAll<HTMLButtonElement>("nav.thumbs .thumb"));

        if (!viewport || !container || slides.length === 0 || !thumbRail || thumbs.length === 0) return;

        // Embla options (all deterministic)
        const options: EmblaOptionsType = {
            loop: false,
            align: "start",
            containScroll: "trimSnaps",
            dragFree: false,
            skipSnaps: false,
        };

        const embla = EmblaCarousel(viewport, options);

        // Remove/override SSR fallback that hides slides so Embla can measure/layout
        container.style.removeProperty("display");
        slides.forEach((s) => {
            s.style.display = "block";
        });

        // Sync active thumb border
        const setActive = (index: number) => {
            thumbs.forEach((t, i) => {
                const active = i === index;
                t.classList.toggle("is-active", active);
                t.setAttribute("aria-current", active ? "true" : "false");
            });
        };

        const onSelect = () => {
            const idx = embla.selectedScrollSnap();
            setActive(idx);
            const at = thumbs[idx];
            if (at) at.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        };

        embla.on("select", onSelect);
        embla.on("reInit", onSelect);
        setActive(embla.selectedScrollSnap()); // initial sync

        // Thumb click -> go to slide + log src
        thumbs.forEach((btn, i) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const src = (btn as HTMLButtonElement).dataset.src || "";
                console.log("[Thumb click] src:", src);
                embla.scrollTo(i);
            });
        });

        // Mouse drag-to-scroll on thumbs rail (touch scroll is native)
        // Only treat as a drag after a larger threshold so normal clicks work.
        const DRAG_THRESHOLD_PX = 10;
        let isDown = false, startX = 0, startScroll = 0, dragged = false, hasCapture = false;

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            isDown = true;
            dragged = false;
            hasCapture = false;
            startX = e.clientX;
            startScroll = thumbRail.scrollLeft;
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!isDown) return;
            const dx = e.clientX - startX;
            if (!dragged && Math.abs(dx) > DRAG_THRESHOLD_PX) {
                dragged = true;
                thumbRail.classList.add("cursor-grabbing");
                if (!hasCapture) {
                    thumbRail.setPointerCapture(e.pointerId);
                    hasCapture = true;
                }
            }
            if (dragged) {
                thumbRail.scrollLeft = startScroll - dx;
            }
        };
        const onPointerUp = (e: PointerEvent) => {
            if (!isDown) return;
            isDown = false;
            if (hasCapture) thumbRail.releasePointerCapture(e.pointerId);
            thumbRail.classList.remove("cursor-grabbing");
            // Only swallow the synthetic click if there was an actual drag
            if (dragged) {
                const prevent = (ev: Event) => { ev.preventDefault(); ev.stopPropagation(); };
                thumbRail.addEventListener("click", prevent, true);
                setTimeout(() => thumbRail.removeEventListener("click", prevent, true), 0);
            }
            dragged = false;
            hasCapture = false;
        };

        thumbRail.addEventListener("pointerdown", onPointerDown);
        thumbRail.addEventListener("pointermove", onPointerMove);
        thumbRail.addEventListener("pointerup", onPointerUp);
        thumbRail.addEventListener("pointercancel", onPointerUp);
        thumbRail.addEventListener("pointerleave", onPointerUp);

        // Cleanup on unmount/re-init
        return () => {
            embla.destroy();
            thumbRail.removeEventListener("pointerdown", onPointerDown);
            thumbRail.removeEventListener("pointermove", onPointerMove);
            thumbRail.removeEventListener("pointerup", onPointerUp);
            thumbRail.removeEventListener("pointercancel", onPointerUp);
            thumbRail.removeEventListener("pointerleave", onPointerUp);
        };
    }, [rootId]);

    return null;
}
