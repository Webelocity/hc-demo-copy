"use client";

import React from "react";
import Link from "next/link";

interface PolicyTab {
  id: string;
  label: string;
  href: string;
}

interface PolicyTabsProps {
  activeTab: string;
}

const tabs: PolicyTab[] = [
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    href: "/policies?tab=privacy-policy",
  },
  {
    id: "terms-of-use",
    label: "Terms and Conditions Policies",
    href: "/policies?tab=terms-of-use",
  },
  {
    id: "return-refund-policy",
    label: "Return and Refund Policy",
    href: "/policies?tab=return-refund-policy",
  },
  {
    id: "shipping-delivery-policy",
    label: "Shipping and Delivery Policy",
    href: "/policies?tab=shipping-delivery-policy",
  },
];

export default function PolicyTabs({ activeTab }: PolicyTabsProps) {
  return (
    <div className="flex md:flex-col gap-[0.5rem] items-start w-full md:w-[14rem] overflow-x-auto md:overflow-x-visible scrollbar-hide">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`box-border flex gap-[0.5rem] items-center px-[1rem] py-[0.625rem] rounded-[1.875rem] flex-shrink-0 md:w-full transition-colors ${
            activeTab === tab.id
              ? "bg-[var(--primary-500-main)]"
              : "hover:bg-[var(--Neutral-100)]"
          }`}
        >
          <div className="box-border flex gap-[0.5rem] items-center justify-center pb-[0.125rem] pt-0 px-0">
            <p
              className={`font-['Figtree'] font-normal leading-[1.3] text-[0.875rem] text-center whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-[var(--Neutral-800)]"
              }`}
            >
              {tab.label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
