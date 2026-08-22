import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleList } from '@/components/blog';
import { strapiApi } from '@/api';
import { SITE_CONFIG } from '@/config';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await strapiApi.getCategoryBySlug(slug);
    
    if (!response?.data?.[0]) {
      return {
        title: 'Category Not Found',
      };
    }

    const category = response.data[0];
    const { name, description } = category.attributes;

    return {
      title: name,
      description: description || `Articles in ${name} category`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Category Not Available',
      description: 'Unable to load category information',
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  try {
    const categoryResponse = await strapiApi.getCategoryBySlug(slug);
    
    if (!categoryResponse?.data?.[0]) {
      notFound();
    }

    const category = categoryResponse.data[0];
    const articles = await strapiApi.getArticlesByCategory(slug);

    return (
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {category.attributes.name}
          </h1>
          {category.attributes.description && (
            <p className="text-lg text-muted-foreground">
              {category.attributes.description}
            </p>
          )}
        </div>
        
        {articles?.data && articles.data.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load category';
    
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Category</h3>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>
      </div>
    );
  }
}
