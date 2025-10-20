"use client";

import React, { useCallback, useRef, useState } from "react";
import { IoAttachOutline, IoClose } from "react-icons/io5";

type DropzoneUploaderProps = {
    multiple?: boolean;
    accept?: string; // input accept attribute value
    hint?: string;
    value?: File | null | File[];
    onChange: (value: File | null | File[]) => void;
    errorText?: string;
};

export default function DropzoneUploader({ multiple, accept, hint, value, onChange, errorText }: DropzoneUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const openFileDialog = () => inputRef.current?.click();

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (!files || files.length === 0) return;
            if (multiple) onChange(Array.from(files));
            else onChange(files[0] ?? null);
        },
        [multiple, onChange]
    );

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeSingle = () => onChange(multiple ? [] : null);
    const removeAt = (idx: number) => {
        if (Array.isArray(value)) {
            const next = value.slice();
            next.splice(idx, 1);
            onChange(next);
        }
    };

    const hasFiles = Boolean(value && ((Array.isArray(value) && value.length) || (!Array.isArray(value) && value)));

    return (
        <div className="w-full">
            <div
                className={[
                    "w-full rounded-[1.25rem] border border-dashed p-8 text-center cursor-pointer select-none",
                    isDragging ? "bg-[var(--Colors-Neutral-50)]" : "bg-white",
                    "border-[var(--Neutral-200)]",
                ].join(" ")}
                onClick={openFileDialog}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple={!!multiple}
                    onChange={(e) => handleFiles(e.target.files)}
                />
                {!hasFiles && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <IoAttachOutline className="text-2xl text-[var(--Neutral-700)]" />
                        <div className="text-[var(--Neutral-800)]">
                            Drop your file here or <span className="text-[var(--primary-500-main)]">browse</span>
                        </div>
                        {hint && <div className="text-sm text-[var(--Neutral-500)]">{hint}</div>}
                    </div>
                )}
                {hasFiles && (
                    <div className="flex flex-col items-center gap-2">
                        {Array.isArray(value) ? (
                            <div className="flex flex-wrap gap-2 items-center justify-center">
                                {value.map((f, idx) => (
                                    <div key={idx} className="flex items-center gap-2 rounded-full bg-[var(--Colors-Neutral-50)] px-3 py-1 border border-[var(--Neutral-200)]">
                                        <span className="text-sm">{f.name}</span>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeAt(idx); }} className="text-[var(--Neutral-700)]">
                                            <IoClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{(value as File).name}</span>
                                <button type="button" onClick={(e) => { e.stopPropagation(); removeSingle(); }} className="text-[var(--Neutral-700)]">
                                    <IoClose />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {errorText && <div className="text-red-600 text-sm mt-1">{errorText}</div>}
        </div>
    );
}


