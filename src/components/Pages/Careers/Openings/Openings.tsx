'use client';

import OpeningItem from "./OpeningItem";
import { useCareers } from "@/hooks/useStrapi";
import { CircularProgress, Alert } from "@mui/material";
import CustomNoData from "@/components/shared/CustomNoData";

export default function Openings() {
    const { data, isLoading, isError, error } = useCareers({
        pagination: {
            pageSize: 10, // Adjust as needed
        },
        sort: 'publishedAt:desc',
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-[1.5rem] baseContainer py-[2.5rem]">
                <h4 className="maxWidth text-[2.5rem] font-bold text-start">
                    Currently Hiring
                </h4>
                <div className="maxWidth flex justify-center items-center py-[4rem]">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col gap-[1.5rem] baseContainer py-[2.5rem]">
                <h4 className="maxWidth text-[2.5rem] font-bold text-start">
                    Currently Hiring
                </h4>
                <div className="maxWidth">
                    <Alert severity="error">
                        Failed to load job openings. {error instanceof Error ? error.message : 'Unknown error'}
                    </Alert>
                </div>
            </div>
        );
    }

    const careers = data?.data || [];

    if (careers.length === 0) {
        return (
            <div className="flex flex-col gap-[1.5rem] baseContainer py-[2.5rem]">
                <h4 className="maxWidth text-[2.5rem] font-bold text-start">
                    Currently Hiring
                </h4>
                <div className="maxWidth flex justify-center">
                    <CustomNoData text="No job openings available at the moment." />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[1.5rem] baseContainer py-[2.5rem]">
            <h4 className="maxWidth text-[2.5rem] font-bold text-start">
                Currently Hiring
            </h4>
            <div className="maxWidth grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                {careers.map((career) => (
                    <OpeningItem key={career.id} career={career} />
                ))}
            </div>
        </div>
    );
}