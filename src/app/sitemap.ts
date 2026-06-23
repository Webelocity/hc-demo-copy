import { MetadataRoute } from 'next'
import { getProductCount, SITE_URL, PAGE_SIZE } from '@webelocity/api'

const staticPages: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${SITE_URL}/shop/catalogue`,    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${SITE_URL}/locations`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${SITE_URL}/contractor-zone`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${SITE_URL}/services`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/special-ordering`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/owego-showroom`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/paint`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/about-us`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/history`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  { url: `${SITE_URL}/team`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  { url: `${SITE_URL}/careers`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.5 },
  { url: `${SITE_URL}/contact`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/resources`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const total = await getProductCount()
  const productPages = Math.ceil((total || 1) / PAGE_SIZE)

  const productSitemaps: MetadataRoute.Sitemap = Array.from(
    { length: productPages },
    (_, i) => ({
      url: `${SITE_URL}/sitemap-products/${i}`,
      lastModified: new Date(),
    })
  )

  return [
    ...staticPages,
    {
      url: `${SITE_URL}/sitemap-categories/sitemap.xml`,
      lastModified: new Date(),
    },
    ...productSitemaps,
  ]
}
