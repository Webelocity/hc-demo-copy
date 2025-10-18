import Explore from "@/components/Pages/OwegoShowroom/Explore/Explore";
import LocalHub from "@/components/Pages/OwegoShowroom/LocalHub/LocalHub";
import OwegoShowroomBanner from "@/components/Pages/OwegoShowroom/OwegoShowroomBanner/OwegoShowroomBanner";
import Partners from "@/components/Pages/OwegoShowroom/Partners/Partners";
import ReachOut from "@/components/Pages/OwegoShowroom/ReachOut/ReachOut";
import Vision from "@/components/Pages/OwegoShowroom/Vision/Vision";
import ContactUs from "@/components/shared/ContactUs/ContactUs";

export default function OwegoShowroom() {
    return (
        <>
            <OwegoShowroomBanner />
            <LocalHub />
            <Vision />
            <ReachOut />
            <Partners />
            <Explore />
            <ContactUs />

        </>
    );
}