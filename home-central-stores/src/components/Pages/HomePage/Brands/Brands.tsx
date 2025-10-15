import Image from "next/image";
import styles from "./Brands.module.css";

export default function Brands() {
    const brandRows: { start: number; end: number; direction: "left" | "right" }[] = [
        { start: 1, end: 10, direction: "left" },
        { start: 11, end: 20, direction: "right" },
        { start: 21, end: 30, direction: "left" },
    ];

    const renderBrandRow = (start: number, end: number, direction: "left" | "right") => {
        const brands = Array.from({ length: end - start + 1 }, (_, i) => start + i);

        return (
            <div className={styles.marqueeContainer}>
                <div className={`${styles.marqueeContent} ${direction === "right" ? styles.marqueeRight : styles.marqueeLeft}`}>
                    {/* First set of brands */}
                    {brands.map((brandNum) => (
                        <div key={`${brandNum}-1`} className={styles.brandItem}>
                            <Image
                                src={`/assets/image/HomePage/Brands/brands_${brandNum}.svg`}
                                alt={`Brand ${brandNum}`}
                                width={116}
                                height={45}
                                className="w-full h-full object-contain grayscale"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {brands.map((brandNum) => (
                        <div key={`${brandNum}-2`} className={styles.brandItem}>
                            <Image
                                src={`/assets/image/HomePage/Brands/brands_${brandNum}.svg`}
                                alt={`Brand ${brandNum}`}
                                width={116}
                                height={45}
                                className="w-full h-full object-contain grayscale opacity-[80%]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="py-[5rem] flex flex-col items-center gap-[5rem] overflow-hidden">
            <div className="flex flex-col gap-[1.5rem] items-center baseContainer">
                <p className="font-bold text-[2.5rem] text-black">Top Brands for Every Project</p>
                <p className="text-black text-[1rem] w-full lg:w-[70%] text-center">
                    We provide a full suite of project services, including electricity, plumbing, and building for homes and shops.
                </p>
            </div>
            <div className="flex flex-col gap-[1.75rem] w-full">
                {brandRows.map((row, index) => (
                    <div key={index}>
                        {renderBrandRow(row.start, row.end, row.direction)}
                    </div>
                ))}
            </div>
        </div>
    );
}