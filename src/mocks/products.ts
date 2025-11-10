// Mock product data until backend is ready

// Color-specific images
const COLOR_IMAGES = {
    Black: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
        "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"


    ],
    White: [
        "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
    ],
    Navy: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1503341338985-c4a4e0eb3d40?w=800&q=80"
    ],
    Gray: [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
    ]
};

const INVENTORY_COUNTS: Record<string, Record<string, number>> = {
    Black: { S: 50, M: 75, L: 60, XL: 40 },
    White: { S: 45, M: 80, L: 70, XL: 35 },
    Navy: { S: 30, M: 55, L: 48, XL: 25 },
    Gray: { S: 42, M: 65, L: 52, XL: 38 }
};

// Size dimensions mapping (in cm)
const SIZE_DIMENSIONS: Record<string, { width: number; height: number; length: number; weight: number }> = {
    S: { width: 45, height: 68, length: 0.3, weight: 0.18 },
    M: { width: 50, height: 72, length: 0.3, weight: 0.20 },
    L: { width: 55, height: 76, length: 0.3, weight: 0.23 },
    XL: { width: 60, height: 80, length: 0.3, weight: 0.26 }
};

// Helper to create a complete ProductVariant
function createVariant(
    color: string,
    size: string
): ProductVariant {
    const variantId = `var_${color.toLowerCase()}_${size.toLowerCase()}`;
    const colorImages = COLOR_IMAGES[color as keyof typeof COLOR_IMAGES];
    const inventory = INVENTORY_COUNTS[color][size];
    const dimensions = SIZE_DIMENSIONS[size];

    return {
        _id: variantId,
        id: variantId,
        parentProduct: "prod_12345",
        parentCategory: ["cat_1"],
        parentSubCategories: ["subcat_1"],
        name: `Premium Cotton T-Shirt - ${color} ${size}`,
        description: `Premium organic cotton t-shirt in ${color}, size ${size}. Features a comfortable modern fit, reinforced shoulder seams, and eco-friendly dyes. Perfect for everyday wear or layering.`,
        attribute: { Color: color, Size: size },
        sku: `TSH-${color.substring(0, 3).toUpperCase()}-${size}`,
        brand: "StyleCo",
        isActive: true,
        isDiscounted: false,
        discountAmount: 0,
        retailPrice: 29.99,
        costPrice: 15.00,
        finalPrice: 29.99,
        wholesalePrice: 22.99,
        supportedFulfillmentMethods: ["pickup", "delivery"],
        totalSold: Math.floor(Math.random() * 30),
        trackQuantity: true,
        inventoryCount: inventory,
        width: dimensions.width,
        height: dimensions.height,
        length: dimensions.length,
        weight: dimensions.weight,
        hasCustomInputs: false,
        customInputFields: [],
        bulkPricingTable: [
            {
                _id: `bulk_1_${variantId}`,
                state: "ACTIVE",
                key: 3,
                percentagePerUnit: 10,
                BulkDiscountType: "Percentage",
                allowRegular: true
            },
            {
                _id: `bulk_2_${variantId}`,
                state: "ACTIVE",
                key: 5,
                percentagePerUnit: 15,
                BulkDiscountType: "Percentage",
                allowRegular: true
            },
            {
                _id: `bulk_3_${variantId}`,
                state: "ACTIVE",
                key: 10,
                percentagePerUnit: 20,
                BulkDiscountType: "Percentage",
                allowRegular: true
            }
        ],
        inventory: [],
        rating: 4.5,
        allowPro: true,
        allowRegular: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
        productMedia: colorImages.map((url, idx) => ({
            _id: `media_${variantId}_${idx}`,
            file: url,
            type: "image",
            isActive: true,
            order: idx
        })),
        thumbnail: {
            _id: `media_${variantId}_thumb`,
            file: colorImages[0],
            type: "image",
            isActive: true,
            order: 0
        }
    };
}

// Generate ONLY specific variants (not all combinations)
// This simulates real-world scenarios where not all color+size combos exist
const allVariants: ProductVariant[] = [
    // Black variants - in stock
    { ...createVariant("Black", "M"), inventoryCount: 50 },  // In stock
    { ...createVariant("Black", "L"), inventoryCount: 30 },  // In stock

    // White variants - one out of stock
    { ...createVariant("White", "S"), inventoryCount: 0 },   // OUT OF STOCK
    { ...createVariant("White", "M"), inventoryCount: 25 },  // In stock

    // Navy - only one size available
    { ...createVariant("Navy", "L"), inventoryCount: 15 },   // In stock

    // Gray - doesn't exist at all (no variants)
    // This will make Gray completely disabled
];

