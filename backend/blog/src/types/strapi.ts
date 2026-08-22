// Strapi API Types

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Blog Types

export interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover: {
    data: {
      id: number;
      attributes: StrapiImage;
    } | null;
  };
  category: {
    data: {
      id: number;
      attributes: Category;
    } | null;
  };
  author: {
    data: {
      id: number;
      attributes: Author;
    } | null;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  avatar: {
    data: {
      id: number;
      attributes: StrapiImage;
    } | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Global {
  id: number;
  siteName: string;
  siteDescription: string;
  defaultSeo: {
    metaTitle: string;
    metaDescription: string;
    shareImage: {
      data: {
        id: number;
        attributes: StrapiImage;
      } | null;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// API Response Types

export interface ArticlesResponse {
  data: Array<{
    id: number;
    attributes: Article;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ArticleResponse {
  data: {
    id: number;
    attributes: Article;
  } | null;
}

export interface CategoriesResponse {
  data: Array<{
    id: number;
    attributes: Category;
  }>;
}

export interface CategoryResponse {
  data: {
    id: number;
    attributes: Category;
  } | null;
}

export interface AuthorsResponse {
  data: Array<{
    id: number;
    attributes: Author;
  }>;
}

export interface AuthorResponse {
  data: {
    id: number;
    attributes: Author;
  } | null;
}

export interface GlobalResponse {
  data: {
    id: number;
    attributes: Global;
  } | null;
}
