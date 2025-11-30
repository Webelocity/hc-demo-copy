'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { ReactNode, useMemo, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './reUsableSwiper.module.css';

interface ReUsableSwiperProps<T> {
    data: T[];
    renderSlide: (item: T, index: number) => ReactNode;
    swiperOptions?: SwiperOptions;
    className?: string;
    slideStyles?: string;
    isLoading?: boolean;
    skeletonCount?: number;
}

export default function ReUsableSwiper<T>({
    data,
    renderSlide,
    swiperOptions = {},
    className = '',
    slideStyles = '',
    isLoading = false,
    skeletonCount = 6,
}: ReUsableSwiperProps<T>) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handlePrev = () => {
        swiperInstance?.slidePrev();
    };

    const handleNext = () => {
        swiperInstance?.slideNext();
    };

    const skeletonArray = useMemo(() => Array.from({ length: skeletonCount }), [skeletonCount]);

    return (
        <div className='w-full flex-[1] overflow-hidden min-h-fit'>
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    el: `.swiper-pagination-${className}`,
                }}

                onSwiper={(swiper: SwiperType) => {
                    setSwiperInstance(swiper);
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper: SwiperType) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                {...swiperOptions}
                className={`${styles.swiperContainer} ${className}`}
            >
                {isLoading
                    ? skeletonArray.map((_, index) => (
                        <SwiperSlide key={`skeleton-${index}`} className={slideStyles}>
                            <div className="p-[1.125rem] flex flex-col gap-[0.75rem] rounded-[var(--Radius-xs)] border-[var(--Colors-Neutral-100)] border-solid border-[1px] bg-white relative">
                                <div className="flex justify-between items-center relative w-[11.5rem] h-[4.3rem] m-auto">
                                    <div className="w-full h-full rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                </div>
                                <div className="flex flex-col gap-[0.25rem]">
                                    <div className="h-5 w-20 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                    <div className="h-5 w-40 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                    <div className="h-4 w-28 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                </div>
                                <div className="h-4 w-24 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-16 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                    <div className="h-5 w-20 rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                </div>
                                <div className="h-9 w-full rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                                <div className="h-4 w-24 mx-auto rounded bg-[var(--Colors-Neutral-100)] animate-pulse" />
                            </div>
                        </SwiperSlide>
                    ))
                    : data.map((item, index) => (
                        <SwiperSlide key={index} className={slideStyles}>
                            {renderSlide(item, index)}
                        </SwiperSlide>
                    ))}
            </Swiper>

            <div className={styles.navigationContainer}>
                <button
                    className={styles.navButton}
                    onClick={handlePrev}
                    disabled={isBeginning}
                    aria-label="Previous slide"
                >
                    <GoChevronLeft />
                </button>

                <div className={`${styles.paginationBullets} swiper-pagination-${className}`} />

                <button
                    className={styles.navButton}
                    onClick={handleNext}
                    disabled={isEnd}
                    aria-label="Next slide"
                >
                    <GoChevronRight />
                </button>
            </div>
        </div>
    );
}