type DemographicInformation = {
    name: string;
    referredBy: string; // select value
    email: string;
    phonePrimary: string; // E.164
    phoneSecondary?: string; // E.164 optional
    streetAddress: string;
    city: string;
    state: string; // US state ISO code or name
    zipCode: string;
};

type EmploymentData = {
    cv: File | null;
    dateAvailableToStart: string;
    salaryRequirement: string;
    whenCanYouStart: string; // yyyy-mm-dd
    daysAbleToWork: string[]; // e.g., ["Mon","Tue"]
    workedForHomeCentralBefore: "yes" | "no";
    workedForHomeCentralWhen?: string; // required only if yes
    isUsCitizen: "yes" | "no";
    legallyAllowedToWorkUs?: "yes" | "no";
    employmentType: "full-time" | "part-time";
    jobType: string; // select
    driversLicenseNumber: string;
    stateOfIssue: string; // US state
    skillsSummary?: string;
};

type JobExperience = {
    startDate: string; // yyyy-mm-dd
    endDate: string; // yyyy-mm-dd
    position: string;
    company: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    supervisorName: string;
    supervisorTitle: string;
    startingTitle: string;
    endingTitle: string;
    reasonForLeaving: string;
};

type OtherExperience = {
    educationalBackground?: string;
    additionalSkills?: string;
    retailExperience?: string;
    managementExperience?: string;
    maintenanceExperience?: string;
    inventoryExperience?: string;
    applicantNameSignature: string; // required
    additionalFiles?: File[];
    certificationsAccepted: boolean; // final checkbox
};

type JobApplication = {
    demographicInformation: DemographicInformation;
    employmentData: EmploymentData;
    previousEmploymentHistory: JobExperience[]; // may be empty
    otherExperience: OtherExperience;
};

export type { JobApplication, DemographicInformation, EmploymentData, JobExperience, OtherExperience };


