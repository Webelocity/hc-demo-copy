import Banners from "@/components/Pages/HomePage/Banners/Banners";
import Categories from "@/components/Pages/HomePage/Categories/Categories";
import NewArrivals from "@/components/Pages/HomePage/NewArrivals/NewArrivals";
import Paint from "@/components/Pages/HomePage/Paint/Paint";
import QuoteRequest from "@/components/Pages/HomePage/QuoteRequest/QuoteRequest";
import Recommended from "@/components/Pages/HomePage/Recommended/Recommended";
import WeeklyOffers from "@/components/Pages/HomePage/WeeklyOffers/WeeklyOffers";

export default function Home() {
  return (
    <>
      <Banners />
      <WeeklyOffers />
      <Categories />
      <NewArrivals />
      <Paint />
      <Recommended />
      <QuoteRequest />

    </>
  );
}
