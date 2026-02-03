/**
 * Fused category config for the Homepage Featured Categories.
 * Backend categories are grouped by name; IDs are concatenated when linking to catalogue.
 *
 * IMAGE URLS: Paste your image URL for each fused category below.
 * Suggested path: /assets/categories/<slug>.png (or .webp). Add the file under public/assets/categories/
 * and set the path here, e.g. "/assets/categories/building-materials.png"
 */
export const FUSED_CATEGORY_IMAGES: Record<string, string> = {
  Automotive: "/assets/image/categories/automotive.svg",
  "Building Materials": "/assets/image/categories/building_materials.svg",
  "Cleaning & Office Supplies": "/assets/image/categories/office.svg",
  "Clothing & Apparel": "/assets/image/categories/clothing.svg",
  "Doors & Windows": "/assets/image/categories/doors.svg",
  Electrical: "/assets/image/categories/electrical.svg",
  "Everyday Living": "/assets/image/categories/everyday.svg",
  "Farm & Ranch": "/assets/image/categories/farm.svg",
  Hardware: "/assets/image/categories/hardware.svg",
  "Home & Storage": "/assets/image/categories/home.svg",
  HVAC: "/assets/image/categories/hvac.svg",
  "Lawn & Garden": "/assets/image/categories/lawn.svg",
  Lumber: "/assets/image/categories/lumber.svg",
  Paint: "/assets/image/categories/paint.svg",
  Plumbing: "/assets/image/categories/plumbing.svg",
  "Sporting Goods": "/assets/image/categories/sporting.svg",
  Tools: "/assets/image/categories/tools.svg",
};

/** Display name -> list of backend category names that belong to this fused card. Order here = display order on homepage. */
export const FUSED_CATEGORY_GROUPS: { displayName: string; backendNames: string[] }[] = [
  { displayName: "Lumber", backendNames: ["Lumber"] },
  {
    displayName: "Building Materials",
    backendNames: ["Building Materials", "Building Materials & Insulation", "Masonry", "Roofing", "Mouldings & Millwork"],
  },
  { displayName: "Plumbing", backendNames: ["Plumbing Supplies"] },
  { displayName: "Electrical", backendNames: ["Electrical", "Electronics"] },
  { displayName: "Clothing & Apparel", backendNames: ["Clothing & Apparel"] },
  { displayName: "Doors & Windows", backendNames: ["Doors & Windows"] },
  {
    displayName: "Tools",
    backendNames: ["Hand Tools", "Power Tools & Accessories"],
  },
  {
    displayName: "Lawn & Garden",
    backendNames: ["Lawn & Garden", "Outdoor Living"],
  },
  { displayName: "Paint", backendNames: ["Paint & Painting Supplies"] },
  { displayName: "Farm & Ranch", backendNames: ["Farm & Ranch"] },
  { displayName: "Hardware", backendNames: ["Hardware"] },
  {
    displayName: "HVAC",
    backendNames: ["Heating, Ventilation & Air Conditioning"],
  },
  {
    displayName: "Home & Storage",
    backendNames: ["Housewares", "Storage & Organization", "Safety"],
  },
  {
    displayName: "Cleaning & Office Supplies",
    backendNames: ["Cleaning Supplies", "Office Supplies"],
  },
  {
    displayName: "Everyday Living",
    backendNames: ["Holiday Decorations & Supplies", "Pet Supplies", "Toys & Games"],
  },
  { displayName: "Automotive", backendNames: ["Automotive"] },
  { displayName: "Sporting Goods", backendNames: ["Sporting Goods"] },
];
