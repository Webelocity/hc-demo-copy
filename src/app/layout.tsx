import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/theme";
import TopBar from "@/components/Layout/TopBar/TopBar";
import Header from "@/components/Layout/Header/Header";
import JotaiProvider from "@/components/providers/JotaiProvider";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import PreFetcher from "@/components/shared/PreFetcher";
import CartDrawer from "@/components/Pages/Shop/Cart/CartDrawer/CartDrawer";
import PageLoader from "@/components/shared/PageLoader/PageLoader";
import { Suspense } from "react";
import CookieConsentBar from "@/components/shared/CookieConsentBar";

// Fonts from @fontsource-variable/* — no build-time HTTPS to Google Fonts (often
// breaks behind TLS-inspecting proxies: UNABLE_TO_VERIFY_LEAF_SIGNATURE).
const figtree = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-figtree",
  display: "swap",
});

const sora = localFont({
  src: "../../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hcinc.com'),
  title: {
    default: 'Home Central Stores | Hardware & Building Supplies in Owego, Vestal & Candor NY',
    template: '%s | Home Central Stores',
  },
  description:
    'Home Central Stores — your local hardware, lumber, tools, and building supply store in Owego, Vestal, and Candor, NY. Shop 60,000+ products online or visit us. Contractor Zone, custom paint, special ordering, and delivery available.',
  keywords: [
    'hardware store Owego NY',
    'building supplies Vestal NY',
    'lumber store Candor NY',
    'contractor supplies Southern Tier NY',
    'hardware store near me',
    'building materials Owego',
    'paint store Owego NY',
    'Home Central Stores',
    'special ordering hardware',
    'contractor zone NY',
  ],
  alternates: {
    canonical: 'https://www.hcinc.com',
  },
  openGraph: {
    type: 'website',
    siteName: 'Home Central Stores',
    locale: 'en_US',
    url: 'https://www.hcinc.com',
    title: 'Home Central Stores | Hardware & Building Supplies in Owego, Vestal & Candor NY',
    description:
      'Your local hardware, lumber, tools, and building supply store in Owego, Vestal, and Candor, NY. Contractor Zone, custom paint mixing, special ordering, and delivery available.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Central Stores | Hardware & Building Supplies in NY',
    description:
      'Hardware, lumber, tools, and building supplies in Owego, Vestal, and Candor NY. Shop 60,000+ products online or visit us.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    ...(process.env.NEXT_PUBLIC_FB_APP_ID && {
      'fb:app_id': process.env.NEXT_PUBLIC_FB_APP_ID,
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${sora.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <JotaiProvider>
            <PreFetcher />
            <TopBar />
            <Header />
            <Navbar />
            <div className='w-full'>
              <hr className='border-[var(--Neutral-100)]' />
            </div>
            {children}
            <CartDrawer />
            <Footer />
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <CookieConsentBar />
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
