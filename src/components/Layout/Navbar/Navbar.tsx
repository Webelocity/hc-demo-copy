"use client";

import Button from "@/components/shared/Button";
import Link from "next/link";
import { PiListBold } from "react-icons/pi";
import { useState } from "react";
import MegaMenu from "../MegaMenu/MegaMenu";
import QuoteRequestPopup from "@/components/Pages/HomePage/QuoteRequest/QuoteRequestPopup";

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const onCloseMegaMenu = () => {
    setIsMegaMenuOpen(false);
  }
  return (
    <nav className={"relative baseContainer py-[1rem]"}>
      <div className="hidden lg:flex  justify-between items-center maxWidth">
        <div className="flex items-center">
          <Button
            variant={isMegaMenuOpen ? "secondary" : "outline"}
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          >
            <PiListBold className="text-2xl cursor-pointer " />
            Shop
          </Button>
        </div>
        <ul className="flex items-center gap-[1rem] text-[1rem] font-medium">
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/services">Services</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/contractor-zone">Contractor Zone</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/owego-showroom">Owego Showroom</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/locations">Locations</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/about-us">About</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/careers">Careers</Link>
          </li>
          <li className="py-[0.625rem] px-[1rem]">
            <Link href="/history">History</Link>
          </li>
        </ul>
        <div className="flex items-center">
          <QuoteRequestPopup
            dashboardUrl={process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}
            triggerLabel="Request a Quote"
          />        </div>
      </div>

      {isMegaMenuOpen && <MegaMenu isOpen={isMegaMenuOpen} onClose={onCloseMegaMenu} />}
    </nav>
  );
}
