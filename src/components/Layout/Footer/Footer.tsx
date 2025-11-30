import QuoteRequestPopup from "@/components/Pages/HomePage/QuoteRequest/QuoteRequestPopup";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { FaCcAmex, FaCcDiscover, FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
  return (
    <div className="baseContainer bg-[var(--Primary-50)]">
      <footer className="maxWidth flex flex-col gap-[1.75rem] justify-between items-center pt-[6.25rem] pb-[3.5rem] ">
        <div className="flex flex-col md:flex-row gap-[1.75rem] w-full">
          <div className="flex-1 flex flex-col gap-[1.5rem] justify-start items-start">
            <div className="relative  w-[10rem] h-[7rem]">
              <Image
                src="/assets/image/shared/logo.svg"
                alt="Home Central Stores Logo"
                fill
                priority
              />
            </div>
            <div className="text-[var(--Neutral-500)] font-medium text-[1rem]">
              Your Local Home Improvement & Building Supplies Store with locations
              in Vestal, Owego, and Candor, NY. Currently accepting applications
              for full and part-time retail sales associates.
            </div>
            <div className="text-[1.125rem] font-semibold text-[var(--Neutral-800)]">
              Download our App
            </div>
            <div className="h-[2.1rem] flex gap-[0.5rem] flex-wrap">
              <div className="relative w-[7.25rem] h-[3.1rem] cursor-pointer">
                <Image src="/assets/icon/Apple.svg" alt="Apple" fill />
              </div>
              <Link
                href="https://play.google.com/store/apps/details?id=com.toolswift.hc"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-[7.25rem] h-[3.1rem] cursor-pointer"
              >
                <Image src="/assets/icon/PlayStore.svg" alt="PlayStore" fill />
              </Link>
            </div>
          </div>
          <div className="flex-[5]">
            <div className="flex flex-col md:flex-row justify-start  gap-[1.5rem]">
              <div className="flex-1 flex flex-col gap-[1rem]">
                <span className="text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                  General
                </span>
                <Link
                  href={"/"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Home
                </Link>
                <Link
                  href={"/about-us"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  About
                </Link>
                <Link
                  href={"/services"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Services
                </Link>
                <Link
                  href={"/locations"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Locations
                </Link>
                <Link
                  href={"/contact"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Contact
                </Link>
                <Link
                  href={"/team"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Team
                </Link>
                <Link
                  href={"/careers"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Careers
                </Link>
                <Link
                  href={"/history"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  History
                </Link>
              </div>
              {/* Services */}
              <div className="flex-1 flex flex-col gap-[1rem]">
                <span className="text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                  Services
                </span>
                <Link
                  href={"/services"}
                  className="text-[0.9rem] text-[var(--Neutral-800)] flex items-center gap-[0.5rem]"
                >
                  All Services <GoArrowUpRight className="text-2xl" />
                </Link>
                <Link
                  href={"/paint"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Custom Paint
                </Link>
                <Link
                  href={"/special-ordering"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Special Ordering
                </Link>
              </div>

              <div className="flex-1 flex flex-col gap-[1rem]">
                <span className="text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                  Shop
                </span>
                <Link
                  href={"/shop/catalogue?page=1"}
                  className="text-[0.9rem] text-[var(--Neutral-800)] flex items-center gap-[0.5rem]"
                >
                  All Products <GoArrowUpRight className="text-2xl" />
                </Link>
                <QuoteRequestPopup
                  dashboardUrl={Customer_Dashboard_Url}
                  triggerLabel="Quote Request"
                  triggerVariant="link"
                  triggerClassName="text-start"
                />
                <div className="flex items-center gap-[0.5rem]">
                  <span className="relative w-[3.7rem] h-[2.7rem]">
                    <Image src="/assets/icon/VISA.svg" alt="Visa" fill />
                  </span>
                  <span className="relative w-[2.5rem] h-[2.5rem]">
                    <Image
                      src="/assets/icon/Mastercard.svg"
                      alt="Mastercard"
                      fill
                    />
                  </span>
                  <span>
                    <FaCcDiscover className="text-[var(--Colors-Neutral-700)] w-[2.5rem] h-[2.5rem]" />

                  </span>
                  <span>
                    <FaCcAmex className="text-[var(--Colors-Neutral-700)] w-[2.5rem] h-[2.5rem]" />

                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[1rem]">
                <span className="text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                  Support
                </span>
                <Link
                  href={"/policies?tab=privacy-policy"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={"/policies?tab=terms-of-use"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href={"/policies?tab=return-refund-policy"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Return Policy
                </Link>
                <Link
                  href={"/policies?tab=shipping-delivery-policy"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Shipping and Delivery Policy
                </Link>
                <Link
                  href={"/"}
                  className="text-[0.9rem] text-[var(--Neutral-800)]"
                >
                  Resources
                </Link>
                <div className="flex items-center gap-[1.5rem]">
                  <FaFacebook className="text-[1.5rem] cursor-pointer" />
                  <FaInstagram className="text-[1.5rem] cursor-pointer" />
                  <FaXTwitter className="text-[1.5rem] cursor-pointer" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[1rem]">
                <span className="text-[1.25rem] font-bold text-[var(--Neutral-800)]">
                  Branches
                </span>
                <div className="flex flex-col gap-[1rem]">
                  <span className="text-[1rem] font-bold text-[var(--Neutral-800)]">
                    Owego, NY
                  </span>
                  <div className="flex flex-col ">
                    <p className="">151 Central Ave. Owego, NY 13827</p>
                    <p className="text-[var(--primary-500-main)]">
                      (607) 687-3284
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <span className="text-[1rem] font-bold text-[var(--Neutral-800)]">
                    Vestal, NY
                  </span>
                  <div className="flex flex-col ">
                    <p className="">199 Stage Rd. Vestal, NY 13850</p>
                    <p className="text-[var(--primary-500-main)]">
                      (607) 785-3307
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <span className="text-[1rem] font-bold text-[var(--Neutral-800)]">
                    Candor, NY
                  </span>
                  <div className="flex flex-col ">
                    <p className="">309 Owego Rd. Candor, NY 13743</p>
                    <p className="text-[var(--primary-500-main)]">
                      (607) 659-4205
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <span className="text-[1rem] font-bold text-[var(--Neutral-800)]">
                    Owego Showroom
                  </span>
                  <div className="flex flex-col ">
                    <p className="">133 Central Ave, Owego, NY</p>
                    <p className="text-[var(--primary-500-main)]">
                      (607) 223-2360
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <hr className="border-[var(--Neutral-300)]" />
        </div>

        <div className="w-full flex flex-col justify-center gap-1 md:flex-row md:justify-between md:items-center">
          <p className="text-[0.75rem] font-semibold ">
            © 2025 Home Central. All rights reserved
          </p>
          <span className="flex gap-1">
            <p className="text-[0.75rem] font-semibold ">Powered by</p>
            <Link
              className="text-[0.75rem] underline"
              target="_blank"
              href="https://www.toolswift.ca/"
            >
              ToolSwift
            </Link>
          </span>
          <span className="flex gap-1">
            <p className="text-[0.75rem] font-semibold ">
              Designed & Developed by
            </p>
            <Link
              className="text-[0.75rem] underline"
              target="_blank"
              href="https://www.webelocity.io/"
            >
              Webelocity
            </Link>
          </span>

        </div>
      </footer>
    </div>

  );
}
