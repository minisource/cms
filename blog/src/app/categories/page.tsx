import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { strapiApi } from '@/api';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function CategoriesPage() {
  let categories = null;
  let error: string | null = null;

  try {
    categories = await strapiApi.getCategories();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load categories';
    console.error('Error loading categories:', err);
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Categories</h1>
        <p className="text-lg text-muted-foreground">
          Browse articles by category
        </p>
      </div>
      
      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">Cannot Load Categories</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : categories?.data && categories.data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.data.map((category) => (
            <Link key={category.id} href={`/categories/${category.attributes.slug}`}>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{category.attributes.name}</CardTitle>
                  {category.attributes.description && (
                    <CardDescription>{category.attributes.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      )}
    </div>
  );
}
