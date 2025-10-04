import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import Navbar from "@/components/Layout/Navbar/Navbar";
import JotaiProvider from "@/components/providers/JotaiProvider";

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
          <Header />
          <Navbar />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
