import { fetchAllProducts, getCategories } from '@/Api/Apis'

export const PAGE_SIZE = 100

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hcinc.com'
).replace(/\/$/, '')

type ProductMedia = { file?: string }

export function getProductImageUrls(product: Product): string[] {
  const p = product as Product & {
    productVariants?: { productMedia?: ProductMedia[] }[]
  }

  const variantImages =
    p.productVariants?.[0]?.productMedia
      ?.map((m) => m.file ?? '')
      .filter(Boolean) ?? []

  if (variantImages.length > 0) return variantImages

  return (
    p.productMedia?.map((m) => m.file ?? '').filter(Boolean) ?? []
  )
}

export type SitemapCategory = {
  _id: string
  updatedAt?: string
  children: SitemapCategory[]
}

function mapCategoryChildren(cat: Category): SitemapCategory {
  return {
    _id: cat._id,
    children: (cat.categorySubCategories ?? []).map((sub) => ({
      _id: sub._id,
      updatedAt: sub.updatedAt,
      children: [],
    })),
  }
}

export async function getProductCount(): Promise<number> {
  try {
    const res = await fetchAllProducts({ page: 1, limit: 1, isActive: true })
    return res?.totalItems ?? 0
  } catch {
    return 0
  }
}

export async function getProductsPage(page: number): Promise<Product[]> {
  try {
    const res = await fetchAllProducts({
      page,
      limit: PAGE_SIZE,
      isActive: true,
    })
    return res?.data ?? []
  } catch {
    return []
  }
}

export async function getAllCategories(): Promise<SitemapCategory[]> {
  try {
    const list = await getCategories()
    return list.map(mapCategoryChildren)
  } catch {
    return []
  }
}
