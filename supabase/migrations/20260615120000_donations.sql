-- Donation tracking for NOWPayments crypto donations.
--
-- Raw rows are written only by server-side routes using the service
-- role key (create-invoice on creation, the IPN webhook on status
-- updates), so RLS on public.donations has no policies at all.
--
-- Public pages read aggregated totals through the
-- project_donation_totals view instead, which only ever exposes a
-- per-project supporter count and raised amount.

create extension if not exists pgcrypto;

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null,
  order_id text not null unique,
  invoice_id text,
  payment_id text,
  pay_currency text,
  price_amount numeric not null,
  actually_paid numeric,
  status text not null default 'waiting' check (
    status in ('waiting', 'confirming', 'confirmed', 'sending', 'partially_paid', 'finished', 'failed', 'refunded', 'expired')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists donations_project_slug_idx on public.donations (project_slug);
create index if not exists donations_status_idx on public.donations (status);

alter table public.donations enable row level security;

create or replace view public.project_donation_totals as
select
  project_slug,
  count(*) filter (where status in ('confirmed', 'finished'))::int as supporters,
  coalesce(sum(price_amount) filter (where status in ('confirmed', 'finished')), 0) as raised_usd
from public.donations
group by project_slug;

grant select on public.project_donation_totals to anon, authenticated;
