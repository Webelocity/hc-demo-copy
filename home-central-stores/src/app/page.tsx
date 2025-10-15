import dynamic from "next/dynamic";
import Banners from "@/components/Pages/HomePage/Banners/Banners";

// Lazy load components with loading states
// Keep Banners and WeeklyOffers eager-loaded for above-the-fold content
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
      <FreeDelivery />
      <Rent />
      <GiftCards />
      <Brands />
      <Reviews />
      <ContactUs />
    </>
  );
}
