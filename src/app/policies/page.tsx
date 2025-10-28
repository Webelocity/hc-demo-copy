"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PolicyBanner from "@/components/Pages/Policies/PolicyBanner";
import PolicyTabs from "@/components/Pages/Policies/PolicyTabs";
import PrivacyPolicy from "@/components/Pages/Policies/PrivacyPolicy";
import TermsOfUse from "@/components/Pages/Policies/TermsOfUse";
import ReturnRefundPolicy from "@/components/Pages/Policies/ReturnRefundPolicy";
import ShippingDeliveryPolicy from "@/components/Pages/Policies/ShippingDeliveryPolicy";

function PoliciesContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "privacy-policy";

  const getTitleFromTab = (tab: string) => {
    switch (tab) {
      case "privacy-policy":
        return "Privacy Policy";
      case "terms-of-use":
        return "Terms of Use";
      case "return-refund-policy":
        return "Return & Refund Policy";
      case "shipping-delivery-policy":
        return "Shipping & Delivery Policy";
      default:
        return "Privacy Policy";
    }
  };

  const renderPolicyContent = () => {
    switch (activeTab) {
      case "privacy-policy":
        return <PrivacyPolicy />;
      case "terms-of-use":
        return <TermsOfUse />;
      case "return-refund-policy":
        return <ReturnRefundPolicy />;
      case "shipping-delivery-policy":
        return <ShippingDeliveryPolicy />;
      default:
        return <PrivacyPolicy />;
    }
  };

  return (
    <>
      <PolicyBanner title={getTitleFromTab(activeTab)} />

      <div className="flex flex-col gap-[3rem] items-start w-full">
        <div className="box-border flex gap-[3rem] items-center justify-center px-[1.5rem] py-[3rem] rounded-[1rem] w-full">
          <div className="flex flex-col md:flex-row flex-1 gap-[2rem] items-start max-w-[84.5rem] w-full">
            {/* Tabs Navigation */}
            <div className="w-full md:w-auto md:sticky md:top-[6rem]">
              <PolicyTabs activeTab={activeTab} />
            </div>

            {/* Policy Content */}
            <div className="flex flex-1 flex-col gap-[1.5rem] items-start min-w-0 rounded-[1rem] w-full">
              {renderPolicyContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PoliciesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PoliciesContent />
    </Suspense>
  );
}
