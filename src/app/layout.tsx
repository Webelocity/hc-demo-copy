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

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Home Central Stores',
  description: 'Home Central Stores Ecommerce web app ',
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
            {children}
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
