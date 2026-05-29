import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArticleList } from '@/components/blog';
import { strapiApi } from '@/api';
import { getStrapiMedia } from '@/lib/utils';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await strapiApi.getAuthorBySlug(slug);
    
    if (!response?.data?.[0]) {
      return {
        title: 'Author Not Found',
      };
    }

    const author = response.data[0];
    const { name, bio } = author.attributes;

    return {
      title: name,
      description: bio || `Articles by ${name}`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Author Not Available',
      description: 'Unable to load author information',
    };
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  
  try {
    const authorResponse = await strapiApi.getAuthorBySlug(slug);
    
    if (!authorResponse?.data?.[0]) {
      notFound();
    }

    const author = authorResponse.data[0];
    const articles = await strapiApi.getArticlesByAuthor(slug);
    const avatarUrl = getStrapiMedia(author.attributes.avatar?.data?.attributes?.url);

    return (
      <div className="container py-12">
        <div className="mb-12 text-center">
          <Avatar className="mx-auto mb-4 h-32 w-32">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={author.attributes.name} />}
            <AvatarFallback className="text-4xl">
              {author.attributes.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {author.attributes.name}
          </h1>
          {author.attributes.bio && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {author.attributes.bio}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Articles by {author.attributes.name}</h2>
        </div>
        
        {articles?.data && articles.data.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No articles found by this author.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load author';
    
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Author</h3>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>
      </div>
    );
  }
}
