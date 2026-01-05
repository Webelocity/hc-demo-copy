"use client";

import Button from "@/components/shared/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { categoriesQueryAtom } from "@/atoms/categoryAtom";
import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import QuoteRequestPopup from "@/components/Pages/HomePage/QuoteRequest/QuoteRequestPopup";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const { data: categories, status: categoriesStatus } =
    useAtomValue(categoriesQueryAtom);
  const [activeTab, setActiveTab] = useState<"main" | "shop">("main");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const renderMain = () => {
    const Customer_Dashboard_Url = process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD;
    return (
      <div className="flex flex-col">
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

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    router.push(`/shop/catalogue?sub=${subcategoryId}&page=1`);
    onClose?.();
  };

  const handleShopAllClick = (categoryId: string) => {
    router.push(`/shop/catalogue?cat=${categoryId}&page=1`);
    onClose?.();
  };

  const isLoading = categoriesStatus === "pending";

  const renderShop = () => {
    return (
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {selectedCategory ? (
            // Subcategories view
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

              {/* Category name header */}
              <div className="px-[1rem] py-[0.5rem] text-[1.5rem] font-bold text-[color:var(--Neutral-800)]">
                {selectedCategory.name}
              </div>

              {/* Subcategories list */}
              <div className="flex flex-col mt-[0.5rem]">
                {selectedCategory.categorySubCategories?.map(
                  (subcategory, index) => (
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
                  )
                )}
              </div>

              {/* Shop All button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="w-full mt-[2rem]"
              >
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleShopAllClick(selectedCategory._id)}
                >
                  Shop All {selectedCategory.name}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Main categories view
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
                : categories?.map((category, index) => (
                  <motion.button
                    key={category._id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center justify-between p-[1rem] text-[1.25rem] font-medium text-start hover:text-[color:var(--secondary-500-main)] hover:bg-[var(--Secondary-50)] rounded-[var(--Radius-md)] transition-all duration-200 group"
                  >
                    <span>{category.name}</span>
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
