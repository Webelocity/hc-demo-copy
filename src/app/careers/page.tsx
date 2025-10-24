import CareersBanner from "@/components/Pages/Careers/CareersBanner/CareersBanner";
import Openings from "@/components/Pages/Careers/Openings/Openings";
import Oppurtunities from "@/components/Pages/Careers/Oppurtunities/Oppurtunities";
import WhyJoinUs from "@/components/Pages/Careers/WhyJoin/WhyJoin";
import WhyUs from "@/components/Pages/Careers/Whyus/WhyUs";

export default function Careers() {
    return (
        <>

            <CareersBanner />
            <WhyUs />
            <Oppurtunities />
            <Openings />
            <WhyJoinUs />
        </>
    );
}