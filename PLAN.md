# Wedding Invitation — Build Plan

Single-page digital wedding invitation for Hamza & Mariame's wedding. Inspired by thedigitalyes.com but built from scratch as a Claude Code training project.

**Repo:** https://github.com/Hamzasbaa/wedding
**Domain:** mariameandhamza.com (buying on Namecheap)
**Date:** 14 November 2026
**Venue:** Casablanca (specific venue TBD)
**Languages:** French (default) + Arabic (RTL)
**Names in Arabic:** مريم (Maryam) · حمزة (Hamza)

## 1. Goal

Ship one website, one invitation, before the wedding. Public URL guests can open on their phone. Private admin page for Hamza to track RSVPs and export a CSV.

**Definition of done:**
- [ ] Deployed on a custom domain
- [ ] Opens on iPhone Safari, Android Chrome, desktop
- [ ] RSVP form writes to Supabase and guests see a confirmation screen
- [ ] Admin page lists all RSVPs with counters and CSV export
- [ ] Available in French + Arabic (with proper RTL layout)
- [ ] Tested end-to-end with a fake guest before sending real ones

## 2. Scope

**In:**
- One invitation (hardcoded couple, date, venue, schedule)
- RSVP form → Supabase
- Admin page gated by a single password
- Language toggle (FR / AR) with full RTL support for Arabic
- Envelope-open cover animation (tap to reveal, no audio)
- Static illustrations from Claude Design

**Out:**
- Multi-tenant (no other couples, no slugs)
- Stripe or any payment
- Email confirmations to guests (can be added later via Resend if wanted)
- Guest auth / private codes (public URL)
- Live venue map embed (static illustrated map or address only)
- Photo gallery uploads (photos bundled as static assets)
- Ambient music (removed from scope)

## 3. Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind 4 + shadcn/ui
- **Animation:** Framer Motion (envelope open, section reveals)
- **Backend:** Supabase (Postgres + auth for admin + storage if needed)
- **i18n:** react-i18next
- **Hosting:** Vercel, connected to a GitHub repo
- **Domain:** TBD, Cloudflare or whatever registrar

Matches the Vite + React + Tailwind pattern in [paperclip/ui](/Users/hamzasbaa/_Projects/personal/paperclip/ui) and [sam/backoffice](/Users/hamzasbaa/_Projects/sam/backoffice). Supabase is the one new thing.

## 4. Architecture

### Frontend routes
- `/` — the invitation (public)
- `/admin` — RSVP dashboard (password-gated via Supabase Auth)

### Supabase schema
```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  guest_name text not null,
  email text,
  attending boolean not null,
  plus_one_name text,
  dietary_notes text,
  song_request text,
  message text,
  language text
);
```
Row-level security: anyone can insert, only authenticated admin can select.

