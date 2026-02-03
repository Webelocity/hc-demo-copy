"use client";

import Button from "@/components/shared/Button";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import QuoteRequestPopup from "@/components/Pages/HomePage/QuoteRequest/QuoteRequestPopup";
import { selectedStoreAtom } from "@/atoms/storeAtom";
import { getStoreById } from "@/util/shedule";
import { SlLocationPin } from "react-icons/sl";
import { FUSED_CATEGORY_GROUPS } from "@/components/Pages/HomePage/Categories/categoryFusionConfig";

type FusedMenuCategory = {
  displayName: string;
  ids: string[];
  subcategories: Subcategory[];
};

function buildFusedMenuCategories(backendCategories: Category[]): FusedMenuCategory[] {
  const byName = new Map<string, Category>();
  (backendCategories ?? [])
    .filter((c) => c.name !== "Uncategorized")
    .forEach((c) => byName.set(c.name, c));

  return FUSED_CATEGORY_GROUPS.map((group) => {
    const matched = group.backendNames
      .map((name) => byName.get(name))
      .filter((c): c is Category => c != null);
    const ids = matched.map((c) => c._id);
    const seenIds = new Set<string>();
    const subcategories: Subcategory[] = [];
    for (const cat of matched) {
      for (const sub of cat.categorySubCategories ?? []) {
        if (sub?._id && !seenIds.has(sub._id)) {
          seenIds.add(sub._id);
          subcategories.push(sub);
        }
      }
    }
    return { displayName: group.displayName, ids, subcategories };
  }).filter((fused) => fused.ids.length > 0);
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  onOpenStoreSelector?: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onOpenStoreSelector,
}: MobileDrawerProps) {
  const router = useRouter();
  const { data: categories, status: categoriesStatus } =
    useAtomValue(categoriesQueryAtom);
  const fusedMenuCategories = useMemo(
    () => buildFusedMenuCategories((categories ?? []) as Category[]),
    [categories]
  );
  const [activeTab, setActiveTab] = useState<"main" | "shop">("main");
  const [selectedFused, setSelectedFused] = useState<FusedMenuCategory | null>(
    null
  );
  const selectedStoreId = useAtomValue(selectedStoreAtom);
  const store = getStoreById(selectedStoreId);

  const renderMain = () => {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
    return (
      <div className="flex flex-col">
        <button
          type="button"
          className="w-full cursor-pointer p-[1rem] rounded-[var(--Radius-md)] bg-white text-start transition-colors hover:bg-[var(--Secondary-100)]"
          onClick={() => {
            onClose?.();
            onOpenStoreSelector?.();
          }}
          aria-label="Select or change store"
        >
          <div className="flex items-center justify-between gap-[1rem]">
            <div className="flex items-center gap-[0.75rem]">
              <SlLocationPin className="text-[1.5rem] text-[var(--secondary-500-main)]" />
              <div className="flex flex-col leading-tight">
                <span className="text-[1.1rem] font-semibold">Store</span>
                <span className="text-[0.95rem] text-[color:var(--Neutral-600)]">
                  {store?.name ?? "Select store"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[0.5rem] text-[var(--secondary-500-main)]">
              <span className="text-[1rem] font-semibold">Change</span>
              <GoArrowRight className="text-[1.5rem]" aria-hidden />
            </div>
          </div>
        </button>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/"
          onClick={() => onClose?.()}
        >
          <span>Home</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/services"
          onClick={() => onClose?.()}
        >
          <span>Services</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/contractor-zone"
          onClick={() => onClose?.()}
        >
          <span>Contractor Zone</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/owego-showroom"
          onClick={() => onClose?.()}
        >
          <span>Owego Showroom</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/locations"
          onClick={() => onClose?.()}
        >
          <span>Locations</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/about-us"
          onClick={() => onClose?.()}
        >
          <span>About</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/contact"
          onClick={() => onClose?.()}
        >
          <span>Contact</span>
        </Link>
        <Link
          className="p-[1rem] text-[1.25rem] font-medium text-start"
          href="/careers"
          onClick={() => onClose?.()}
        >
          <span>Careers</span>
        </Link>
        <Link className='p-[1rem] text-[1.25rem] font-medium text-start' href="/history" onClick={() => onClose?.()}>
          <span>
            History
          </span>
        </Link>
        <div className="w-full mt-[3rem]">
          <QuoteRequestPopup
            dashboardUrl={Customer_Dashboard_Url}
            triggerLabel="Request a Quote"
          />
        </div>
      </div>
    );
  };

  const handleFusedCategoryClick = (fused: FusedMenuCategory) => {
    setSelectedFused(fused);
  };

  const handleBackToCategories = () => {
    setSelectedFused(null);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    router.push(`/shop/catalogue?sub=${subcategoryId}&page=1`);
    onClose?.();
  };

  const handleShopAllClick = (fused: FusedMenuCategory) => {
    router.push(`/shop/catalogue?cat=${fused.ids.join(",")}&page=1`);
    onClose?.();
  };

  const isLoading = categoriesStatus === "pending";

  const renderShop = () => {
    return (
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {selectedFused ? (
            // Subcategories view (fused)
            <motion.div
              key="subcategories"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col"
            >
              {/* Back button */}
              <button
                onClick={handleBackToCategories}
                className="flex items-center gap-[0.5rem] p-[1rem] text-[1.125rem] font-medium text-start hover:text-[color:var(--secondary-500-main)] transition-colors duration-200"
              >
                <GoArrowLeft className="text-[1.5rem]" />
                <span>Back to Categories</span>
              </button>

              {/* Fused category name header */}
              <div className="px-[1rem] py-[0.5rem] text-[1.5rem] font-bold text-[color:var(--Neutral-800)]">
                {selectedFused.displayName}
              </div>

              {/* Merged subcategories list */}
              <div className="flex flex-col mt-[0.5rem]">
                {selectedFused.subcategories?.map((subcategory, index) => (
                  <motion.button
                    key={subcategory._id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleSubcategoryClick(subcategory._id)}
                    className="p-[1rem] text-[1.125rem] font-medium text-start hover:text-[color:var(--secondary-500-main)] hover:bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] transition-all duration-200"
                  >
                    {subcategory.name}
                  </motion.button>
                ))}
              </div>

              {/* Shop All button (all backend category IDs in this fusion) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="w-full mt-[2rem]"
              >
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleShopAllClick(selectedFused)}
                >
                  Shop All {selectedFused.displayName}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Main fused categories view
            <motion.div
              key="categories"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col"
            >
              {isLoading
                ? // Skeleton loaders
                [...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[3.5rem] rounded-[var(--Radius-md)] animate-pulse bg-[color:var(--Neutral-200)] mb-[0.5rem]"
                  />
                ))
                : fusedMenuCategories.map((fused, index) => (
                  <motion.button
                    key={fused.displayName}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleFusedCategoryClick(fused)}
                    className="flex items-center justify-between p-[1rem] text-[1.25rem] font-medium text-start hover:text-[color:var(--secondary-500-main)] hover:bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] transition-all duration-200 group"
                  >
                    <span>{fused.displayName}</span>
                    <GoArrowRight className="text-[1.5rem] group-hover:translate-x-[0.25rem] transition-transform duration-200" />
                  </motion.button>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className={`baseContainer absolute lg:hidden top-full left-0 w-full bg-white z-50 transition-all duration-300 ease-in-out ${isOpen
        ? "opacity-100 visible translate-y-0"
        : "opacity-0 invisible -translate-y-[10px]"
        }`}
    >
      <div className="p-[2rem] bg-[var(--Secondary-50)] flex flex-col ">
        <div className="flex text-[1.25rem] font-medium">
          <span
            className={`p-[1rem] flex-1 rounded-[var(--Radius-md)] text-center cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center ${activeTab === "main"
              ? "bg-[var(--Secondary-100)]"
              : "bg-transparent hover:bg-[var(--Secondary-100)]/50"
              }`}
            onClick={() => setActiveTab("main")}
          >
            Main
          </span>
          <span
            className={`p-[1.5rem] flex-1 rounded-[var(--Radius-md)] text-center cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center ${activeTab === "shop"
              ? "bg-[var(--Secondary-100)]"
              : "bg-transparent hover:bg-[var(--Secondary-100)]/50"
              }`}
            onClick={() => setActiveTab("shop")}
          >
            Shop
          </span>
        </div>

        {/* Content Area */}
        <div className="mt-[1.5rem]">
          {activeTab === "main" ? renderMain() : renderShop()}
        </div>
      </div>
    </div>
  );
}
