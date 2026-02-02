// src/components/Shared/CategoryItem.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  parentId?: string | null;
  filterQuery?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  level,
  selectedSubCat,
  setSelectedSubCat,
  parentIsSelected = false,
  parentId = null,
  filterQuery = '',
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategoryIds = useMemo(
    () =>
      new Set(
        (searchParams.get('cat') ?? '')
          .split(',')
          .filter(Boolean)
      ),
    [searchParams]
  );

  const selectedSubCategoryIds = useMemo(
    () =>
      new Set(
        (searchParams.get('sub') ?? '')
          .split(',')
          .filter(Boolean)
      ),
    [searchParams]
  );

  const isNodeSelected = (node: Category | Subcategory | ChildSubCategory) =>
    isCategory(node) ? selectedCategoryIds.has(node._id) : selectedSubCategoryIds.has(node._id);

  const hasSelectedDescendant = (
    cat: Category | Subcategory | ChildSubCategory
  ): boolean => {
    if (isCategory(cat) && cat.categorySubCategories) {
      return cat.categorySubCategories.some(
        (sub) => isNodeSelected(sub) || hasSelectedDescendant(sub)
      );
    }
    if ((isSubcategory(cat) || isChildSubCategory(cat)) && cat.childSubCategories) {
      return cat.childSubCategories.some(
        (child) => isNodeSelected(child) || hasSelectedDescendant(child)
      );
    }
    return false;
  };

  const handleItemClick = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering the expand/collapse
    }
    const newSearchParams = new URLSearchParams(searchParams);

    const toggleId = (key: 'cat' | 'sub', id: string) => {
      const current = newSearchParams.get(key)?.split(',').filter(Boolean) ?? [];
      const exists = current.includes(id);
      const next = exists ? current.filter((item) => item !== id) : [...current, id];

      if (next.length) {
        newSearchParams.set(key, next.join(','));
      } else {
        newSearchParams.delete(key);
      }
    };

    const removeId = (key: 'cat' | 'sub', id: string) => {
      const current = newSearchParams.get(key)?.split(',').filter(Boolean) ?? [];
      const next = current.filter((item) => item !== id);
      if (next.length) newSearchParams.set(key, next.join(','));
      else newSearchParams.delete(key);
    };


    if (isCategory(category)) {
      toggleId('cat', category._id);
    } else {
      // If a direct parent is selected, drop it when choosing the child
      if (parentId) {
        if (selectedCategoryIds.has(parentId)) removeId('cat', parentId);
        if (selectedSubCategoryIds.has(parentId)) removeId('sub', parentId);
      }
      toggleId('sub', category._id);
    }

    newSearchParams.set('page', '1');
    router.push(`?${newSearchParams.toString()}`, {
      scroll: false,
    });

    const nextSubcatIds =
      newSearchParams.get('sub')?.split(',').filter(Boolean) ?? [];

    // Update selectedSubCat state for subcategory selector
    if (isSubcategory(category) || isChildSubCategory(category)) {
      if (nextSubcatIds.includes(category._id)) {
        setSelectedSubCat(category);
      } else if (nextSubcatIds.length === 0) {
        // Clear selection if no subcategories are selected
        setSelectedSubCat(undefined);
      }
    } else if (nextSubcatIds.length === 0) {
      // Clear selection if no subcategories are selected
      setSelectedSubCat(undefined);
    }
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

  // Expand only when a descendant is selected (to reveal the selection).
  // Do not expand when this node itself is selected but no descendant is selected.
  useEffect(() => {
    const shouldExpand = hasSelectedDescendant(category);
    setIsExpanded(shouldExpand);
  }, [category, selectedCategoryIds, selectedSubCategoryIds]);

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
    // Pass down only *explicit* ancestor selection (from URL), not implied selection.
    const childrenParentSelected = isNodeSelected(category) || parentIsSelected;

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
          parentId={category._id}
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
          parentId={category._id}
          filterQuery={filterQuery}
        />
      ));
    }
    return null;
  };

  // Tri-state:
  // - checked: explicitly selected (present in URL params)
  // - indeterminate: only for parents when descendants are selected (upwards only)
  //   Children should never show indeterminate, only normal checked when explicitly selected
  const isExplicitlySelected = isNodeSelected(category);
  // Only show indeterminate for nodes that have children AND have selected descendants
  // Don't show indeterminate for leaf nodes or when parent is selected (downwards)
  const isIndeterminate = !isExplicitlySelected && hasChildren && hasSelectedDescendant(category);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!checkboxRef.current) return;
    checkboxRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

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
            ref={checkboxRef}
            checked={isExplicitlySelected}
            onChange={() => handleItemClick()}
          />
          <span
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(e);
            }}
            className={`flex-grow text-[0.875rem] leading-[1.3125rem] transition-colors duration-300 cursor-pointer break-words ${isExplicitlySelected
              ? 'font-bold text-[color:var(--secondary-500-main)]'
              : isIndeterminate
                ? 'font-semibold text-[color:var(--secondary-500-main)]'
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
