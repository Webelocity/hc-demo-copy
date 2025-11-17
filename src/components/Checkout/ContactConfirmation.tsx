'use client';

import { FaRegCircleUser } from 'react-icons/fa6';
import { LuPhone } from 'react-icons/lu';
import { MdOutlineMail } from 'react-icons/md';

type ContactConfirmationProps = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

export default function ContactConfirmation({
    firstName,
    lastName,
    email,
    phoneNumber,
}: ContactConfirmationProps) {
    return (
        <div className="pl-[2rem] grid grid-cols-1 md:grid-cols-2 gap-[0.5rem]">
            <div className="flex items-center gap-[0.5rem] p-[1rem]">
                <FaRegCircleUser className="text-[1.25rem]" />
                <div className="text-[1rem] font-medium">
                    {firstName} {lastName}
                </div>
            </div>
            <div className="flex items-center gap-[0.5rem] p-[1rem]">
                <MdOutlineMail className="text-[1.25rem]" />
                <div className="text-[1rem] font-medium">
                    {email}
                </div>
            </div>



            <div className="flex items-center gap-[0.5rem] p-[1rem]">
                <LuPhone className="text-[1.25rem]" />
                <div className="text-[1rem] font-medium">{phoneNumber}</div>
            </div>
        </div>
    );
}


