import { NextRequest, NextResponse } from 'next/server'
import {
  getProductsPage,
  getProductImageUrls,
  SITE_URL,
} from '@/lib/sitemapHelpers'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params
  const pageIndex = parseInt(page, 10)

  if (isNaN(pageIndex) || pageIndex < 0) {
    return new NextResponse('Invalid page', { status: 400 })
  }

  const products = await getProductsPage(pageIndex + 1)

  const urls = products
    .map((product: any) => {
      const loc = escapeXml(
        `${SITE_URL}/product/${product.slug ?? product._id}`
      )
      const lastmod = new Date(product.updatedAt).toISOString()
      const imageXml = getProductImageUrls(product)
        .map(
          (url: string) =>
            `<image:image><image:loc>${escapeXml(url)}</image:loc></image:image>`
        )
        .join('')

      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority>${imageXml}</url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
