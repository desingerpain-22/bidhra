-- Enquiries from the "Partner with Bidhra" form on the How to Donate page.
-- Every submission is stored here before the notification email is sent, so
-- none is lost if email delivery fails. Rows are written by the site's
-- server with the service role; the public (anon) key has no access.

create table if not exists public.partnership_inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  organization  text,
  email         text not null,
  message       text not null,
  -- For tracking follow-up: e.g. new, contacted, closed.
  status        text not null default 'new',
  -- Used to rate-limit submissions (5 per IP per hour).
  ip_address    text,
  -- Notification email: whether Resend accepted it, its id, and the error
  -- if sending failed.
  email_sent    boolean not null default false,
  email_id      text,
  email_error   text
);

create index if not exists partnership_inquiries_ip_created_idx
  on public.partnership_inquiries (ip_address, created_at desc);

-- No policies: only the service role (which bypasses RLS) can read or write.
alter table public.partnership_inquiries enable row level security;
