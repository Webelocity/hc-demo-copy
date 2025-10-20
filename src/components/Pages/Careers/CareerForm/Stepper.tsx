"use client";

import { IoCheckmark } from "react-icons/io5";
import React from "react";

type Step = {
    id: number;
    title: string;
};

type StepperProps = {
    steps: Step[];
    activeStep: number; // 0-indexed
    completed: boolean[]; // same length as steps
    onStepClick?: (index: number) => void; // optional for future
};

export default function Stepper({ steps, activeStep, completed, onStepClick }: StepperProps) {
    return (
        <div className="flex flex-col items-start">
            {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = completed[index];
                return (
                    <div key={step.id} className="flex items-start">
                        {/* Left rail */}
                        <div className="flex flex-col items-center mr-4">
                            <button
                                type="button"
                                onClick={() => onStepClick?.(index)}
                                className={[
                                    "flex items-center justify-center w-8 h-8 rounded-full border text-sm font-semibold",
                                    isCompleted
                                        ? "bg-[var(--primary-500-main)] text-white border-[var(--primary-500-main)] text-2xl"
                                        : isActive
                                            ? "border-[var(--primary-500-main)] text-[var(--primary-500-main)]"
                                            : "border-[var(--Neutral-200)] text-[var(--Neutral-300)]",
                                ].join(" ")}
                                aria-current={isActive ? "step" : undefined}
                            >
                                {isCompleted ? <IoCheckmark /> : String(step.id).padStart(2, "0")}
                            </button>
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={[
                                        "w-[2px] h-10",
                                        isCompleted || index < activeStep
                                            ? "bg-[var(--primary-500-main)]"
                                            : "bg-[var(--Neutral-200)]",
                                    ].join(" ")}
                                />
                            )}
                        </div>
                        {/* Title */}
                        <div className="pb-6">
                            <div
                                className={[
                                    "text-base font-semibold",
                                    isActive
                                        ? "text-[var(--primary-500-main)]"
                                        : isCompleted
                                            ? "text-[var(--Secondary-600)]"
                                            : "text-[var(--Neutral-300)]",
                                ].join(" ")}
                            >
                                {step.title}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


