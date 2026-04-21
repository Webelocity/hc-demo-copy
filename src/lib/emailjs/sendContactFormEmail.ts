import emailjs from '@emailjs/browser';
import type { ContactFormData } from '@/components/shared/ContactUs/ContactUsForm/ContactUsForm.schema';

const CONTACT_EMAILJS_TEMPLATE_ID = 'template_ssjqhpo';

function getConfig() {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const publicKey = process.env.EMAILJS_USER_ID;

    if (!serviceId || !publicKey) {
        throw new Error(
            'EmailJS is not configured. Set EMAILJS_SERVICE_ID and EMAILJS_USER_ID in .env.local.',
        );
    }

    return { serviceId, publicKey };
}

export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
    const { serviceId, publicKey } = getConfig();

    await emailjs.send(
        serviceId,
        CONTACT_EMAILJS_TEMPLATE_ID,
        {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phoneNumber,
            message: data.message,
        },
        { publicKey },
    );
}
