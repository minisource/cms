# Minisource Blog

A modern blog application built with Next.js 15, TypeScript, and Tailwind CSS, powered by Strapi CMS.

## Features

- 🎨 Modern and responsive design with Tailwind CSS
- 🌙 Dark mode support
- 📝 Blog articles with rich content
- 🔍 Category and author filtering
- 🎯 SEO optimized
- 🚀 Fast page loads with Next.js 15
- 📱 Mobile-friendly
- 🔗 Integration with Strapi CMS

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Strapi CMS running (see `../cms` directory)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env.development.local
```

3. Update the environment variables in `.env.development.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run dev:turbo` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types
- `npm run test` - Run tests

## Project Structure

```
blog/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (main)/       # Main layout routes
│   │   │   ├── articles/ # Article pages
│   │   │   ├── authors/  # Author pages
│   │   │   └── categories/ # Category pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── api/              # API services
│   │   └── strapi/       # Strapi API client
│   ├── components/       # React components
│   │   ├── blog/         # Blog-specific components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI components
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── public/               # Static files
└── ...config files
```

## Strapi Integration

This blog connects to the Strapi CMS to fetch content. Make sure the Strapi CMS is running and accessible at the URL specified in `NEXT_PUBLIC_STRAPI_URL`.

### Required Strapi Content Types

- Article
- Author
- Category
- Global (site settings)

## Docker

Build and run with Docker:

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up -d
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
