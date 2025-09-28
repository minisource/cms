export type TPageData = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
};
