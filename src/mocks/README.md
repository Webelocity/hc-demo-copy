# Mock Product Data

This directory contains mock product data for development until the backend is ready.

**Note:** The mock data is imported directly (not via HTTP API routes) to work with Next.js server components.

## Quick Start

### Using the Mock Product

To test the product page, navigate to:
```
http://localhost:3000/product/prod_12345
```

### Mock Product Details

**Product:** Premium Cotton T-Shirt
- **ID:** `prod_12345`
- **Attributes:** 
  - Colors: Black, White, Navy, Gray (all shown as options)
  - Sizes: S, M, L, XL (all shown as options)
- **Total Variants:** Only 5 variants exist (not all combinations)
- **Base Price:** $29.99

### Available Variants (Smart Selection Demo)

1. **Black M** - ✅ In Stock (50 units)
2. **Black L** - ✅ In Stock (30 units)
3. **White S** - ❌ OUT OF STOCK (0 units)
4. **White M** - ✅ In Stock (25 units)
5. **Navy L** - ✅ In Stock (15 units)

**Note:** This setup demonstrates:
- **Disabled attributes** (Gray has no variants at all)
- **Out of stock** (White S is shown but marked as unavailable)
- **Context-aware disabling** (if you select Black, only M and L sizes are available)

### Pricing Tiers (Bulk Pricing)

Each variant includes a bulk pricing table with the following discounts:

- **3+ items:** 10% OFF → $26.99 per item
- **5+ items:** 15% OFF → $25.49 per item
- **10+ items:** 20% OFF → $23.99 per item

The bulk pricing is automatically applied based on quantity and displayed in a dedicated table on the product page.

### Each Variant Includes

- **Unique variant ID** and SKU code
- **Color and size attributes** for filtering
- **2 product images** per color (from Unsplash)
- **Inventory tracking** with realistic stock levels
- **Size-specific dimensions** (width, height, weight)
- **Detailed description** tailored to the variant
- **Bulk pricing table** with 3 discount tiers (10%, 15%, 20%)
- **Stock quantities** ranging from 0 (out of stock) to 50 units

### Product Information Tables

The mock product includes comprehensive details:

#### **1. Product Description**
- Long-form description with key features
- Formatting with line breaks
- Bullet-pointed feature list

#### **2. Specifications Table**
- Material: 100% Organic Cotton
- Fabric Weight: 180 GSM
- Fit Type, Neck Style, Sleeve Type
- Care Instructions
- Country of Origin
- And more...

#### **3. Fabric & Quality Table**
- Cotton Type: Organic Ring-Spun Cotton
- Certification: GOTS Certified Organic
- Dyeing Process, Shrinkage, Durability
- Breathability and Softness ratings

#### **4. Size Guide Table**
- Detailed measurements for each size
- Chest measurements and garment length
- Helps customers choose the right size

#### **5. Weight & Dimensions Table**
- Package weight and dimensions
- Shipping weight
- Item weight (per unit)

## API Endpoints

### Get Product
```
GET /api/mock/products/prod_12345
```

Returns complete product data including all variants.

### Get Product Prices
```
GET /api/mock/products/prod_12345/prices?quantity=5
```

Returns product data with calculated pricing based on quantity.

**Query Parameters:**
- `quantity` (optional): Number of items for quantity-based pricing (default: 1)

## Switching Between Mock and Real Backend

In `src/Api/Apis.ts`, change the flag:

```typescript
// Use mock data
const USE_MOCK_DATA = true;

// Use real backend
const USE_MOCK_DATA = false;
```

## Images

All product images are hosted on Unsplash (free public images). The domains are configured in `next.config.ts`.

## Example Variant IDs (Available)

- Black M: `var_black_m` - ✅ In Stock
- Black L: `var_black_l` - ✅ In Stock
- White S: `var_white_s` - ❌ Out of Stock
- White M: `var_white_m` - ✅ In Stock
- Navy L: `var_navy_l` - ✅ In Stock

You can test different variants by changing the `variant_Id` query parameter:
```
# In stock variant
/product/prod_12345?variant_Id=var_black_m

# Out of stock variant
/product/prod_12345?variant_Id=var_white_s
```

## Testing Smart Variant Selection

Try these scenarios to see the intelligent disabling in action:

1. **Select Black** → Only M and L sizes become available (S and XL are disabled)
2. **Select White** → Only S and M are available, but S shows "Out of Stock"
3. **Select Navy** → Only L size is available (all others disabled)
4. **Select Gray** → All sizes are disabled (no Gray variants exist)

