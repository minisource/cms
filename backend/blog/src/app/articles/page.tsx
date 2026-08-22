import { ArticleList } from '@/components/blog';
import { strapiApi } from '@/api';
import { PAGINATION } from '@/config';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function ArticlesPage() {
  let articles = null;
  let error: string | null = null;

  try {
    articles = await strapiApi.getArticles({
      pageSize: PAGINATION.articlesPerPage,
      sort: 'publishedAt:desc',
    });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load articles';
    console.error('Error loading articles:', err);
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">All Articles</h1>
        <p className="text-lg text-muted-foreground">
          Browse all our articles and find something interesting to read
        </p>
      </div>
      
      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Articles</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : articles?.data && articles.data.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No articles found.</p>
        </div>
      )}
    </div>
  );
}
