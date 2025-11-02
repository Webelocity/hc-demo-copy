import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

interface CustomNoDataProps {
    text: string;
    cta?: React.ReactNode;
}

const CustomNoData: React.FC<CustomNoDataProps> = ({ text, cta }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-[2rem] py-[3rem] w-full">
            <IoIosCloseCircleOutline
                className="text-[3rem] text-[color:var(--Neutral-400)]"
            />
            <p className="text-[1rem] text-[color:var(--Neutral-600)] text-center font-figtree">
                {text}
            </p>
            {cta && (
                <div className="flex justify-center">
                    {cta}
                </div>
            )}
        </div>
    );
};

export default CustomNoData;

