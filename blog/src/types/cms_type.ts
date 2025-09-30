export type TCategory = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TArticle = {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    category: { data: TCategory };
  };
};
