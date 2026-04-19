-- Initial schema for the wedding RSVP system.
-- Run this from the Supabase dashboard SQL editor (or via `supabase db push`).
-- Creates one table and the RLS policies that make it safe to expose to the browser.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_name text not null,
  email text,
  attending boolean not null,
  plus_one_name text,
  dietary_notes text,
  message text,
  language text check (language in ('fr', 'ar'))
);

alter table public.rsvps enable row level security;

-- Anyone visiting the invitation URL can submit their RSVP (anonymous inserts allowed).
drop policy if exists "Anyone can submit an RSVP" on public.rsvps;
create policy "Anyone can submit an RSVP"
  on public.rsvps
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users (admin) can read the list.
drop policy if exists "Authenticated users can read RSVPs" on public.rsvps;
create policy "Authenticated users can read RSVPs"
  on public.rsvps
  for select
  to authenticated
  using (true);
