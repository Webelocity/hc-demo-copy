import emailjs from '@emailjs/browser';
import type { ContactFormData } from '@/components/shared/ContactUs/ContactUsForm/ContactUsForm.schema';
import { getEmailJsClientConfig } from './getEmailJsClientConfig';

const CONTACT_EMAILJS_TEMPLATE_ID = 'template_ssjqhpo';

export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
    const { serviceId, publicKey } = getEmailJsClientConfig();

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
