import { MetadataRoute } from 'next'
import { getAllCategories, SITE_URL } from '@webelocity/api'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getAllCategories()
  const urls: MetadataRoute.Sitemap = []

  for (const cat of categories) {
    urls.push({
      url: `${SITE_URL}/shop/catalogue?cat=${(cat as any).slug ?? cat._id}`,
      lastModified: new Date(cat.updatedAt ?? Date.now()),
      changeFrequency: 'daily',
      priority: 0.9,
    })

    if (cat.children?.length) {
      for (const sub of cat.children) {
        urls.push({
          url: `${SITE_URL}/shop/catalogue?sub=${(sub as any).slug ?? sub._id}`,
          lastModified: new Date(sub.updatedAt ?? Date.now()),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      }
    }
  }

  return urls
}
