export function getEmailJsClientConfig() {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const publicKey = process.env.EMAILJS_USER_ID;

    if (!serviceId || !publicKey) {
        throw new Error(
            'EmailJS is not configured. Set EMAILJS_SERVICE_ID and EMAILJS_USER_ID in .env.local.',
        );
    }

    return { serviceId, publicKey };
}
