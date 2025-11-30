const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

// Base entity structure from Strapi v5
export type StrapiEntity = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

// Career/Job Opening type
export type StrapiCareer = StrapiEntity & {
  title: string;
  description: string;
  location: string;
  employmentType?: string;
  department?: string;
};

// Response structure
export type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// Query parameters
export type StrapiParams = {
  populate?: string | string[];
  sort?: string | string[];
  filters?: Record<string, unknown>;
  pagination?: { page?: number; pageSize?: number };
  locale?: string;
};

function buildQuery(params?: StrapiParams): string {
  if (!params) return "?populate=*";

  const q = new URLSearchParams();
  q.append("populate", Array.isArray(params.populate) ? params.populate.join(",") : params.populate || "*");

  if (params.sort) {
    q.append("sort", Array.isArray(params.sort) ? params.sort.join(",") : params.sort);
  }
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null) q.append(`filters[${key}]`, String(val));
    });
  }
  if (params.pagination?.page) q.append("pagination[page]", String(params.pagination.page));
  if (params.pagination?.pageSize) q.append("pagination[pageSize]", String(params.pagination.pageSize));
  if (params.locale) q.append("locale", params.locale);

  return `?${q.toString()}`;
}

export async function fetchStrapi<T extends StrapiEntity>(
  contentType: string,
  params?: StrapiParams
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api/${contentType}${buildQuery(params)}`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Strapi error: ${res.status} ${res.statusText}. ${errorText}`);
  }

  return res.json();
}

