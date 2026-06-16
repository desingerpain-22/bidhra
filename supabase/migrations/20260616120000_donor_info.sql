-- Add donor info columns to donations table.
-- donor_email is internal-only (never exposed via public views).
-- is_public controls whether display_name is shown or masked as 'Anonymous'.

alter table public.donations
  add column if not exists donor_name text,
  add column if not exists donor_email text,
  add column if not exists is_public boolean not null default true;

-- Public-safe view: names masked for donors who chose anonymous,
-- emails never exposed, only confirmed/finished payments shown.
create or replace view public.project_donor_list as
select
  project_slug,
  case when is_public and donor_name is not null then donor_name else 'Anonymous' end as display_name,
  price_amount,
  created_at
from public.donations
where status in ('confirmed', 'finished')
order by created_at desc;

grant select on public.project_donor_list to anon, authenticated;