### Admin auth
Single admin user in Supabase Auth (Hamza's email). Standard Supabase email/password login. No magic link, no OAuth. Simpler is better.

### i18n + RTL
react-i18next with 2 resource files: `fr.json`, `ar.json`. Language toggle in the top-right, selection persisted in localStorage. No routing per language (no `/fr` prefix).

French is the default. When Arabic is selected:
- `<html dir="rtl" lang="ar">` on the root
- Body font swaps to an Arabic-friendly pairing (headlines: Amiri or Aref Ruqaa; body: Noto Naskh Arabic or Cairo)
- All layouts use Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`) so they flip automatically
- Icons with directionality (arrows, chevrons) get mirrored via the `rtl:` variant
- The schedule timeline and any progress indicators reverse direction

This is a hard constraint from Phase 1, not a Phase 5 bolt-on.

## 5. Phases

Each phase is one focused session. Commit at the end of each.

### Phase 0 — Scaffold (no design blocker)
- Initialize Vite + React + TS + Tailwind project in [/Users/hamzasbaa/_Projects/personal/wedding](/Users/hamzasbaa/_Projects/personal/wedding)
- Add shadcn/ui, Framer Motion, react-i18next, Supabase client
- Create Supabase project, run the schema migration, set up env vars
- Push to a new GitHub repo, wire up Vercel preview deploys
- **Done when:** deploy preview shows a Hello World page

### Phase 1 — Static skeleton (no design blocker)
Build every section with placeholder copy and boxy Tailwind defaults. No Framer Motion yet, no illustrations. Just the structure.
- Envelope cover (static, no animation)
- Hero: names, date, countdown
- Our story: 3 paragraphs, 3 photo placeholders
- Schedule timeline (built with logical properties so it mirrors under RTL)
- Two venue cards
- RSVP form (no submission wired)
- Language toggle FR/AR (both JSON files stubbed, switching flips `dir` and fonts)
- Footer
- **Done when:** every section is laid out on mobile and desktop in both FR and AR, all copy is real

### Phase 2 — Design pass (needs Claude Design output)
- Drop in color tokens, fonts, illustrations, monogram from the Claude Design export
- Apply envelope-open animation with Framer Motion (tap to open, reveals the page)
- Section scroll-reveal animations
- QA the animations in both LTR (French) and RTL (Arabic) modes
- **Done when:** the site looks close to the Claude Design mockup on phone, in both languages

### Phase 3 — RSVP wiring
- Supabase client setup with typed schema (generate types from DB)
- Form submission → insert into rsvps → confirmation screen with guest's name
- Error states (offline, validation)
- Zod schema for validation, matches Supabase schema
- **Done when:** you can RSVP from a real phone and the row appears in Supabase

### Phase 4 — Admin dashboard
- `/admin` route, protected by Supabase Auth session
- Login page if not authenticated
- Table of RSVPs with sortable columns
- Counters: confirmed / pending / declined
- Dietary tags highlighted
- "Export CSV" button
- **Done when:** Hamza can log in on phone, see responses, download CSV

### Phase 5 — i18n completion
- Finalize French copy across every section
- Translate everything to Arabic (Mariame and/or family can review)
- Language toggle in header, persists across reloads
- RSVP form labels + confirmation messages translated and RTL-aligned
- Arabic numerals vs Arabic-Indic numerals decision (recommend keeping Arabic numerals for the date to avoid confusion)
- **Done when:** switching language swaps every visible string AND the layout flips cleanly, tested on real phones

### Phase 6 — Polish + domain
- Real-device QA: iPhone, Android, iPad, desktop. At least one guest's grandma-type device.
- Custom domain via Vercel, DNS at registrar
- Favicon, Open Graph image, meta tags for link previews in WhatsApp / iMessage
- Lighthouse pass: no broken links, alt text on images, keyboard accessible
- **Done when:** a test guest can open the link on a cold device and finish RSVP without help

### Phase 7 — Send
- Soft launch: send to 2-3 friends, collect feedback
- Fix whatever breaks
- Send to real guest list

## 6. Decisions baked in

- **Public URL, no guest auth.** Simpler, matches thedigitalyes.com. If privacy is needed later, add a URL slug per guest.
- **Static photos bundled, no CMS.** Photos go in `/public`, edited via code. Zero moving parts.
- **Static map, not Google Maps embed.** Screenshot or illustration + address text. No API keys, no loading, better aesthetic.
- **Music: user-initiated, single MP3 loop.** Autoplay is blocked by browsers anyway, and "tap to open" is a nice UX.
- **Admin password via Supabase Auth, not an env variable.** Proper auth is one small step up and teaches real Supabase Auth patterns.
- **No email notifications in MVP.** Can add Resend later if wanted. Adds a service, not worth it on day one.

## 7. What's unblocked right now

Phase 0 and Phase 1 don't need the Claude Design output. While Hamza works with Claude Design on visuals, Claude Code can scaffold the project, wire Supabase, and build the static skeleton with placeholder styling.

When the design is ready, Phase 2 kicks in and the skeleton gets its skin.

## 8. Risks

- **Supabase learning curve.** New tool. If RLS gets painful, downgrade to Drizzle + SQLite matching the [paperclip/server](/Users/hamzasbaa/_Projects/personal/paperclip/server) pattern.
- **RTL layout bugs.** Easy to miss when building in LTR. Mitigation: add a `rtl` URL query param toggle from day one so every phase is QA'd in both directions.
- **Arabic font rendering.** System defaults are mediocre. Pick a Google Fonts pair (headline + body) in Phase 2 and self-host for performance.
- **Framer Motion + React 19.** Check compatibility at scaffold time. If broken, use Motion One or plain CSS.
- **i18n scope creep.** Two languages is the cap. Resist requests for a 3rd unless guest list demands it.

## 9. Open questions before Phase 0

**Resolved:**
- Repo: https://github.com/Hamzasbaa/wedding
- Domain: mariameandhamza.com
- Partner: Mariame (مريم)
- Date: 14 November 2026
- Venue city: Casablanca
- Languages: French (default) + Arabic (RTL toggle)
- Music: out of scope

**Still open:**
- [ ] Exact venue(s) — ceremony and reception addresses (not blocking Phase 0-1)
- [ ] Hamza's name in Arabic confirmed as حمزة (standard, safe default)
