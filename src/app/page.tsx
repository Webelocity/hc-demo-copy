import dynamic from "next/dynamic";
import Banners from "@/components/Pages/HomePage/Banners/Banners";
import SpecialOrdering from "@/components/Pages/HomePage/SpecialOrdering/SpecialOrdering";

const WeeklyOffers = dynamic(
  () => import("@/components/Pages/HomePage/WeeklyOffers/WeeklyOffers"),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
);

const Categories = dynamic(
  () => import("@/components/Pages/HomePage/Categories/Categories"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const NewArrivals = dynamic(
  () => import("@/components/Pages/HomePage/NewArrivals/NewArrivals"),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
);

const Paint = dynamic(
  () => import("@/components/Pages/HomePage/Paint/Paint"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const Recommended = dynamic(
  () => import("@/components/Pages/HomePage/Recommended/Recommended"),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
);

const QuoteRequest = dynamic(
  () => import("@/components/Pages/HomePage/QuoteRequest/QuoteRequest"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const FreeDelivery = dynamic(
  () => import("@/components/Pages/HomePage/FreeDelivery/FreeDelivery"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const Rent = dynamic(
  () => import("@/components/Pages/HomePage/Rent/Rent"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const GiftCards = dynamic(
  () => import("@/components/Pages/HomePage/GiftCards/GiftCards"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const Brands = dynamic(
  () => import("@/components/Pages/HomePage/Brands/Brands"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const Reviews = dynamic(
  () => import("@/components/Pages/HomePage/Reviews/Reviews"),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
);

const ContactUs = dynamic(
  () => import("@/components/shared/ContactUs/ContactUs"),
  {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  }
);

const OwegoShowRoom = dynamic(
  () => import("@/components/Pages/HomePage/OwegoShowRoom/OwegoShowRoom"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

const BestSellers = dynamic(
  () => import("@/components/Pages/HomePage/BestSellers/BestSellers"),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  }
);

export default function Home() {
  return (
    <>
      <Banners />
      {/* <WeeklyOffers /> */}
      <Categories />
      <SpecialOrdering />
      <NewArrivals />
      <Paint />
      <Recommended />
      <QuoteRequest />
      <FreeDelivery />
      <OwegoShowRoom />
      <BestSellers />
      {/* <Rent /> */}
      <GiftCards />
      <Brands />
      <Reviews />
      <ContactUs />
    </>
  );
}
