export const isCategory = (obj: Category | Subcategory | ChildSubCategory): obj is Category => {
    return (obj as Category).categorySubCategories !== undefined;
};

// Type guard to check if the object is a Subcategory
export const isSubcategory = (obj: Category | Subcategory | ChildSubCategory): obj is Subcategory => {
    return (obj as Subcategory).parentCategory !== undefined && (obj as Subcategory).parentSubCategory !== undefined;
};

// Type guard to check if the object is a ChildSubCategory
export const isChildSubCategory = (obj: Category | Subcategory | ChildSubCategory): obj is ChildSubCategory => {
    return (obj as ChildSubCategory).childSubCategories !== undefined;
};
