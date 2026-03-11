# Cards Against Humanity - Clone

A pixel-perfect recreation of the Cards Against Humanity website built with a modern headless architecture.

## Live URLs
- Frontend: https://cah-frontend-three.vercel.app
- CMS Admin: https://cah-cms.vercel.app/admin
- Medusa Backend: https://cah-project.onrender.com

## Tech Stack
- Frontend: Next.js 15, Tailwind CSS, Vercel
- CMS: Payload CMS, MongoDB Atlas, Vercel
- Backend: Medusa.js, PostgreSQL, Render

## Setup Instructions

### Frontend
cd frontend
npm install
npm run dev

### CMS
cd cms
npm install
npm run dev

### Backend
cd backend
npm install
npm run dev

## CMS Structure
- Products collection: title, description, price, image, bulletPoints, slug
- Media collection: images
- Users collection: admin users

## Medusa Integration
- Products are synced from Payload CMS to Medusa via webhooks
- Cart and checkout handled by Medusa
- Dummy payment support included

## Sync Mechanism
When a product is created/updated in Payload CMS, a hook automatically calls the Medusa API to sync the product data both ways.