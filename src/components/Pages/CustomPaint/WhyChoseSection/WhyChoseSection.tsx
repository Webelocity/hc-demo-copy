import Image from "next/image";

export default function WhyChoseSection() {
    return (
        <div className="bg-white py-[1.5rem] md:py-[3rem]">
            <div className="baseContainer">
                <div className="flex flex-col md:flex-row gap-[2.5rem] md:gap-[3rem]">
                    {/* Left Image Section */}
                    <div className="w-full md:w-[385px] md:flex-shrink-0">
                        <div className="relative w-full h-[385px] md:h-[608px] rounded-[1rem]">
                            <Image 
                                className="rounded-[1rem] object-cover" 
                                src="/assets/image/Paint/girl.svg" 
                                alt="Woman holding paint color samples" 
                                fill
                                priority
                            />
                        </div>
                    </div>
                    
                    {/* Right Content Section */}
                    <div className="flex-1 flex flex-col gap-[1.5rem]">
                        <h2 className="text-[1.5rem] md:text-[2.5rem] font-bold text-start leading-[1.2] tracking-[0.02em]">
                            Why Choose Home Central for Paint Matching?
                        </h2>
                        
                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.25rem]">
                            {/* Card 1 - Expert Staff */}
                            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[1rem] p-[1rem]">
                                <div className="bg-[var(--Secondary-100)] rounded-[1rem] p-[0.75rem]">
                                    <div className="relative w-[2.5rem] h-[2.5rem]">
                                        <Image 
                                            src="/assets/image/Paint/UserCheck.svg" 
                                            alt="Expert staff icon" 
                                            fill
                                        />
                                    </div>
                                </div>
                                <h3 className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold leading-[1.2] tracking-[0.02em]">
                                    Expert Staff
                                </h3>
                                <p className="text-[var(--Neutral-700)] text-[1rem] font-normal leading-[1.5] tracking-[0.02em]">
                                    Our experienced team ensure accurate color matching and shading.
                                </p>
                            </div>
                            
                            {/* Card 2 - Advanced Technology */}
                            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[1rem] p-[1rem]">
                                <div className="bg-[var(--Secondary-100)] rounded-[1rem] p-[0.75rem]">
                                    <div className="relative w-[2.5rem] h-[2.5rem]">
                                        <Image 
                                            src="/assets/image/Paint/pallet.svg" 
                                            alt="Advanced technology icon" 
                                            fill
                                        />
                                    </div>
                                </div>
                                <h3 className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold leading-[1.2] tracking-[0.02em]">
                                    Advanced Technology
                                </h3>
                                <p className="text-[var(--Neutral-700)] text-[1rem] font-normal leading-[1.5] tracking-[0.02em]">
                                    Using our computerized color matching system, we precisely analyze every shade to create a perfect match.
                                </p>
                            </div>
                            
                            {/* Card 3 - Custom Solutions */}
                            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[1rem] p-[1rem]">
                                <div className="bg-[var(--Secondary-100)] rounded-[1rem] p-[0.75rem]">
                                    <div className="relative w-[2.5rem] h-[2.5rem]">
                                        <Image 
                                            src="/assets/image/Paint/colors.svg" 
                                            alt="Custom solutions icon" 
                                            fill
                                        />
                                    </div>
                                </div>
                                <h3 className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold leading-[1.2] tracking-[0.02em]">
                                    Custom Solutions for Every Project
                                </h3>
                                <p className="text-[var(--Neutral-700)] text-[1rem] font-normal leading-[1.5] tracking-[0.02em]">
                                    Whether you're painting a small accent wall or a whole home, we match colors to your exact specifications.
                                </p>
                            </div>
                            
                            {/* Card 4 - Local Service */}
                            <div className="flex flex-col gap-[1rem] items-start bg-[var(--Secondary-50)] rounded-[1rem] p-[1rem]">
                                <div className="bg-[var(--Secondary-100)] rounded-[1rem] p-[0.75rem]">
                                    <div className="relative w-[2.5rem] h-[2.5rem]">
                                        <Image 
                                            src="/assets/image/Paint/location.svg" 
                                            alt="Local service icon" 
                                            fill
                                        />
                                    </div>
                                </div>
                                <h3 className="text-[var(--Secondary-600)] text-[1.125rem] font-semibold leading-[1.2] tracking-[0.02em]">
                                    Local Service You Can Trust
                                </h3>
                                <p className="text-[var(--Neutral-700)] text-[1rem] font-normal leading-[1.5] tracking-[0.02em]">
                                    Serving Owego, Vestal, and Candor, NY, we help homeowners and contractors achieve high-quality paint matching and mixing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}