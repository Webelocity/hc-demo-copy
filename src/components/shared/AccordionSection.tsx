'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiEdit2 } from 'react-icons/fi';

type AccordionSectionProps = {
    index: number;
    id: string;
    title: string;
    isOpen: boolean;
    isCompleted: boolean;
    onToggle: () => void;
    onEdit: () => void;
    children: React.ReactNode;
    completedContent?: React.ReactNode;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
};

function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const measure = () => setContentHeight(el.scrollHeight);
        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    return (
        <div
            style={{ maxHeight: open ? contentHeight : 0 }}
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out will-change-[max-height]"
            aria-hidden={!open}
        >
            <div ref={ref}>
                {children}
            </div>
        </div>
    );
}

export default function AccordionSection({
    index,
    id,
    title,
    isOpen,
    isCompleted,
    onToggle,
    onEdit,
    children,
    completedContent,
    className,
    headerClassName,
    contentClassName,
}: AccordionSectionProps) {
    return (
        <section className={`rounded-[var(--Radius-xs)] border border-[var(--Colors-Neutral-100)] ${className ?? ''}`}>
            <header className={`flex items-center justify-between gap-[0.75rem] p-[1rem] ${headerClassName ?? ''}`}>
                <button
                    type="button"
                    onClick={!isCompleted ? onToggle : undefined}
                    className={`flex items-center gap-[0.75rem] select-none ${isCompleted ? 'cursor-default' : 'cursor-pointer'}`}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-${id}`}
                >
                    <span
                        className={`inline-flex h-[3rem] w-[3rem] items-center justify-center rounded-full  text-[1.25rem] font-semibold ${isCompleted ? 'bg-[var(--Secondary-50)] text-[var(--secondary-500-main)] ' : 'bg-[var(--Colors-Neutral-50)]'}`}
                        aria-hidden="true"
                    >
                        {isCompleted ? <FiCheck className="text-2xl" /> : (index + 1)}
                    </span>
                    <span className="text-[1rem] font-semibold">{title}</span>
                </button>
                {isCompleted ? (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex items-center gap-2 cursor-pointer text-[0.875rem] font-medium text-[var(--Colors-Neutral-800)] hover:underline"
                        aria-label={`Edit ${title}`}
                    >
                        <FiEdit2 />
                        Edit
                    </button>
                ) : null}
            </header>
            {isCompleted && completedContent ? (
                <div className={`p-[1rem] border-t border-[var(--Colors-Neutral-100)] ${contentClassName ?? ''}`}>
                    {completedContent}
                </div>
            ) : null}
            <Collapsible open={isOpen}>
                <div id={`accordion-${id}`} className={`p-[1rem] border-t border-[var(--Colors-Neutral-100)] ${contentClassName ?? ''}`}>
                    {children}
                </div>
            </Collapsible>
        </section>
    );
}


