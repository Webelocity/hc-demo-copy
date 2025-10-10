import Banners from "@/components/Pages/HomePage/Banners/Banners";
import Categories from "@/components/Pages/HomePage/Categories/Categories";
import WeeklyOffers from "@/components/Pages/HomePage/WeeklyOffers/WeeklyOffers";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Banners />
      <WeeklyOffers />
      <Categories />
    </>
  );
}
