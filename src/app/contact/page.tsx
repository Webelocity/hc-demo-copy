import Faqs from "@/components/Pages/ContactUs/Faqs";
import ContactUs from "@/components/shared/ContactUs/ContactUs";

export default function Contact() {
    return (
        <div className="py-[2.5rem] flex flex-col  items-center gap-[1.5rem]">
            <div className="flex baseContainer flex-col gap-[1rem] items-center w-full " >
                <h1 className="text-[3rem] font-bold text-center">Contact Us</h1>
                <p className="font-medium text-center">Get in touch with Home Central Stores for all your hardware, building supplies, and contractor rewards inquiries. </p>
                <p className="font-medium text-center">Our team in Owego, Vestal, and Candor, NY is ready to assist you with bulk orders, project support, and professional advice.</p>
            </div>
            <ContactUs version="contact" />
            <Faqs />
        </div>
    )
}