import Link from 'next/link';
import { ArticleList } from '@/components/blog';
import { Button } from '@/components/ui/button';
import { strapiApi } from '@/api';
import { PAGINATION } from '@/config';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  let articles = null;
  let error: string | null = null;

  try {
    articles = await strapiApi.getArticles({
      pageSize: PAGINATION.articlesPerPageHome,
      sort: 'publishedAt:desc',
    });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load articles';
    console.error('Error loading articles:', err);
  }

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-6xl">
          Welcome to Minisource Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover insightful articles, tutorials, and stories from our community
        </p>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
          <Button asChild variant="outline">
            <Link href="/articles">View All</Link>
          </Button>
        </div>
        
        {error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Articles</h3>
            <p className="text-muted-foreground">{error}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Please ensure the Strapi CMS is running and accessible.
            </p>
          </div>
        ) : articles?.data && articles.data.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No articles found. Start creating content in Strapi CMS!</p>
          </div>
        )}
      </section>
    </div>
  );
}
