# EastCulture Wellness

A multilingual wellness education platform offering video courses and individual lessons in traditional Chinese medicine, Tai Chi, Qigong, Face Yoga, and related practices.

**Live site:** https://www.wellnesseastern.com/
**API:** Deployed separately on Vercel as a Next.js backend.

## Screenshots

![Homepage hero](screenshots/homepage-hero.jpg)
*Landing page with multilingual navigation and brand introduction.*

![Course catalogue](screenshots/courses-overview.jpg)
*Course catalogue with structured video lessons and pricing.*

![Course video player](screenshots/course-video-player.jpg)
*Protected video playback with lesson navigation and purchase-based access.*

## Overview

EastCulture is a commercial-style wellness platform built around three purchase types: full courses, individual videos, and a monthly membership. The frontend is a React SPA, the API is a Next.js service, and payments and content access are gated through Stripe and time-limited S3 URLs.

The platform targets learners interested in traditional Chinese medicine, Tai Chi, Qigong, and acupressure, including practitioners looking for structured material in their own language.

## Tech Stack

**Frontend** — React, Vite, Tailwind CSS, Framer Motion, i18next (6 languages: English, Simplified Chinese, Korean, Japanese, Spanish, French).

**Backend** — Next.js API routes (TypeScript), JWT auth with HTTP-only cookies, Stripe webhook handling.

**Data & storage** — Supabase (PostgreSQL with row-level security), AWS S3 for video hosting with pre-signed URL access.

**Deployment** — Frontend and API deployed separately on Vercel.

## Key Features

- Six-language UI with i18next and per-route translation loading.
- Stripe Checkout for courses, single videos, and monthly subscriptions.
- Webhook-driven content unlocking after successful payment.
- Pre-signed S3 URLs for video access (1-hour expiry) tied to verified purchases.
- JWT authentication with HTTP-only cookies and bcrypt-hashed passwords.
- Admin view for user counts, recent orders, and revenue totals.
- Mobile-first responsive layout.

## Architecture

The frontend talks to the Next.js API for auth, purchases, and video URL requests. Purchase events are routed through Stripe, with webhooks unlocking content in Supabase. Video files live in S3 and are served via short-lived signed URLs only after the API verifies the user owns the content.

```
Frontend (React/Vite) ─▶ Next.js API ─▶ Supabase
                              │
                              ├─▶ Stripe (Checkout + Webhooks)
                              └─▶ AWS S3 (signed URLs)
```

**Payment flow:** user starts checkout → API creates Stripe session → user pays → Stripe webhook unlocks content in DB → user gains access.

**Video flow:** user requests a lesson → API verifies purchase → API returns a 1-hour signed S3 URL → frontend plays the video.

## Project Structure

```
eastculture-wellness/
├── frontend/                  # React + Vite SPA
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── locales/           # en, zh, ko, ja, es, fr
│   │   ├── App.jsx
│   │   └── i18n.js
│   └── .env.example
│
├── api/                       # Next.js backend
│   ├── app/api/
│   │   ├── auth/              # Register, login, logout
│   │   ├── checkout/          # Stripe session creation
│   │   ├── webhook/           # Stripe webhook handler
│   │   ├── video-url/         # Signed S3 URL endpoint
│   │   ├── purchases/         # User purchase queries
│   │   └── admin/             # Admin endpoints
│   ├── lib/                   # supabase / stripe / auth clients
│   └── .env.example
│
└── screenshots/
```

## Setup

Prerequisites: Node.js 18+, a Supabase project, a Stripe account, and an S3 bucket.

```bash
git clone https://github.com/zj115/eastculture-wellness.git
cd eastculture-wellness
```

**Frontend**

```bash
cd frontend
npm install
cp .env.example .env.local   # VITE_API_BASE=http://localhost:3000
npm run dev
```

**API**

```bash
cd api
npm install
cp .env.example .env.local   # see below
npm run dev
```

Then run the SQL in `api/supabase/schema.sql` against your Supabase project, register a Stripe webhook pointing at `/api/webhook/stripe`, and create an S3 bucket with CORS allowing the frontend origin.

## Environment Variables

**Frontend (`.env.local`)**

```
VITE_API_BASE=https://your-api-domain.vercel.app
```

**API (`.env.local`)**

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
AWS_REGION=ap-southeast-2
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
NEXT_PUBLIC_FRONTEND_URL=
ADMIN_SECRET_KEY=
```

`.env.local` is gitignored. Use `.env.example` as a template.

## What I Built

I built this project end-to-end, from the initial schema design through to the production deployment.

On the frontend I set up the React + Vite SPA, built the i18next layer for six languages, and put together the course/lesson/account pages with Tailwind and Framer Motion. The part that took the most iteration was making the video player respect purchase state cleanly — a locked lesson needs to feel like a locked lesson, not an error.

On the backend I built the Next.js API in TypeScript, wired up Stripe Checkout for the three purchase types, and wrote the webhook handler that unlocks content after a successful payment. JWT auth lives in HTTP-only cookies with bcrypt-hashed passwords.

The video pipeline was the part I spent the most time getting right. S3 holds the source files, and the API generates short-lived signed URLs only after checking that the user actually owns the lesson. URLs expire in an hour so a leaked link can't be shared indefinitely.

I designed the Postgres schema in Supabase with row-level security, added the indexes the purchase queries needed, and configured the Vercel deployments for frontend and API as separate services.

## Security and Privacy

Production credentials are not stored in this repository. Passwords are hashed with bcrypt before they reach the database, JWTs sit in HTTP-only cookies, and Stripe webhook signatures are verified on every call. Video URLs are signed and short-lived, so they can't be reused. Customer data and payment details are kept out of the repo entirely; screenshots are sanitised.

## Future Improvements

A few things I'd like to add when there's time: video progress tracking and resume, course-completion certificates, an instructor-facing CMS view, and adaptive-bitrate streaming for slower connections.

## License

*Shared for portfolio and demonstration purposes. All rights reserved.*
