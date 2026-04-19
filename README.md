# mariameandhamza.com

Digital wedding invitation for Mariame & Hamza, 14 November 2026, Casablanca.

Single-page React app with an RSVP form backed by Supabase. French default, Arabic toggle with full RTL layout.

See [PLAN.md](./PLAN.md) for the full build plan.

## Stack

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- shadcn/ui components (added on demand)
- Framer Motion for animations
- react-i18next for French / Arabic
- Supabase for the RSVP database + admin auth
- Deployed on Vercel

## Local setup

```bash
# 1. Use the pinned Node version
nvm use

# 2. Install dependencies
pnpm install

# 3. Configure environment (see .env.local.example, create .env.local yourself)
# VITE_SUPABASE_URL=https://otddcgrnyinjawguxujn.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
# (find these at: Supabase dashboard → Project Settings → API Keys)

# 4. Run the Supabase migration
# Open Supabase dashboard → SQL Editor → paste supabase/migrations/0001_init.sql → Run

# 5. Start the dev server
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the invitation.

## Scripts

- `pnpm dev` — start the dev server with HMR
- `pnpm build` — type-check and build for production
- `pnpm preview` — preview the production build locally
- `pnpm lint` — run ESLint

## Deployment

Push to `main`. Vercel redeploys automatically.

Environment variables also need to be configured in the Vercel project settings (same values as `.env.local`).
