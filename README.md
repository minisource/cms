# Minisource CMS

Content Management System with Strapi backend and Next.js blog frontend.

## Repository Structure

This is a monorepo containing two projects:

```
cms/
├── cms/           # Strapi headless CMS
├── blog/          # Next.js blog frontend
├── docker-compose.cms.yml
└── docker-compose.blog.yml
```

## Projects

### Strapi CMS (Backend)

Headless CMS for content management.

- **Tech Stack**: Strapi 5, Node.js, SQLite/PostgreSQL
- **Port**: 1337
- **Admin**: http://localhost:1337/admin

```bash
cd cms
cp .env.example .env
npm install
npm run develop
```

### Blog Frontend

Next.js-based blog that consumes content from Strapi.

- **Tech Stack**: Next.js 15, React, TypeScript, Tailwind CSS
- **Port**: 3001

```bash
cd blog
cp .env.example .env
npm install
npm run dev
```

## Quick Start

### With Docker Compose

```bash
# Start Strapi CMS
docker-compose -f docker-compose.cms.yml up -d

# Start Blog
docker-compose -f docker-compose.blog.yml up -d

# Or start both together
docker-compose -f docker-compose.cms.yml -f docker-compose.blog.yml up -d
```

### Development Setup

```bash
# Terminal 1: Start Strapi CMS
cd cms
cp .env.example .env
npm install
npm run develop

# Terminal 2: Start Blog
cd blog
cp .env.example .env
npm install
npm run dev
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Blog Frontend (:3001)                  │
│                     (Next.js)                            │
└─────────────────────────┬───────────────────────────────┘
                          │ GraphQL/REST
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Strapi CMS (:1337)                     │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │Articles │  │  Media  │  │  Users  │  │  Tags   │    │
│  │         │  │ Library │  │ & Roles │  │  Cats   │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
                    ┌───────────┐
                    │ PostgreSQL│
                    │  /SQLite  │
                    └───────────┘
```

## Content Types

### Articles
- Title, slug, content (Rich Text)
- Featured image
- Author reference
- Categories and tags
- SEO metadata
- Publication date
- Status (draft/published)

### Categories
- Name, slug
- Description
- Parent category (hierarchical)

### Tags
- Name, slug

### Authors
- Name, bio, avatar
- Social links

## Configuration

### Strapi CMS Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `1337` |
| `DATABASE_CLIENT` | Database type | `sqlite` |
| `DATABASE_URL` | PostgreSQL URL | - |
| `APP_KEYS` | Security keys | Required |
| `API_TOKEN_SALT` | API token salt | Required |
| `ADMIN_JWT_SECRET` | Admin JWT secret | Required |

### Blog Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Strapi API URL |
| `STRAPI_API_TOKEN` | API token for SSR |

## API Endpoints

### Strapi REST API

| Endpoint | Description |
|----------|-------------|
| `GET /api/articles` | List articles |
| `GET /api/articles/:slug` | Get article |
| `GET /api/categories` | List categories |
| `GET /api/tags` | List tags |
| `GET /api/authors` | List authors |

### GraphQL

GraphQL playground available at: `http://localhost:1337/graphql`

```graphql
query {
  articles {
    data {
      id
      attributes {
        title
        slug
        content
        publishedAt
      }
    }
  }
}
```

## Deployment

### Strapi CMS

```bash
# Build Strapi
cd cms
npm run build

# Start production server
npm start
```

### Blog

```bash
# Build Next.js
cd blog
npm run build

# Start production server
npm start
```

## Docker

Images are published to [Docker Hub](https://hub.docker.com/orgs/minisource/repositories) on every successful build to `main`.

| Image | Tags |
|-------|------|
| `minisource/cms` | `latest`, commit SHA |
| `minisource/cms-blog` | `latest`, commit SHA |

### Production deployment

```bash
export TAG=latest
docker compose -f docker-compose.cms.yml up -d
docker compose -f docker-compose.blog.yml up -d
```

### Local build

```bash
docker build -t minisource/cms:latest ./cms
docker build -t minisource/cms-blog:latest ./blog
```

### GitHub Actions secrets

- `DOCKERHUB_USERNAME` — Docker Hub username
- `DOCKERHUB_TOKEN` — Docker Hub access token

## Features

### CMS Features
- Visual content editor
- Media library
- Role-based access
- API tokens
- Webhooks
- Internationalization

### Blog Features
- Static site generation (SSG)
- Server-side rendering (SSR)
- SEO optimization
- Responsive design
- Dark mode
- RSS feed
- Sitemap

## Development

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (optional)

### Strapi Development

```bash
cd cms

# Install dependencies
npm install

# Start development server
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

### Blog Development

```bash
cd blog

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT