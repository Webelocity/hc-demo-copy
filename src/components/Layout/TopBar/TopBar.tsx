
import { HiOutlinePhone } from "react-icons/hi2";
import { FiMail } from "react-icons/fi";

export default function Header() {
    const NEXT_PUBLIC_HOME_CENTRAL_PHONE = process.env.NEXT_PUBLIC_HOME_CENTRAL_PHONE;
    const NEXT_PUBLIC_HOME_CENTRAL_EMAIL = process.env.NEXT_PUBLIC_HOME_CENTRAL_EMAIL;

    return <div className=" bg-[var(--secondary-500-main)] w-full baseContainer">
        <div className="maxWidth flex justify-center items-center py-[1rem] text-white lg:justify-between ">
            <span className="text-[1rem] flex-1 hidden items-center justify-center gap-[0.5rem] lg:flex justify-start">
                <HiOutlinePhone className="text-xl" />
                {NEXT_PUBLIC_HOME_CENTRAL_PHONE}
            </span>
            {/* <span className="font-semibold text-[1rem] text-center uppercase flex-1">
                15% off your first order of sheeted goods
            </span> */}
            <span className="text-[1rem] flex-1 hidden items-center justify-center gap-[0.5rem] lg:flex justify-end">
                <FiMail className="text-xl" />
                {NEXT_PUBLIC_HOME_CENTRAL_EMAIL}

            </span>
        </div>

    </div>;
}