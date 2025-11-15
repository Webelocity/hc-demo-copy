// src/components/Shared/CategoryItem.tsx

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { isCategory, isChildSubCategory, isSubcategory } from '@/util/guards';
import { GoChevronDown } from 'react-icons/go';

interface CategoryItemProps {
  category: Category | Subcategory | ChildSubCategory;
  level: number;
  selectedSubCat: Subcategory | ChildSubCategory | undefined;
  setSelectedSubCat: (
    selected: Subcategory | ChildSubCategory | undefined
  ) => void;
  parentIsSelected?: boolean;
  filterQuery?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  level,
  selectedSubCat,
  setSelectedSubCat,
  parentIsSelected = false,
  filterQuery = '',
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentActiveId = searchParams.get('category_active');
  const isActive = currentActiveId === category._id;

  const handleItemClick = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering the expand/collapse
    }
    const newSearchParams = new URLSearchParams(searchParams);

    if (level === 0) {
      if (isActive) {
        newSearchParams.delete('category_active');
      } else {
        newSearchParams.set('category_active', category._id);
        newSearchParams.delete('subcats');
        setSelectedSubCat(undefined);
      }
    } else {
      if (selectedSubCat?._id === category._id) {
        newSearchParams.delete('subcats');
        setSelectedSubCat(undefined);
      } else {
        newSearchParams.set('subcats', category._id);
        if (isSubcategory(category) || isChildSubCategory(category)) {
          setSelectedSubCat(category);
        }
        newSearchParams.delete('category_active');
      }
    }
    newSearchParams.set('page', '1');
    router.push(`?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const hasChildren = isCategory(category)
    ? category.categorySubCategories &&
    category.categorySubCategories.length > 0
    : isSubcategory(category) || isChildSubCategory(category)
      ? category.childSubCategories && category.childSubCategories.length > 0
      : false;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent triggering the item click
    setIsExpanded((prev) => !prev);
  };

  // Determine if the current category is selected as a subcategory
  const isSubcatActive = searchParams.get('subcats') === category._id;

  useEffect(() => {
    const checkIfDescendantActive = (
      cat: Category | Subcategory | ChildSubCategory
    ): boolean => {
      if (searchParams.get('subcats') === cat._id) {
        return true;
      }

      if (isCategory(cat)) {
        return cat.categorySubCategories.some((sub) =>
          checkIfDescendantActive(sub)
        );
      } else if (isSubcategory(cat)) {
        return cat.childSubCategories.some((child) =>
          checkIfDescendantActive(child)
        );
      } else if (isChildSubCategory(cat)) {
        return cat.childSubCategories.some((child) =>
          checkIfDescendantActive(child)
        );
      }
      return false;
    };

    const shouldExpand = checkIfDescendantActive(category);
    if (shouldExpand) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [category, selectedSubCat, searchParams]);

  // Helper function to check if category or any descendant matches the query
  const categoryMatchesQuery = (
    cat: Category | Subcategory | ChildSubCategory,
    query: string
  ): boolean => {
    if (!query) return true; // No filter, show all

    const lowerQuery = query.toLowerCase();
    if ((cat.name || '').toLowerCase().includes(lowerQuery)) {
      return true;
    }

    if ('categorySubCategories' in cat && cat.categorySubCategories) {
      return cat.categorySubCategories.some((sub) =>
        categoryMatchesQuery(sub, query)
      );
    }
    if ('childSubCategories' in cat && cat.childSubCategories) {
      return cat.childSubCategories.some((child) =>
        categoryMatchesQuery(child, query)
      );
    }

    return false;
  };

  const renderChildCategories = () => {
    // If this item is selected, pass down that info to children
    const childrenParentSelected =
      isActive || isSubcatActive || parentIsSelected;

    if (isCategory(category)) {
      // Filter subcategories based on search query
      const filteredSubcats = filterQuery
        ? category.categorySubCategories.filter((subcat) =>
          categoryMatchesQuery(subcat, filterQuery)
        )
        : category.categorySubCategories;

      return filteredSubcats.map((subcat: Subcategory) => (
        <CategoryItem
          key={subcat._id}
          category={subcat}
          level={level + 1}
          selectedSubCat={selectedSubCat}
          setSelectedSubCat={setSelectedSubCat}
          parentIsSelected={childrenParentSelected}
          filterQuery={filterQuery}
        />
      ));
    } else if (isSubcategory(category) || isChildSubCategory(category)) {
      // Filter child subcategories based on search query
      const filteredChildren = filterQuery
        ? category.childSubCategories.filter((child) =>
          categoryMatchesQuery(child, filterQuery)
        )
        : category.childSubCategories;

      return filteredChildren.map((childSubcat: ChildSubCategory) => (
        <CategoryItem
          key={childSubcat._id}
          category={childSubcat}
          level={level + 1}
          selectedSubCat={selectedSubCat}
          setSelectedSubCat={setSelectedSubCat}
          parentIsSelected={childrenParentSelected}
          filterQuery={filterQuery}
        />
      ));
    }
    return null;
  };

  // Item is checked if it's directly selected OR if its parent is selected
  const isChecked = isActive || isSubcatActive || parentIsSelected;

  // Calculate indentation for nested levels
  const getIndentClass = () => {
    switch (level) {
      case 0:
        return '';
      case 1:
        return 'ml-[0.625rem]';
      case 2:
        return 'ml-[1rem]';
      case 3:
        return 'ml-[1.4rem]';
      case 4:
        return 'ml-[2.5rem]';
      default:
        return 'ml-[3.125rem]';
    }
  };

  return (
    <div className='w-full my-[0.375rem]'>
      <div className='flex items-start w-full cursor-pointer transition-all duration-300'>
        {hasChildren && (
          <motion.span
            onClick={toggleExpand}
            className={`block mr-[0.625rem] cursor-pointer text-[1.25rem] text-[color:var(--Neutral-700)] ${getIndentClass()}`}
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            whileTap={{ scale: 0.9 }}
          >
            <GoChevronDown />
          </motion.span>
        )}
        {!hasChildren && level > 0 && (
          <span
            className={`block mr-[0.625rem] w-[1.25rem] flex-shrink-0 ${getIndentClass()}`}
          />
        )}
        <label className='flex items-start gap-[0.5rem] flex-grow cursor-pointer group'>
          <input
            type='checkbox'
            className='w-[1rem] h-[1rem] rounded-[0.25rem] border border-[color:var(--Neutral-100)] accent-[var(--secondary-500-main)] cursor-pointer flex-shrink-0 mt-[0.125rem]'
            checked={isChecked}
            onChange={() => handleItemClick()}
          />
          <span
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(e);
            }}
            className={`flex-grow text-[0.875rem] leading-[1.3125rem] transition-colors duration-300 cursor-pointer break-words ${isChecked
                ? 'font-bold text-[color:var(--secondary-500-main)]'
                : 'font-normal text-[color:var(--Neutral-800)] group-hover:text-[color:var(--secondary-500-main)] group-hover:opacity-70'
              }`}
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            {category.name} (
            {isSubcategory(category)
              ? category.subCategoryProducts?.length
              : category.productCount}
            )
          </span>
        </label>
      </div>
      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`w-full mt-[0.3125rem]  border-l border-[color:var(--Neutral-200)] ${getIndentClass()}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderChildCategories()}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CategoryItem;
