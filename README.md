This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started  
 
First, run the development server:  
  
```bash 
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## SEO (Google indexing & crawling)

The app is set up so content pages are crawlable and indexable by Google:

- **Root metadata** (`src/app/layout.tsx`): Default title template, description, Open Graph, Twitter cards, and `metadataBase` for canonical URLs.
- **Page-level metadata**: Each content page (or its layout) exports `metadata` or `generateMetadata` with a unique title and description so search results show the right snippet.
- **Sitemap**: `src/app/sitemap.ts` generates `/sitemap.xml` with all public content URLs. Submit this URL in [Google Search Console](https://search.google.com/search-console).
- **Robots**: `src/app/robots.ts` generates `/robots.txt` that allows crawling of content and points to the sitemap. Checkout, cart, order, and wishlist paths are disallowed.

**Production:**

1. Set the canonical site URL in `.env`:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
   ```
   (Used for sitemap, robots, and Open Graph URLs. Default fallback is `https://www.hcinc.com`.)

2. In [Google Search Console](https://search.google.com/search-console), add your property and submit `https://www.yourdomain.com/sitemap.xml`.

3. Optional: In `src/app/layout.tsx`, uncomment the `verification.google` field and add your Google Search Console verification code.

## Deploy on Vercel (auth account)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
