'use client';

import { Dialog } from '@mui/material';
import { IoCloseCircleOutline } from "react-icons/io5";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ open, onClose, title, children, maxWidth = 'xs' }: ModalProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}

            fullWidth
            slotProps={
                {
                    paper: {
                        sx: {
                            minWidth: '25rem',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                        }
                    }
                }
            }




        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[1rem] font-medium font-bold">
                    {title}
                </h2>
                <IoCloseCircleOutline
                    className="text-3xl cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={onClose}
                />
            </div>
            <div>
                {children}
            </div>
        </Dialog>
    );
}

