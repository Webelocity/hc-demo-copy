'use client';
import Button from "@/components/shared/Button";
import { MarkdownView } from "@/components/shared/MarkDown";
import { useJobDetails } from "@/hooks/useStrapi";
import { StrapiCareer } from "@/lib/strapi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FiAlertTriangle, FiEdit3, FiRefreshCw } from "react-icons/fi";
import { RiUserVoiceLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";

export default function JobDetails() {
    const { job_id } = useParams() as { job_id: string };
    const { data, isLoading, isError, error } = useJobDetails(job_id);
    console.log(data);
    const { Job_Name, Job_Description, Supervisor, Job_Location, employmentType, department, Responsibilities, Qualifications, Goals } = data?.data?.[0] || {};

    if (isLoading) {
        return <JobDetailsSkeleton />;
    }

    if (isError || !data?.data?.length) {
        return <JobDetailsError errorMessage={error?.message} />;
    }

    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="maxWidth flex flex-col gap-[2.5rem]">
                <div className="flex flex-col gap-[1.75rem] bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[2.5rem] items-start md:items-center py-[4rem]">
                    <span className="text-[3rem] text-[var(--secondary-500-main)] font-bold text-center">
                        {Job_Name}
                    </span>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-[1rem]">
                        <span className="text-[1.125rem] flex items-center gap-[0.5rem] text-[var(--Neutral-700)]  text-start">
                            <SlLocationPin className="text-xl text-[black]" />
                            {Job_Location}
                        </span>
                        <span className="text-[1.125rem] flex items-center gap-[0.5rem] text-[var(--Neutral-700)]  text-start">
                            <Image
                                className="!relative !w-[1.5rem] !h-[1.5rem]"
                                src="/assets/image/Careers/icons/Calendar.svg"
                                alt="Calendar"
                                fill
                            />
                            {employmentType}
                        </span>
                        <span className="text-[1.125rem] flex items-center gap-[0.5rem] text-[var(--Neutral-700)]  text-start">
                            <RiUserVoiceLine className="text-xl text-[black]" />
                            <span className="text-[var(--Neutral-700)] font-bold">Supervisor: </span>
                            {Supervisor}
                        </span>
                    </div>
                    <Button
                        variant="primary"
                        href={Job_Name ? `/careers/apply?job=${encodeURIComponent(Job_Name)}` : "/careers/apply"}
                        className="w-fit"
                        size="large"
                    >
                        Apply Now
                    </Button>
                </div>
                <div className="flex flex-col gap-[2.5rem]">
                    {Responsibilities && (
                        <div className="flex flex-col gap-[1rem]">
                            <span className="text-[1.25rem] text-[var(--primary-500-main)] font-bold text-start">Responsibilities</span>
                            <MarkdownView markdown={Responsibilities} />
                        </div>
                    )}
                    {Qualifications && (
                        <div className="flex flex-col gap-[1rem]">
                            <span className="text-[1.25rem] text-[var(--primary-500-main)] font-bold text-start">Qualifications</span>
                            <MarkdownView markdown={Qualifications} />
                        </div>
                    )}
                    {Goals && (
                        <div className="flex flex-col gap-[1rem]">
                            <span className="text-[1.25rem] text-[var(--primary-500-main)] font-bold text-start">Goals</span>
                            <MarkdownView markdown={Goals} />
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}

function JobDetailsError({ errorMessage }: { errorMessage?: string }) {
    return (
        <div className="baseContainer">
            <div className="maxWidth py-[4rem] flex flex-col items-center text-center gap-[1.5rem]">
                <div className="flex flex-col items-center gap-[1rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex items-center justify-center rounded-full bg-[var(--Secondary-100)] text-[var(--secondary-500-main)]">
                        <FiAlertTriangle size={36} />
                    </div>
                    <div className="flex flex-col gap-[0.5rem] max-w-2xl">
                        <h1 className="text-[2rem] font-bold text-[var(--secondary-600-main)]">We couldn&apos;t load this role</h1>
                        <p className="text-[1rem] text-[var(--Neutral-600)]">
                            Please try again in a moment. {errorMessage ? `(${errorMessage})` : ""}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-[1rem] w-full md:w-auto justify-center">
                    <Button href="/careers" variant="primary" size="large">
                        Browse all careers
                    </Button>
                    <Button
                        href="/"
                        variant="secondary"
                        size="large"
                        className="px-[1.5rem] py-[0.85rem] rounded-[0.75rem] font-semibold border border-[var(--Colors-Primary-200)] text-[var(--Colors-Primary-600)] bg-white hover:bg-[var(--Colors-Primary-50)] transition-colors"
                    >
                        Back to home
                    </Button>
                </div>

                <div className="mt-[2rem] w-full max-w-2xl">
                    <div className="p-[1.5rem] rounded-[1rem] border border-[var(--Colors-Neutral-100)] bg-[var(--Colors-Neutral-10)] text-left flex flex-col gap-[1rem]">
                        <p className="text-[0.95rem] font-semibold text-[var(--Neutral-700)]">Helpful hints</p>
                        <ul className="flex flex-col gap-[0.75rem] text-[0.9rem] text-[var(--Neutral-600)]">
                            <li className="flex items-start gap-[0.5rem]">
                                <FiEdit3 className="text-[var(--Colors-Primary-500)] mt-[0.2rem]" />
                                Make sure the job link is correct or hasn&apos;t expired.
                            </li>
                            <li className="flex items-start gap-[0.5rem]">
                                <FiRefreshCw className="text-[var(--Colors-Primary-500)] mt-[0.2rem]" />
                                Refresh the page or return later if the issue persists.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function JobDetailsSkeleton() {
    return (
        <div className="baseContainer py-[2.5rem]">
            <div className="maxWidth flex flex-col gap-[2.5rem] animate-pulse">
                <div className="flex flex-col gap-[1.75rem] bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] p-[2.5rem] items-center py-[4rem]">
                    <div className="h-[3.25rem] w-3/4 bg-neutral-200 rounded-lg" />
                    <div className="flex flex-wrap items-center justify-center gap-[1rem]">
                        <div className="flex items-center gap-[0.5rem]">
                            <div className="h-6 w-6 rounded-full bg-neutral-200" />
                            <div className="h-5 w-32 bg-neutral-200 rounded-md" />
                        </div>
                        <div className="flex items-center gap-[0.5rem]">
                            <div className="h-6 w-6 rounded-full bg-neutral-200" />
                            <div className="h-5 w-32 bg-neutral-200 rounded-md" />
                        </div>
                        <div className="flex items-center gap-[0.5rem]">
                            <div className="h-6 w-6 rounded-full bg-neutral-200" />
                            <div className="h-5 w-36 bg-neutral-200 rounded-md" />
                        </div>
                    </div>
                    <div className="h-[3rem] w-[9rem] bg-neutral-200 rounded-full" />
                </div>

                <div className="flex flex-col gap-[2.5rem]">
                    <SectionSkeleton />
                    <SectionSkeleton />
                    <SectionSkeleton />
                </div>
            </div>
        </div>
    );
}

function SectionSkeleton() {
    return (
        <div className="flex flex-col gap-[1rem]">
            <div className="h-6 w-40 bg-neutral-200 rounded-md" />
            <ul className="list-disc pl-6 space-y-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <li key={idx} className="leading-relaxed">
                        <div className="h-4 w-full bg-neutral-200 rounded-md" />
                    </li>
                ))}
            </ul>
        </div>
    );
}