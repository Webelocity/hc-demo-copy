'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { ReactNode, useState } from 'react';
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
}

export default function ReUsableSwiper<T>({
    data,
    renderSlide,
    swiperOptions = {},
    className = '',
    slideStyles = '',
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
                {data.map((item, index) => (
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