import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "@/components/Layout/TopBar/TopBar";
import Header from "@/components/Layout/Header/Header";
import JotaiProvider from "@/components/providers/JotaiProvider";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import { ToastContainer } from "react-toastify";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Central Stores",
  description: "Home Central Stores Ecommerce web app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} antialiased`}
      >
        <JotaiProvider>
          <TopBar />
          <Header />
          <Navbar />
          <div className="w-full">
            <hr className="border-[var(--Neutral-100)]" />
          </div>
          {children}
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </JotaiProvider>
      </body>
    </html>
  );
}
