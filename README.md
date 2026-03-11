# Cards Against Humanity — Clone

A pixel-perfect recreation of the Cards Against Humanity website built with a modern headless architecture using Next.js, Payload CMS, and Medusa.js.

## Live URLs

| Service | URL |
|---|---|
| Frontend | https://cah-frontend-three.vercel.app |
| CMS Admin | https://cah-cms.vercel.app/admin |
| Medusa Backend | https://cah-project.onrender.com |

> **Note:** The Medusa backend is hosted on Render's free tier. On first visit, please allow 1–2 minutes for the service to wake up from idle.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), Tailwind CSS, TypeScript |
| CMS | Payload CMS, MongoDB Atlas |
| Backend | Medusa.js, PostgreSQL |
| Frontend Hosting | Vercel |
| CMS Hosting | Vercel |
| Backend Hosting | Render (Free Tier) |

## Pages Implemented

- **Homepage** — Hero section, animated card ticker, shop grid, about section, footer
- **Product Pages** — Dynamic `[slug]` routing for all products (cards-against-humanity, more-cah, green-box, blue-box)
- **Cart** — Add/remove items, quantity management
- **Checkout** — Medusa-powered order creation with dummy payment
- **Login / Register** — Medusa customer authentication

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL (for Medusa)
- MongoDB Atlas account (for Payload CMS)

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_MEDUSA_BACKEND_URL and NEXT_PUBLIC_PAYLOAD_URL
npm run dev
```

### CMS (Payload)

```bash
cd cms
npm install
cp .env.example .env
# Fill in MONGODB_URI and PAYLOAD_SECRET
npm run dev
# Admin panel: http://localhost:3001/admin
```

### Backend (Medusa)

```bash
cd backend
npm install
cp .env.template .env
# Fill in DATABASE_URL, JWT_SECRET, COOKIE_SECRET
npm run build
npm run start
# API: http://localhost:9000
```

## CMS Structure (Payload CMS)

### Collections

**Products**
- `title` (text) — Product name
- `slug` (text, unique) — URL identifier
- `description` (richText) — Full product description
- `price` (number) — Product price in USD
- `bulletPoints` (array of text) — Feature highlights
- `images` (relationship → Media) — Product images

**Media**
- Standard Payload media collection for image uploads

**Users**
- Admin users for CMS access

All content is fully dynamic — changing any field in Payload CMS automatically reflects on the frontend via API calls.

## Medusa Integration

The frontend communicates with Medusa for all commerce operations:

- **Product display** — Products fetched from Payload CMS (source of truth for content)
- **Add to cart** — Medusa cart API (`POST /store/carts/:id/line-items`)
- **Authentication** — Medusa customer API (`POST /store/auth`)
- **Checkout** — Medusa order creation with dummy payment provider
- **Orders** — Stored and managed in Medusa

## CMS ↔ Medusa Sync Mechanism

Two-way synchronization is implemented via webhooks:

### Payload CMS → Medusa

When a product is created or updated in Payload CMS, an `afterChange` hook fires automatically:

```typescript
// cms/collections/Products.ts
afterChange: [
  async ({ doc }) => {
    await fetch(`${process.env.MEDUSA_BACKEND_URL}/admin/products`, {
      method: doc.medusaId ? 'POST' : 'PUT',
      headers: { 'Authorization': `Bearer ${process.env.MEDUSA_API_KEY}` },
      body: JSON.stringify({ title: doc.title, variants: [{ prices: [{ amount: doc.price * 100 }] }] }),
    });
  }
]
```

### Medusa → Payload CMS

When product data changes in Medusa, a subscriber fires and updates Payload:

```typescript
// backend/src/subscribers/product-updated.ts
export default async function({ data, container }) {
  await fetch(`${process.env.PAYLOAD_URL}/api/products`, {
    method: 'PATCH',
    body: JSON.stringify({ where: { slug: { equals: data.handle } }, data: { price: data.variants[0].prices[0].amount / 100 } }),
  });
}
```

This ensures product titles, prices, and descriptions stay consistent across both systems.

## Performance

Target Lighthouse score: **95+**

Optimizations implemented:
- Next.js Image component for automatic image optimization
- Static generation where possible
- Proper meta tags and Open Graph data for SEO
- Font optimization via `next/font`

## Deployment

### Frontend & CMS (Vercel)
Both are deployed via Vercel with automatic deployments on push to `main`.

### Medusa Backend (Render)
Deployed on Render's free tier. Uses PostgreSQL add-on for persistent storage.

Environment variables are configured in each platform's dashboard.