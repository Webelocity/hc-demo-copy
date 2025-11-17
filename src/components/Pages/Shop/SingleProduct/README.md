# Product Page Components

## Gallery Component Architecture

The Gallery uses a **hybrid SSR + CSR approach** for optimal SEO and user experience:

### 🔍 **SEO & Crawlability (Server-Side)**

**`Gallery.tsx`** - Server Component
- Renders all images in a `<noscript>` tag
- Search engine crawlers see all product images
- Images are indexed for SEO
- Works without JavaScript
- Uses Next.js Image component for optimization

### 🎨 **Interactive Experience (Client-Side)**

**`GalleryClient.tsx`** - Client Component  
- Swiper carousel for image navigation
- Thumbnail gallery with synchronized scrolling
- Zoom functionality (click and drag)
- Touch/swipe gestures on mobile
- Responsive breakpoints
- Smooth animations

### 📊 **How It Works**

1. **Server renders** the page with all images in the DOM (inside `<noscript>`)
2. **Search engines** crawl and index all product images
3. **Users with JS enabled** see the interactive Swiper gallery
4. **Progressive enhancement** - works without JS, enhanced with JS

### 🎯 **Benefits**

✅ **SEO-friendly** - All images crawlable by search engines  
✅ **Fast loading** - Next.js Image optimization  
✅ **Great UX** - Interactive gallery with zoom  
✅ **Accessible** - Works without JavaScript  
✅ **Mobile-friendly** - Touch gestures and responsive  

### 🔧 **Usage**

```tsx
<Gallery 
    variantMedia={selectedVariant?.productMedia}
    fallbackMedia={product.productMedia}
/>
```

- `variantMedia` - Images specific to the selected variant
- `fallbackMedia` - Product-level images as backup
- Automatically chooses the right media source

### 📦 **Dependencies**

- `swiper` - Carousel library
- `next/image` - Next.js image optimization
- Swiper CSS modules imported in GalleryClient

## Other Components

### SelectedVariantAndPrice
- Server component with Suspense support
- Shows price with quantity discounts
- Streaming SSR for fast initial load

### VariantSelector
- Smart attribute selection
- Disables unavailable combinations
- Shows out-of-stock variants
- Real-time URL updates

### QuantityPicker
- Client component with debouncing
- Updates URL parameters
- Respects inventory limits
- Plus/minus buttons + manual input

### ProductDetails
- Server component
- Displays descriptions, specs, dimensions
- Bulk pricing tables
- Multiple specification sections





