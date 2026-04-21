import emailjs from '@emailjs/browser';
import type { JobApplication, JobExperience } from '@/types/jobApplication';
import { getEmailJsClientConfig } from './getEmailJsClientConfig';

const CAREER_EMAILJS_TEMPLATE_ID = 'template_xmsq8rl';

function formatPreviousEmployment(history: JobExperience[]): string {
    if (!history.length) {
        return 'None provided';
    }

    return history
        .map((job, i) =>
            [
                `--- Job ${i + 1} ---`,
                `Start: ${job.startDate}`,
                `End: ${job.endDate}`,
                `Position: ${job.position}`,
                `Company: ${job.company}`,
                `Address: ${job.streetAddress}, ${job.city}, ${job.state} ${job.zipCode}`,
                `Supervisor: ${job.supervisorName} (${job.supervisorTitle})`,
                `Starting title: ${job.startingTitle}`,
                `Ending title: ${job.endingTitle}`,
                `Reason for leaving: ${job.reasonForLeaving}`,
            ].join('\n'),
        )
        .join('\n\n');
}

function buildCareerTemplateParams(data: JobApplication): Record<string, string> {
    const d = data.demographicInformation;
    const e = data.employmentData;
    const o = data.otherExperience;

    return {
        name: d.name,
        referredBy: d.referredBy,
        email: d.email,
        phonePrimary: d.phonePrimary,
        phoneSecondary: d.phoneSecondary ?? '',
        streetAddress: d.streetAddress,
        city: d.city,
        state: d.state,
        zipCode: d.zipCode,

        dateAvailableToStart: e.dateAvailableToStart,
        salaryRequirement: e.salaryRequirement,
        timeYouAreAvailableToWork: e.timeYouAreAvailableToWork,
        daysAbleToWork: e.daysAbleToWork.join(', '),
        workedForHomeCentralBefore: e.workedForHomeCentralBefore,
        workedForHomeCentralWhen: e.workedForHomeCentralWhen ?? '',
        isUsCitizen: e.isUsCitizen,
        legallyAllowedToWorkUs: e.legallyAllowedToWorkUs ?? '',
        employmentType: e.employmentType,
        jobType: e.jobType,
        driversLicenseNumber: e.driversLicenseNumber,
        stateOfIssue: e.stateOfIssue,
        skillsSummary: e.skillsSummary ?? '',
        cvFileName: e.cv?.name ?? '',

        previousEmploymentHistory: formatPreviousEmployment(data.previousEmploymentHistory),

        educationalBackground: o.educationalBackground ?? '',
        additionalSkills: o.additionalSkills ?? '',
        retailExperience: o.retailExperience ?? '',
        managementExperience: o.managementExperience ?? '',
        warehouseDriverExperience: o.warehouseDriverExperience ?? '',
        inventoryExperience: o.inventoryExperience ?? '',
        applicantNameSignature: o.applicantNameSignature,
        certificationsAccepted: String(o.certificationsAccepted),
        additionalFileNames:
            o.additionalFiles?.map((f) => f.name).filter(Boolean).join(', ') ?? '',
    };
}

export async function sendCareerApplicationEmail(data: JobApplication): Promise<void> {
    const { serviceId, publicKey } = getEmailJsClientConfig();

    await emailjs.send(
        serviceId,
        CAREER_EMAILJS_TEMPLATE_ID,
        buildCareerTemplateParams(data),
        { publicKey },
    );
}
