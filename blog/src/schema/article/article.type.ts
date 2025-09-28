export type TArticle = {
  id: number;
  documentId: string;
  title: string;
  content: string;
  slug?: string;
  coverImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  author?: {
    id: number;
    username: string;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};