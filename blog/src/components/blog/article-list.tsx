import { ArticleCard } from './article-card';
import { ArticlesResponse } from '@/types';

interface ArticleListProps {
  articles: ArticlesResponse;
}

export function ArticleList({ articles }: ArticleListProps) {
  if (!articles?.data || articles.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.data.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
