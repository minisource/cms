import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate, getStrapiMedia, truncate } from '@/lib/utils';
import { Article } from '@/types';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  article: {
    id: number;
    attributes: Article;
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { title, slug, description, cover, author, publishedAt, category } = article.attributes;
  
  const coverUrl = getStrapiMedia(cover?.data?.attributes?.url);
  const authorAvatar = getStrapiMedia(author?.data?.attributes?.avatar?.data?.attributes?.url);
  const authorName = author?.data?.attributes?.name || 'Anonymous';
  const categoryName = category?.data?.attributes?.name;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {coverUrl && (
        <Link href={`/articles/${slug}`} className="block relative h-48 w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={cover?.data?.attributes?.alternativeText || title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <CardHeader>
        {categoryName && (
          <Link 
            href={`/categories/${category?.data?.attributes?.slug}`}
            className="text-xs font-medium text-primary hover:underline w-fit"
          >
            {categoryName}
          </Link>
        )}
        <CardTitle className="line-clamp-2">
          <Link href={`/articles/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {truncate(description, 120)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link 
          href={`/authors/${author?.data?.attributes?.slug}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Avatar className="h-8 w-8">
            {authorAvatar && <AvatarImage src={authorAvatar} alt={authorName} />}
            <AvatarFallback>
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{authorName}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
