export const isCategory = (obj: Category | Subcategory | ChildSubCategory): obj is Category => {
    return Array.isArray((obj as any).categorySubCategories);
};

export const isSubcategory = (obj: Category | Subcategory | ChildSubCategory): obj is Subcategory => {
    return Array.isArray((obj as any).subCategoryProducts);
};

export const isChildSubCategory = (obj: Category | Subcategory | ChildSubCategory): obj is ChildSubCategory => {
    return !isCategory(obj) && !isSubcategory(obj);
    // Or, if reliable in your data model:
    // return 'parentSubCategory' in (obj as any) && (obj as any).parentSubCategory != null;
};