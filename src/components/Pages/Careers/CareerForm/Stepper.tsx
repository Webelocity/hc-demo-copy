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
                    <div key={step.id} className="flex items-start gap-[1rem]">
                        <div className="flex flex-col items-center ">
                            <button
                                type="button"
                                onClick={() => onStepClick?.(index)}
                                className={[
                                    "flex items-center justify-center w-8 h-8 rounded-full border text-sm font-semibold",
                                    isCompleted
                                        ? "bg-[var(--primary-500-main)] text-white border-[var(--primary-500-main)] text-2xl"
                                        : isActive
                                            ? "border-[var(--primary-500-main)] border-[3px] text-[var(--primary-500-main)]"
                                            : "border-[var(--Neutral-200)] text-[var(--Neutral-300)]",
                                ].join(" ")}
                                aria-current={isActive ? "step" : undefined}
                            >
                                {isCompleted ? <IoCheckmark className="text-2xl" /> : String(step.id).padStart(2, "0")}
                            </button>
                            {index < steps.length - 1 && (
                                <div
                                    className={[
                                        "w-[2px] h-[4rem]",
                                        isCompleted || index < activeStep
                                            ? "bg-[var(--primary-500-main)]"
                                            : "bg-[var(--Neutral-200)]",
                                    ].join(" ")}
                                />
                            )}
                        </div>
                        <div>
                            <div
                                className={[
                                    "text-base font-semibold pt-1",
                                    isActive
                                        ? "text-[var(--primary-500-main)]"
                                        : isCompleted
                                            ? "text-[var(--primary-500-main)]"
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


