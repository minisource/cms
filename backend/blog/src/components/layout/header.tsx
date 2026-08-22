import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
            Articles
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/authors" className="text-sm font-medium hover:text-primary transition-colors">
            Authors
          </Link>
        </nav>
      </div>
    </header>
  );
}
