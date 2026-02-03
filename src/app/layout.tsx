import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
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

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hcinc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Home Central Stores | Hardware, Building Supplies & More in NY",
    template: "%s | Home Central Stores",
  },
  description:
    "Home Central Stores – your local hardware and building supplies destination in Owego, Vestal, and Candor, NY. Shop tools, paint, lumber, and get contractor rewards.",
  keywords: [
    "Home Central Stores",
    "hardware store",
    "building supplies",
    "Owego NY",
    "Vestal NY",
    "Candor NY",
    "lumber",
    "paint",
    "contractor supplies",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Home Central Stores",
    title: "Home Central Stores | Hardware, Building Supplies & More in NY",
    description:
      "Your local hardware and building supplies destination in Owego, Vestal, and Candor, NY. Shop tools, paint, lumber, and get contractor rewards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Central Stores | Hardware, Building Supplies & More in NY",
    description:
      "Your local hardware and building supplies destination in Owego, Vestal, and Candor, NY.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your Google Search Console verification when ready:
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${sora.variable} antialiased`}>
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
            <Suspense fallback={<PageLoader />}>
              {children}
            </Suspense>
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
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
