import Image from 'next/image';
import { formatDate, getStrapiMedia, getReadingTime } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Article } from '@/types';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface ArticleContentProps {
  article: {
    id: number;
    attributes: Article;
  };
}

export function ArticleContent({ article }: ArticleContentProps) {
  const { title, description, content, cover, author, publishedAt, category } = article.attributes;
  
  const coverUrl = getStrapiMedia(cover?.data?.attributes?.url);
  const authorAvatar = getStrapiMedia(author?.data?.attributes?.avatar?.data?.attributes?.url);
  const authorName = author?.data?.attributes?.name || 'Anonymous';
  const categoryName = category?.data?.attributes?.name;
  const readingTime = getReadingTime(content);

  return (
    <article className="mx-auto max-w-4xl">
      {/* Header */}
      <header className="mb-8 space-y-4">
        {categoryName && (
          <Link 
            href={`/categories/${category?.data?.attributes?.slug}`}
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            {categoryName}
          </Link>
        )}
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground">
            {description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link href={`/authors/${author?.data?.attributes?.slug}`} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Avatar className="h-10 w-10">
              {authorAvatar && <AvatarImage src={authorAvatar} alt={authorName} />}
              <AvatarFallback>
                {authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{authorName}</p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </Link>
        </div>
      </header>

      <Separator className="my-8" />

      {/* Cover Image */}
      {coverUrl && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={coverUrl}
            alt={cover?.data?.attributes?.alternativeText || title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose-article"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
