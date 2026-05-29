/**
 * Cache time constants for React Query
 */
export const CACHE_TIME = {
  /** 1 minute */
  SHORT: 1 * 60 * 1000,
  /** 5 minutes */
  MEDIUM: 5 * 60 * 1000,
  /** 30 minutes */
  LONG: 30 * 60 * 1000,
} as const;

/**
 * Query keys for React Query
 */
export const QUERY_KEYS = {
  articles: {
    all: ['articles'] as const,
    list: (filters?: Record<string, unknown>) => ['articles', 'list', filters] as const,
    detail: (slug: string) => ['articles', slug] as const,
  },
  categories: {
    all: ['categories'] as const,
    detail: (slug: string) => ['categories', slug] as const,
  },
  authors: {
    all: ['authors'] as const,
    detail: (slug: string) => ['authors', slug] as const,
  },
  global: ['global'] as const,
} as const;

/**
 * Site configuration
 */
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Minisource Blog',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A modern blog',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  articlesPerPage: 12,
  articlesPerPageHome: 6,
} as const;
