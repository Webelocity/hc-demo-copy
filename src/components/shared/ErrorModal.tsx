'use client';

import Modal from '@/components/shared/Modal';
import Button from '@/components/shared/Button';

type ErrorModalProps = {
    open: boolean;
    title?: string;
    message: string;
    onClose: () => void;
};

export default function ErrorModal({ open, title = 'Something went wrong', message, onClose }: ErrorModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={title} maxWidth="sm">
            <div className="flex flex-col gap-4">
                <p className="text-[0.95rem] text-[var(--Colors-Neutral-700)]">{message}</p>
                <div className="flex justify-end">
                    <Button variant="primary" size="small" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
}


