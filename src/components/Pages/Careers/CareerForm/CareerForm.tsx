"use client";

import React, { useMemo, useState } from "react";
import Stepper from "./Stepper";
import { useFieldArray, Controller, useForm } from "react-hook-form";
import type { JobApplication, JobExperience } from "@/types/jobApplication";
import { State, City } from "country-state-city";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { MuiTelInput } from "mui-tel-input";
import DropzoneUploader from "@/components/shared/DropzoneUploader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/shared/Button";

type FormValues = JobApplication;

const steps = [
    { id: 1, title: "Demographic Information" },
    { id: 2, title: "Employment Data" },
    { id: 3, title: "Previous Employment History" },
    { id: 4, title: "Other Experience" },
];

const workingDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const referralOptions = ["Company Website", "Friend", "Indeed", "LinkedIn", "Other"];
const jobTypeOptions = ["Cashier", "Stock Associate", "Sales", "Warehouse", "Other"];

export default function CareerForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState([false, false, false, false]);

    const {
        control,
        handleSubmit,
        trigger,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            demographicInformation: {
                name: "",
                referredBy: "",
                email: "",
                phonePrimary: "",
                phoneSecondary: "",
                streetAddress: "",
                city: "",
                state: "",
                zipCode: "",
            },
            employmentData: {
                cv: null,
                dateAvailableToStart: "",
                salaryRequirement: "",
                timeYouAreAvailableToWork: "",
                daysAbleToWork: [],
                workedForHomeCentralBefore: "no",
                workedForHomeCentralWhen: "",
                isUsCitizen: "yes",
                legallyAllowedToWorkUs: "yes",
                employmentType: "full-time",
                jobType: "",
                driversLicenseNumber: "",
                stateOfIssue: "",
                skillsSummary: "",
            },
            previousEmploymentHistory: [],
            otherExperience: {
                educationalBackground: "",
                additionalSkills: "",
                retailExperience: "",
                managementExperience: "",
                maintenanceExperience: "",
                inventoryExperience: "",
                applicantNameSignature: "",
                additionalFiles: [],
                certificationsAccepted: false,
            },
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "previousEmploymentHistory",
    });

    const selectedState = watch("demographicInformation.state");
    // const selectedEmploymentState = watch("employmentData.stateOfIssue");
    const priorExperiences = watch("previousEmploymentHistory");
    const workedBefore = watch("employmentData.workedForHomeCentralBefore");

    const usStates = useMemo(() => State.getStatesOfCountry("US"), []);
    const citiesForSelectedState = useMemo(() => {
        if (!selectedState) return [];
        const st = usStates.find((s) => s.isoCode === selectedState || s.name === selectedState);
        if (!st) return [];
        return City.getCitiesOfState("US", st.isoCode);
    }, [selectedState, usStates]);

    const onNext = async () => {
        const fieldsToValidate: (keyof FormValues | string)[] = [];
        if (activeStep === 0) {
            fieldsToValidate.push(
                "demographicInformation.name",
                "demographicInformation.referredBy",
                "demographicInformation.email",
                "demographicInformation.phonePrimary",
                "demographicInformation.streetAddress",
                "demographicInformation.city",
                "demographicInformation.zipCode",
                "demographicInformation.state",
            );
        } else if (activeStep === 1) {
            fieldsToValidate.push(
                "employmentData.cv",
                "employmentData.dateAvailableToStart",
                "employmentData.salaryRequirement",
                "employmentData.timeYouAreAvailableToWork",
                "employmentData.workedForHomeCentralBefore",
                ...(workedBefore === "yes" ? ["employmentData.workedForHomeCentralWhen"] : []),
                "employmentData.isUsCitizen",
                "employmentData.legallyAllowedToWorkUs",
                "employmentData.employmentType",
                "employmentData.jobType",
                "employmentData.driversLicenseNumber",
                "employmentData.stateOfIssue",
            );
        } else if (activeStep === 2) {
            if (priorExperiences.length > 0) {
                priorExperiences.forEach((_, idx) => {
                    fieldsToValidate.push(
                        `previousEmploymentHistory.${idx}.startDate`,
                        `previousEmploymentHistory.${idx}.endDate`,
                        `previousEmploymentHistory.${idx}.position`,
                        `previousEmploymentHistory.${idx}.company`,
                        `previousEmploymentHistory.${idx}.streetAddress`,
                        `previousEmploymentHistory.${idx}.city`,
                        `previousEmploymentHistory.${idx}.state`,
                        `previousEmploymentHistory.${idx}.zipCode`,
                        `previousEmploymentHistory.${idx}.supervisorName`,
                        `previousEmploymentHistory.${idx}.supervisorTitle`,
                        `previousEmploymentHistory.${idx}.startingTitle`,
                        `previousEmploymentHistory.${idx}.endingTitle`,
                        `previousEmploymentHistory.${idx}.reasonForLeaving`,
                    );
                });
            }
        } else if (activeStep === 3) {
            fieldsToValidate.push("otherExperience.applicantNameSignature", "otherExperience.certificationsAccepted");
        }

        const valid = await trigger(fieldsToValidate as any, { shouldFocus: true });
        if (!valid) return;

        const nextIndex = Math.min(activeStep + 1, steps.length - 1);
        const updated = [...completed];
        updated[activeStep] = true;
        setCompleted(updated);
        setActiveStep(nextIndex);
    };

    const onBack = () => {
        setActiveStep((s) => Math.max(s - 1, 0));
    };

    const onSubmit = (values: FormValues) => {
        if (!values.otherExperience.applicantNameSignature) {
            toast.error("Please sign before submitting.");
            return;
        }
        if (!values.otherExperience.certificationsAccepted) {
            toast.error("Please accept the certifications before submitting.");
            return;
        }
        console.log("JobApplication submitted:", values);
        toast.success("Application submitted successfully.");
    };

    const addExperience = () => {
        const newExp: JobExperience = {
            startDate: "",
            endDate: "",
            position: "",
            company: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            supervisorName: "",
            supervisorTitle: "",
            startingTitle: "",
            endingTitle: "",
            reasonForLeaving: "",
        };
        append(newExp);
    };

    return (
        <div className="baseContainer py-[2rem]">
            <div className="maxWidth grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-[1.5rem]">
                <div>
                    <Stepper steps={steps} activeStep={activeStep} completed={completed} />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
                        {/* Step content */}
                        {activeStep === 0 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[1.5rem]">
                                    <Controller
                                        name="demographicInformation.name"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <TextField {...field} label="Name" required error={!!errors.demographicInformation?.name} helperText={errors.demographicInformation?.name?.message} />
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.referredBy"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <FormControl required error={!!errors.demographicInformation?.referredBy}>
                                                <InputLabel>How were you referred</InputLabel>
                                                <Select label="How were you referred" {...field}>
                                                    {referralOptions.map((opt) => (
                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{errors.demographicInformation?.referredBy?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.email"
                                        control={control}
                                        rules={{ required: "Required", pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "Invalid email" } }}
                                        render={({ field }) => (
                                            <TextField {...field} label="Email Address" required error={!!errors.demographicInformation?.email} helperText={errors.demographicInformation?.email?.message} />
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.phonePrimary"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <MuiTelInput {...field} defaultCountry="US" forceCallingCode label="Phone number 1" required className="w-full" error={!!errors.demographicInformation?.phonePrimary} helperText={errors.demographicInformation?.phonePrimary?.message as any} />
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.phoneSecondary"
                                        control={control}
                                        render={({ field }) => (
                                            <MuiTelInput {...field} defaultCountry="US" forceCallingCode label="Phone number 2 (optional)" className="w-full" />
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.streetAddress"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <TextField {...field} label="Street address" required error={!!errors.demographicInformation?.streetAddress} helperText={errors.demographicInformation?.streetAddress?.message} />
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.state"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <FormControl required error={!!errors.demographicInformation?.state}>
                                                <InputLabel>State</InputLabel>
                                                <Select label="State" {...field}>
                                                    {usStates.map((s) => (
                                                        <MenuItem key={s.isoCode} value={s.isoCode}>{s.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{errors.demographicInformation?.state?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.city"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <FormControl required error={!!errors.demographicInformation?.city}>
                                                <InputLabel>City</InputLabel>
                                                <Select label="City" {...field}>
                                                    {citiesForSelectedState.map((c) => (
                                                        <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{errors.demographicInformation?.city?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="demographicInformation.zipCode"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <TextField {...field} label="zip code" required error={!!errors.demographicInformation?.zipCode} helperText={errors.demographicInformation?.zipCode?.message} />
                                        )}
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="primary" onClick={onNext}>Next</Button>
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className="space-y-6">
                                {/* CV uploader */}
                                <div>
                                    <InputLabel required>CV (PDF or DOCX)</InputLabel>
                                    <Controller
                                        name="employmentData.cv"
                                        control={control}
                                        rules={{
                                            validate: (file) => !!file || "CV is required",
                                        }}
                                        render={({ field }) => (
                                            <DropzoneUploader
                                                multiple={false}
                                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                hint="Supports: pdf, word"
                                                value={field.value as File | null}
                                                onChange={(val) => {
                                                    const f = (val as File | null);
                                                    if (f && !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
                                                        toast.error("CV must be a PDF or DOCX file.");
                                                        return;
                                                    }
                                                    field.onChange(val);
                                                }}
                                                errorText={errors.employmentData?.cv?.message as any}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <Controller
                                        name="employmentData.dateAvailableToStart"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Date Available to Start"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(val) => field.onChange(val ? dayjs(val as any).format('YYYY-MM-DD') : "")}
                                                slotProps={{ textField: { required: true, error: !!errors.employmentData?.dateAvailableToStart, helperText: errors.employmentData?.dateAvailableToStart?.message } }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="employmentData.salaryRequirement"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <TextField {...field} type="text" label="Salary Requirement" required error={!!errors.employmentData?.salaryRequirement} helperText={errors.employmentData?.salaryRequirement?.message} />
                                        )}
                                    />
                                    <Controller
                                        name="employmentData.timeYouAreAvailableToWork"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="When can you start"
                                                value={field.value ? dayjs(field.value) : null}
                                                onChange={(val) => field.onChange(val ? dayjs(val as any).format('YYYY-MM-DD') : "")}
                                                slotProps={{ textField: { required: true, error: !!errors.employmentData?.timeYouAreAvailableToWork, helperText: errors.employmentData?.timeYouAreAvailableToWork?.message } }}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Days able to work */}
                                <div>
                                    <p className="text-[0.875rem] text-[var(--Neutral-500)] font-medium">Days you are able to work<span className="text-red-600 text-[1rem] ml-1">*</span></p>

                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {workingDays.map((d) => (
                                            <Controller
                                                key={d}
                                                name="employmentData.daysAbleToWork"
                                                control={control}
                                                render={({ field }) => {
                                                    const selected = field.value || [];
                                                    const checked = selected.includes(d);
                                                    const toggle = () => {
                                                        if (checked) field.onChange(selected.filter((x: string) => x !== d));
                                                        else field.onChange([...selected, d]);
                                                    };
                                                    return (
                                                        <FormControlLabel control={<Checkbox checked={checked} onChange={toggle} />} label={d} />
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Worked for HC */}
                                <div className="grid grid-cols-1 gap-4">
                                    <FormControl required error={!!errors.employmentData?.workedForHomeCentralBefore}>
                                        <p className="text-[0.875rem] text-[var(--Neutral-500)] font-medium">Have you ever worked for Home Central?<span className="text-red-600 text-[1rem] ml-1">*</span></p>
                                        <Controller
                                            name="employmentData.workedForHomeCentralBefore"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <RadioGroup row {...field}>
                                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                                </RadioGroup>
                                            )}
                                        />
                                        <FormHelperText>{errors.employmentData?.workedForHomeCentralBefore?.message}</FormHelperText>
                                    </FormControl>
                                    {workedBefore === "yes" && (
                                        <Controller
                                            name="employmentData.workedForHomeCentralWhen"
                                            control={control}
                                            rules={{ required: "Required when answered Yes" }}
                                            render={({ field }) => (
                                                <TextField {...field} label="When" required error={!!errors.employmentData?.workedForHomeCentralWhen} helperText={errors.employmentData?.workedForHomeCentralWhen?.message} />
                                            )}
                                        />
                                    )}
                                </div>

                                {/* Citizenship */}
                                <div className="grid grid-cols-1 gap-4">
                                    <FormControl required error={!!errors.employmentData?.isUsCitizen}>
                                        <p className="text-[0.875rem] text-[var(--Neutral-500)] font-medium">Are you a citizen of the United States?<span className="text-red-600 text-[1rem] ml-1">*</span></p>
                                        <Controller
                                            name="employmentData.isUsCitizen"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <RadioGroup row {...field}>
                                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                                </RadioGroup>
                                            )}
                                        />
                                        <FormHelperText>{errors.employmentData?.isUsCitizen?.message}</FormHelperText>
                                    </FormControl>
                                    <FormControl required error={!!errors.employmentData?.legallyAllowedToWorkUs}>
                                        <p className="text-[0.875rem] text-[var(--Neutral-500)] font-medium">Have you ever worked for Home Central?<span className="text-red-600 text-[1rem] ml-1">*</span></p>
                                        <Controller
                                            name="employmentData.legallyAllowedToWorkUs"
                                            control={control}
                                            rules={{ required: "Required" }}
                                            render={({ field }) => (
                                                <RadioGroup row {...field}>
                                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                                </RadioGroup>
                                            )}
                                        />
                                        <FormHelperText>{errors.employmentData?.legallyAllowedToWorkUs?.message}</FormHelperText>
                                    </FormControl>
                                </div>

                                {/* Employment specifics */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <Controller
                                        name="employmentData.employmentType"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <FormControl required error={!!errors.employmentData?.employmentType}>
                                                <InputLabel>Type of employment desired</InputLabel>
                                                <Select label="Type of employment desired" {...field}>
                                                    <MenuItem value="full-time">full time</MenuItem>
                                                    <MenuItem value="part-time">part-time</MenuItem>
                                                </Select>
                                                <FormHelperText>{errors.employmentData?.employmentType?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="employmentData.jobType"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <FormControl required error={!!errors.employmentData?.jobType}>
                                                <InputLabel>Type of Job you are Applying for?</InputLabel>
                                                <Select label="Type of Job you are Applying for?" {...field}>
                                                    {jobTypeOptions.map((opt) => (
                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{errors.employmentData?.jobType?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="employmentData.driversLicenseNumber"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <TextField {...field} label="Driver's license number" required error={!!errors.employmentData?.driversLicenseNumber} helperText={errors.employmentData?.driversLicenseNumber?.message} />
                                        )}
                                    />
                                </div>
                                <div className="w-full">
                                    <Controller
                                        name="employmentData.stateOfIssue"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <FormControl className="w-full" required error={!!errors.employmentData?.stateOfIssue}>
                                                <InputLabel>State of Issue</InputLabel>
                                                <Select label="State of Issue" {...field}>
                                                    {usStates.map((s) => (
                                                        <MenuItem key={s.isoCode} value={s.isoCode}>{s.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{errors.employmentData?.stateOfIssue?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name="employmentData.skillsSummary"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} label="Please summarize your special skills or qualifications" multiline minRows={3} />
                                        )}
                                    />

                                </div>

                                <div className="flex justify-between gap-3">
                                    <Button variant="outline" onClick={onBack}>Back</Button>
                                    <Button variant="primary" onClick={onNext}>Next</Button>
                                </div>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Previous Employment History</h3>
                                    <Button variant="outline" onClick={addExperience}>Add work experience</Button>
                                </div>
                                {fields.length === 0 && (
                                    <p className="text-[var(--Neutral-700)]">No job experiences added.</p>
                                )}
                                {fields.map((field, index) => {
                                    const requiredNow = priorExperiences.length > 0;
                                    return (
                                        <>
                                            {index > 0 && <hr className="border-[var(--Neutral-200)]" />}

                                            <div key={field.id} className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold">Job Experience #{index + 1}</h4>
                                                    <Button color="error" onClick={() => remove(index)}>Remove</Button>
                                                </div>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.startDate`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                label="Start Date"
                                                                value={field.value ? dayjs(field.value) : null}
                                                                onChange={(val) => field.onChange(val ? dayjs(val as any).format('YYYY-MM-DD') : "")}
                                                                slotProps={{ textField: { required: !!requiredNow, error: !!errors.previousEmploymentHistory?.[index]?.startDate, helperText: errors.previousEmploymentHistory?.[index]?.startDate?.message } }}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.endDate`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                label="End Date"
                                                                value={field.value ? dayjs(field.value) : null}
                                                                onChange={(val) => field.onChange(val ? dayjs(val as any).format('YYYY-MM-DD') : "")}
                                                                slotProps={{ textField: { required: !!requiredNow, error: !!errors.previousEmploymentHistory?.[index]?.endDate, helperText: errors.previousEmploymentHistory?.[index]?.endDate?.message } }}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.position`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Postion" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.position} helperText={errors.previousEmploymentHistory?.[index]?.position?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.company`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Company" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.company} helperText={errors.previousEmploymentHistory?.[index]?.company?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.streetAddress`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Street Address" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.streetAddress} helperText={errors.previousEmploymentHistory?.[index]?.streetAddress?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.city`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="City" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.city} helperText={errors.previousEmploymentHistory?.[index]?.city?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.state`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <FormControl required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.state}>
                                                                <InputLabel>State</InputLabel>
                                                                <Select label="State" {...field}>
                                                                    {usStates.map((s) => (
                                                                        <MenuItem key={s.isoCode} value={s.isoCode}>{s.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                                <FormHelperText>{errors.previousEmploymentHistory?.[index]?.state?.message}</FormHelperText>
                                                            </FormControl>
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.zipCode`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Zip" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.zipCode} helperText={errors.previousEmploymentHistory?.[index]?.zipCode?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.supervisorName`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Supervisor Name" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.supervisorName} helperText={errors.previousEmploymentHistory?.[index]?.supervisorName?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.supervisorTitle`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Supervisor title" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.supervisorTitle} helperText={errors.previousEmploymentHistory?.[index]?.supervisorTitle?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.startingTitle`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Starting Title" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.startingTitle} helperText={errors.previousEmploymentHistory?.[index]?.startingTitle?.message} />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`previousEmploymentHistory.${index}.endingTitle`}
                                                        control={control}
                                                        rules={{ required: requiredNow ? "Required" : false }}
                                                        render={({ field }) => (
                                                            <TextField {...field} label="Ending Title" required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.endingTitle} helperText={errors.previousEmploymentHistory?.[index]?.endingTitle?.message} />
                                                        )}
                                                    />
                                                </div>
                                                <Controller
                                                    name={`previousEmploymentHistory.${index}.reasonForLeaving`}
                                                    control={control}
                                                    rules={{ required: requiredNow ? "Required" : false }}
                                                    render={({ field }) => (
                                                        <TextField {...field} label="Reason for leaving" multiline minRows={3} required={!!requiredNow} error={!!errors.previousEmploymentHistory?.[index]?.reasonForLeaving} helperText={errors.previousEmploymentHistory?.[index]?.reasonForLeaving?.message} />
                                                    )}
                                                />
                                            </div>
                                        </>

                                    );
                                })}

                                <div className="flex justify-between gap-3">
                                    <Button variant="outline" onClick={onBack}>Back</Button>
                                    <Button variant="primary" onClick={onNext}>Next</Button>
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className="flex flex-col gap-[1rem]">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <Controller
                                        name="otherExperience.educationalBackground"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl>
                                                <InputLabel>Educational Background</InputLabel>
                                                <Select label="Educational Background" {...field}>
                                                    {[
                                                        "High School",
                                                        "Some College",
                                                        "Associate Degree",
                                                        "Bachelor's Degree",
                                                        "Master's Degree",
                                                        "Other",
                                                    ].map((opt) => (
                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller name="otherExperience.additionalSkills" control={control} render={({ field }) => (
                                        <TextField {...field} label="Addional skills" />
                                    )} />
                                    <Controller name="otherExperience.retailExperience" control={control} render={({ field }) => (
                                        <TextField {...field} label="Retail Experience" />
                                    )} />
                                    <Controller name="otherExperience.managementExperience" control={control} render={({ field }) => (
                                        <TextField {...field} label="Management Experience" />
                                    )} />
                                    <Controller name="otherExperience.maintenanceExperience" control={control} render={({ field }) => (
                                        <TextField {...field} label="Maintenence Experience" />
                                    )} />
                                    <Controller name="otherExperience.inventoryExperience" control={control} render={({ field }) => (
                                        <TextField {...field} label="Inventory Experience" />
                                    )} />
                                </div>

                                <Controller
                                    name="otherExperience.applicantNameSignature"
                                    control={control}
                                    rules={{ required: "Required" }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Applicant Name / Electronic Signature" required error={!!errors.otherExperience?.applicantNameSignature} helperText={errors.otherExperience?.applicantNameSignature?.message} />
                                    )}
                                />

                                <div>
                                    <InputLabel>Addional Files</InputLabel>
                                    <Controller
                                        name="otherExperience.additionalFiles"
                                        control={control}
                                        render={({ field }) => (
                                            <DropzoneUploader
                                                multiple
                                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                hint="Supports: pdf, word, images"
                                                value={field.value as File[]}
                                                onChange={(val) => field.onChange(val)}
                                            />
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="otherExperience.certificationsAccepted"
                                    control={control}
                                    rules={{ required: "Required" }}
                                    render={({ field }) => (
                                        <FormControl error={!!errors.otherExperience?.certificationsAccepted}>
                                            <FormControlLabel
                                                control={<Checkbox checked={!!field.value} onChange={(e, v) => field.onChange(v)} />}
                                                label="By submitting the information below the applicant attests that they are able to legally seek employment in the United States and the following certifications:"
                                            />
                                            <FormHelperText>{errors.otherExperience?.certificationsAccepted?.message as any}</FormHelperText>
                                        </FormControl>
                                    )}
                                />

                                <div className="flex justify-between gap-3">
                                    <Button variant="outline" onClick={onBack}>Back</Button>
                                    <Button variant="primary" type="submit">Submit Application</Button>
                                </div>
                            </div>
                        )}
                    </form>
                </LocalizationProvider>
            </div>
        </div>
    );
}
