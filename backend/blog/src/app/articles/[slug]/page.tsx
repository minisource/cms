import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleContent } from '@/components/blog';
import { strapiApi } from '@/api';
import { SITE_CONFIG } from '@/config';
import { getStrapiMedia } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await strapiApi.getArticleBySlug(slug);
    
    if (!response?.data?.[0]) {
      return {
        title: 'Article Not Found',
      };
    }

    const article = response.data[0];
    const { title, description, cover } = article.attributes;
    const coverUrl = getStrapiMedia(cover?.data?.attributes?.url);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${SITE_CONFIG.url}/articles/${slug}`,
        ...(coverUrl && { images: [coverUrl] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(coverUrl && { images: [coverUrl] }),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article Not Available',
      description: 'Unable to load article information',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  try {
    const response = await strapiApi.getArticleBySlug(slug);
    
    if (!response?.data?.[0]) {
      notFound();
    }

    const article = response.data[0];

    return (
      <div className="container py-12">
        <ArticleContent article={article} />
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load article';
    
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Article</h3>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>
      </div>
    );
  }
}
