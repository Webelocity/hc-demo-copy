import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Banners from "@/components/Pages/HomePage/Banners/Banners";
import SpecialOrdering from "@/components/Pages/HomePage/SpecialOrdering/SpecialOrdering";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Home Central Stores – hardware, building supplies, tools, paint, and contractor rewards in Owego, Vestal, and Candor, NY. Shop online or visit our stores.",
  openGraph: {
    title: "Home Central Stores | Hardware, Building Supplies & More in NY",
    description:
      "Your local hardware and building supplies destination in Owego, Vestal, and Candor, NY. Shop tools, paint, lumber, and get contractor rewards.",
  },
};

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

const MobileBanner = dynamic(
  () => import("@/components/Pages/HomePage/MobileBanner/MobileBanner"),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': 'https://www.hcinc.com/#organization',
      name: 'Home Central Stores',
      url: 'https://www.hcinc.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.hcinc.com/assets/image/shared/logo.svg',
      },
      image: 'https://www.hcinc.com/assets/image/shared/logo.svg',
      description:
        'Home Central Stores is a local hardware, lumber, tools, and building supply retailer with locations in Owego, Vestal, and Candor, NY. Serving homeowners and contractors across the Southern Tier of New York with 60,000+ products available online and in-store.',
      telephone: '+1-607-687-3284',
      priceRange: '$$',
      paymentAccepted: 'Cash, Credit Card, Visa, Mastercard',
      currenciesAccepted: 'USD',
      areaServed: {
        '@type': 'State',
        name: 'New York',
      },
      sameAs: [
        'https://play.google.com/store/apps/details?id=com.toolswift.hc',
      ],
      hasMap: 'https://www.hcinc.com/locations',
      location: [
        {
          '@type': 'HardwareStore',
          '@id': 'https://www.hcinc.com/#location-owego',
          name: 'Home Central Stores — Owego',
          url: 'https://www.hcinc.com/locations',
          telephone: '+1-607-687-3284',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '151 Central Ave',
            addressLocality: 'Owego',
            addressRegion: 'NY',
            postalCode: '13827',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 42.1028,
            longitude: -76.2638,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
              opens: '07:00',
              closes: '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '07:00',
              closes: '17:00',
            },
          ],
        },
        {
          '@type': 'HardwareStore',
          '@id': 'https://www.hcinc.com/#location-vestal',
          name: 'Home Central Stores — Vestal',
          url: 'https://www.hcinc.com/locations',
          telephone: '+1-607-785-3307',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '199 Stage Rd',
            addressLocality: 'Vestal',
            addressRegion: 'NY',
            postalCode: '13850',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 42.0834,
            longitude: -76.0431,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
              opens: '07:00',
              closes: '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '07:00',
              closes: '17:00',
            },
          ],
        },
        {
          '@type': 'HardwareStore',
          '@id': 'https://www.hcinc.com/#location-candor',
          name: 'Home Central Stores — Candor',
          url: 'https://www.hcinc.com/locations',
          telephone: '+1-607-659-4205',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '309 Owego Rd',
            addressLocality: 'Candor',
            addressRegion: 'NY',
            postalCode: '13743',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 42.2290,
            longitude: -76.3407,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
              opens: '07:00',
              closes: '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '07:00',
              closes: '17:00',
            },
          ],
        },
        {
          '@type': 'HardwareStore',
          '@id': 'https://www.hcinc.com/#location-owego-showroom',
          name: 'Home Central Stores — Owego Showroom',
          url: 'https://www.hcinc.com/owego-showroom',
          telephone: '+1-607-223-2360',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '133 Central Ave',
            addressLocality: 'Owego',
            addressRegion: 'NY',
            postalCode: '13827',
            addressCountry: 'US',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.hcinc.com/#website',
      url: 'https://www.hcinc.com',
      name: 'Home Central Stores',
      publisher: { '@id': 'https://www.hcinc.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.hcinc.com/shop/catalogue?searchTerm={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.hcinc.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where are Home Central Stores located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Home Central Stores has four locations in the Southern Tier of New York: 151 Central Ave, Owego NY 13827 — 199 Stage Rd, Vestal NY 13850 — 309 Owego Rd, Candor NY 13743 — and the Owego Showroom at 133 Central Ave, Owego NY 13827.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Home Central offer delivery?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Home Central Stores offers delivery and job-site logistics for lumber, building materials, and supplies across the Southern Tier of New York.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Home Central have a contractor program?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Contractor Zone offers volume-based pricing, pro offers, special and custom orders, and sales tracking tools for contractors and trade professionals.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I order online from Home Central Stores?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Home Central Stores offers online ordering through their website with 60,000+ products, and a mobile app available on Android via Google Play.',
          },
        },
        {
          '@type': 'Question',
          name: 'What services does Home Central offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Home Central offers material cutting and pipe threading, tool repair and sharpening, blueprint takeoffs and project estimating, custom paint mixing and color matching, lock re-keying and key cutting, special ordering, and delivery.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Home Central do special ordering?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Home Central offers special ordering for thousands of products and supplies. Request a custom quote, enjoy bulk pricing, and their team will source exactly what your project needs.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.hcinc.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.hcinc.com/',
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Banners />
      <WeeklyOffers />
      <MobileBanner />
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
      {/* <GiftCards /> */}
      <Brands />
      <Reviews />
      <ContactUs />
    </>
  );
}
