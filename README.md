Finote Loza School Website

A professional, modern school website built with Next.js, Tailwind CSS, and Supabase. Deploy-ready for Vercel.

Tech Stack
- Next.js (Pages Router)
- Tailwind CSS
- Supabase (Auth, Database, Storage)
- Deployed on Vercel

Getting Started
1) Prerequisites
- Node.js 18+
- A Supabase project (URL + keys)

2) Setup
```bash
npm install
cp .env.local.example .env.local
# Fill in your Supabase values in .env.local
```

3) Development
```bash
npm run dev
```

4) Build & Start
```bash
npm run build
npm start
```

Supabase Configuration
1) Create buckets
- Bucket `gallery` (public) for site photos
- Bucket `admissions` (public) for downloadable admissions forms

2) Database schema
Run the SQL in `supabase/migrations.sql` in the Supabase SQL editor.

3) Auth
- Enable Email/Password auth in Supabase Authentication settings
- Create an admin user via Supabase Auth Users

RLS Policies (high-level)
- The provided SQL creates tables and sensible RLS:
  - Public can read `articles` published, `events`, and `photos`
  - Authenticated users can insert/update/delete for admin tools

ISR
- News, Gallery, and Calendar pages use Incremental Static Regeneration via `getStaticProps` with `revalidate` intervals.

Deploy on Vercel
1) Push this repo to GitHub
2) Import in Vercel
3) Set environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (Optional) `NEXT_PUBLIC_SITE_URL`
4) Deploy

Environment Variables
See `.env.local.example` for required variables.

Project Structure
```
finote-loza-school/
  components/
  lib/
  pages/
  public/
  styles/
  supabase/
  tailwind.config.js
  postcss.config.js
  package.json
  README.md
```

Notes
- Admin pages are protected client-side. For stricter enforcement, add server-side checks or Supabase Auth Helpers.
- For Storage downloads (Admissions), ensure the bucket is public or generate signed URLs.