export const MOCK_PRODUCT: Product = {
    _id: "prod_12345",
    id: "prod_12345",
    name: "Premium Cotton T-Shirt",
    description: "Experience ultimate comfort with our Premium Cotton T-Shirt, crafted from 100% organic cotton. This versatile wardrobe essential features a modern fit that flatters all body types, reinforced shoulder seams for durability, and eco-friendly dyes that are gentle on your skin and the environment. \n\nDesigned for everyday wear, this t-shirt offers breathability and softness that gets better with every wash. The classic crew neck and short sleeves make it perfect for layering or wearing on its own. Whether you're heading to the office, running errands, or relaxing at home, this premium t-shirt delivers style and comfort in equal measure.\n\nKey Features:\n• 100% organic cotton fabric\n• Pre-shrunk for lasting fit\n• Reinforced double-stitched seams\n• Tag-free neck label for comfort\n• Machine washable\n• Available in multiple colors and sizes",
    brand: "StyleCo",
    storeId: "store_mock_001",
    sku: "TSH-PREM-001",
    upc: "123456789012",
    modelNumber: "TSH-2024",
    refundPolicy: "30-day hassle-free return policy. Items must be unworn, unwashed, and in original condition with all tags attached.",
    tags: ["cotton", "t-shirt", "casual", "organic", "sustainable", "eco-friendly", "basics", "wardrobe-essential"],
    isActive: true,
    isFeatured: true,
    isDiscounted: false,
    discountType: undefined,
    discountAmount: 0,
    priceBeforeDiscount: 29.99,
    finalPrice: 29.99,
    trackQuantity: true,
    showStock: true,
    weight: 0.25,
    inventoryCount: 800,
    totalSold: 156,
    totalSales: 4674.44,
    rating: 4.5,
    ratings: { "5": 85, "4": 45, "3": 15, "2": 8, "1": 3 },
    productVariantId: "var_black_m",
    hasCustomInputs: false,
    customInputFields: [],
    bulkPricingTable: [
        {
            _id: "bulk_product_1",
            state: "ACTIVE",
            key: 3,
            percentagePerUnit: 10,
            BulkDiscountType: "Percentage",
            allowRegular: true
        },
        {
            _id: "bulk_product_2",
            state: "ACTIVE",
            key: 5,
            percentagePerUnit: 15,
            BulkDiscountType: "Percentage",
            allowRegular: true
        },
        {
            _id: "bulk_product_3",
            state: "ACTIVE",
            key: 10,
            percentagePerUnit: 20,
            BulkDiscountType: "Percentage",
            allowRegular: true
        }
    ],
    frequentlyBoughtProducts: [],
    reviews: [],
    tables: [
        {
            title: "Specifications",
            values: [
                { key: "Material", value: "100% Organic Cotton" },
                { key: "Fabric Weight", value: "180 GSM" },
                { key: "Fit Type", value: "Modern Fit" },
                { key: "Neck Style", value: "Crew Neck" },
                { key: "Sleeve Type", value: "Short Sleeve" },
                { key: "Pattern", value: "Solid" },
                { key: "Closure Type", value: "Pull Over" },
                { key: "Occasion", value: "Casual, Everyday Wear" },
                { key: "Season", value: "All Season" },
                { key: "Country of Origin", value: "USA" },
                { key: "Manufacturer", value: "StyleCo Apparel Inc." },
                { key: "Care Instructions", value: "Machine wash cold, tumble dry low" }
            ]
        },
        {
            title: "Fabric & Quality",
            values: [
                { key: "Cotton Type", value: "Organic Ring-Spun Cotton" },
                { key: "Thread Count", value: "Single Jersey" },
                { key: "Certification", value: "GOTS Certified Organic" },
                { key: "Dyeing Process", value: "Eco-Friendly Low Impact Dyes" },
                { key: "Shrinkage", value: "Pre-Shrunk (< 3%)" },
                { key: "Durability", value: "Reinforced Seams" },
                { key: "Breathability", value: "High" },
                { key: "Softness", value: "Premium Soft Hand Feel" }
            ]
        },
        {
            title: "Size Guide",
            values: [
                { key: "Small (S)", value: "Chest: 34-36 inches | Length: 27 inches" },
                { key: "Medium (M)", value: "Chest: 38-40 inches | Length: 28 inches" },
                { key: "Large (L)", value: "Chest: 42-44 inches | Length: 29 inches" },
                { key: "X-Large (XL)", value: "Chest: 46-48 inches | Length: 30 inches" }
            ]
        }
    ],
    dimensionsTable: {
        title: "Weight & Dimensions (Per Unit)",
        values: [
            { key: "Package Weight", value: "0.25 kg (0.55 lbs)" },
            { key: "Package Dimensions", value: "30 x 20 x 2 cm" },
            { key: "Shipping Weight", value: "0.28 kg (0.62 lbs)" },
            { key: "Item Weight", value: "0.20 kg (0.44 lbs)" }
        ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
    productMedia: [
        {
            _id: "media_1",
            file: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
            type: "image",
            isActive: true,
            order: 0
        }
    ],
    thumbnail: {
        _id: "media_thumb",
        file: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
        type: "image",
        isActive: true,
        order: 0
    },
    defaultPath: [
        { _id: "cat_1", name: "Clothing" },
        { _id: "subcat_1", name: "T-Shirts" }
    ],
    attributes: {
        Color: ["Black", "White", "Navy", "Gray"],
        Size: ["S", "M", "L", "XL"]
    },
    productVariants: allVariants,
    lowestPriceVariant: allVariants[1] // Black M variant
};

// Helper to calculate pricing with quantity discounts
export function calculatePricing(quantity: number = 1) {
    const basePrice = 29.99;
    let discount = 0;

    // Quantity discounts
    if (quantity >= 10) {
        discount = 0.20; // 20% off for 10+
    } else if (quantity >= 5) {
        discount = 0.15; // 15% off for 5+
    } else if (quantity >= 3) {
        discount = 0.10; // 10% off for 3+
    }

    const finalPrice = basePrice * (1 - discount);

    return {
        basePrice,
        discount,
        finalPrice,
        savings: basePrice - finalPrice
    };
}

export function getMockProductWithPrices(quantity: number = 1): ProductPricing {
    const pricing = calculatePricing(quantity);

    return {
        productVariants: MOCK_PRODUCT.productVariants.map(variant => ({
            _id: variant._id,
            isDiscounted: pricing.discount > 0,
            retailPrice: pricing.basePrice,
            lowestFinalPrice: pricing.finalPrice
        }))
    };
}
