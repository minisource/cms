import axios, { AxiosInstance, AxiosError } from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * Create an Axios instance configured for Strapi API
 */
export const strapiClient: AxiosInstance = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
});

/**
 * Handle API errors with proper logging and user-friendly messages
 */
function handleApiError(error: unknown, operation: string): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.code === 'ECONNREFUSED') {
      console.error(`[Strapi API Error] Cannot connect to Strapi CMS at ${STRAPI_URL}`);
      console.error(`Please ensure Strapi is running at ${STRAPI_URL}`);
      throw new Error(
        `Cannot connect to Strapi CMS. Please ensure Strapi is running at ${STRAPI_URL}`
      );
    }
    
    if (axiosError.response) {
      console.error(`[Strapi API Error] ${operation}:`, {
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
      });
      throw new Error(
        `Strapi API error: ${axiosError.response.status} - ${axiosError.response.statusText}`
      );
    }
    
    if (axiosError.request) {
      console.error(`[Strapi API Error] No response received for ${operation}`);
      throw new Error(`No response from Strapi CMS. Please check your connection.`);
    }
  }
  
  console.error(`[Strapi API Error] ${operation}:`, error);
  throw new Error(`Failed to ${operation}. Please try again later.`);
}

/**
 * Strapi API helper functions
 */
export const strapiApi = {
  /**
   * Fetch articles with optional filters
   */
  async getArticles(params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, unknown>;
    populate?: string;
  }) {
    try {
      const response = await strapiClient.get('/articles', {
        params: {
          'pagination[page]': params?.page || 1,
          'pagination[pageSize]': params?.pageSize || 10,
          sort: params?.sort || 'publishedAt:desc',
          populate: params?.populate || 'cover,category,author.avatar',
          ...params?.filters,
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, 'fetch articles');
    }
  },

  /*try {
      const response = await strapiClient.get('/articles', {
        params: {
          'filters[slug][$eq]': slug,
          populate: 'cover,category,author.avatar',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetch article "${slug}"`);
    }q]': slug,
        populate: 'cover,category,author.avatar',
      },
    });
    return response.data;
  },

  /*try {
      const response = await strapiClient.get('/categories', {
        params: {
          sort: 'name:asc',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, 'fetch categories');
    }
        sort: 'name:asc',
      },
    });
    return response.data;
  },

  /*try {
      const response = await strapiClient.get('/categories', {
        params: {
          'filters[slug][$eq]': slug,
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetch category "${slug}"`);
    }
        'filters[slug][$eq]': slug,
      },
    });
    return response.data;
  },
try {
      const response = await strapiClient.get('/articles', {
        params: {
          'filters[category][slug][$eq]': categorySlug,
          'pagination[page]': params?.page || 1,
          'pagination[pageSize]': params?.pageSize || 10,
          sort: 'publishedAt:desc',
          populate: 'cover,category,author.avatar',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetch articles by category "${categorySlug}"`);
    }
        'filters[category][slug][$eq]': categorySlug,
        'pagination[page]': params?.page || 1,
        'pagination[pageSize]': params?.pageSize || 10,
        sort: 'publishedAt:desc',
        populate: 'cover,category,author.avatar',
      },
    try {
      const response = await strapiClient.get('/authors', {
        params: {
          sort: 'name:asc',
          populate: 'avatar',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, 'fetch authors');
    }
  async getAuthors() {
    const response = await strapiClient.get('/authors', {
      params: {
        sort: 'name:asc',
        populate: 'avatar',
      },
    try {
      const response = await strapiClient.get('/authors', {
        params: {
          'filters[slug][$eq]': slug,
          populate: 'avatar',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetch author "${slug}"`);
    }
  async getAuthorBySlug(slug: string) {
    const response = await strapiClient.get('/authors', {
      params: {
        'filters[slug][$eq]': slug,
        populate: 'avatar',
      },
    });
    return response.data;
  },
try {
      const response = await strapiClient.get('/articles', {
        params: {
          'filters[author][slug][$eq]': authorSlug,
          'pagination[page]': params?.page || 1,
          'pagination[pageSize]': params?.pageSize || 10,
          sort: 'publishedAt:desc',
          populate: 'cover,category,author.avatar',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetch articles by author "${authorSlug}"`);
    }
        'filters[author][slug][$eq]': authorSlug,
        'pagination[page]': params?.page || 1,
        'pagination[pageSize]': params?.pageSize || 10,
        sort: 'publishedAt:desc',
        populate: 'cover,category,author.avatar',
      },
    try {
      const response = await strapiClient.get('/global', {
        params: {
          populate: 'defaultSeo.shareImage',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, 'fetch global settings');
    }ttings
   */
  async getGlobal() {
    const response = await strapiClient.get('/global', {
      params: {
        populate: 'defaultSeo.shareImage',
      },
    });
    return response.data;
  },
};

export default strapiApi;
