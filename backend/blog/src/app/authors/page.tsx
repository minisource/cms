import Link from 'next/link';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { strapiApi } from '@/api';
import { getStrapiMedia } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function AuthorsPage() {
  let authors = null;
  let error: string | null = null;

  try {
    authors = await strapiApi.getAuthors();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load authors';
    console.error('Error loading authors:', err);
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Authors</h1>
        <p className="text-lg text-muted-foreground">
          Meet our talented writers
        </p>
      </div>
      
      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Authors</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : authors?.data && authors.data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.data.map((author) => {
            const avatarUrl = getStrapiMedia(author.attributes.avatar?.data?.attributes?.url);
            
            return (
              <Link key={author.id} href={`/authors/${author.attributes.slug}`}>
                <Card className="transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      <Avatar className="h-24 w-24">
                        {avatarUrl && <AvatarImage src={avatarUrl} alt={author.attributes.name} />}
                        <AvatarFallback className="text-2xl">
                          {author.attributes.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle>{author.attributes.name}</CardTitle>
                    {author.attributes.bio && (
                      <CardDescription className="line-clamp-3">
                        {author.attributes.bio}
                      </CardDescription>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No authors found.</p>
        </div>
      )}
    </div>
  );
}
