import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',
          '/checkout',
          '/account',
          '/shop/catalogue?*',
          '/policies',
        ],
      },
    ],
    sitemap: 'https://www.hcinc.com/sitemap.xml',
  }
}
