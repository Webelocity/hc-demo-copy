import ServiceBanner from "@/components/Pages/Services/ServiceBanner/ServiceBanner";
import ServiceList from "@/components/Pages/Services/ServiceList/ServiceList";

export const dynamic = 'force-static';

export const metadata = {
    title: 'Our Services - Home Central Stores',
    description: 'Comprehensive services for contractors and homeowners',
};

export default function Services() {
    return (
        <>
            <ServiceBanner />
            <ServiceList />

        </>
    );
}