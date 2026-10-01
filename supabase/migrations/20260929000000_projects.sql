-- Projects shown on the website. Add or edit rows in the Supabase Table
-- Editor; the site picks up changes within about five minutes.
--
-- Only rows with published = true are readable by the public (anon) key.
-- There are no public write policies: rows are edited in the dashboard,
-- which uses the service role and bypasses row level security.

create table if not exists public.projects (
  slug              text primary key
                    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title_en          text not null,
  title_ar          text not null,
  summary_en        text not null default '',
  summary_ar        text not null default '',
  -- Long story; blank lines separate paragraphs.
  story_en          text not null default '',
  story_ar          text not null default '',
  owner             text not null default '',
  location_en       text not null default '',
  location_ar       text not null default '',
  category_en       text not null default '',
  category_ar       text not null default '',
  support_type      text not null default 'funding'
                    check (support_type in ('funding', 'knowledge', 'both')),
  goal              numeric not null default 0 check (goal >= 0),
  -- Amount raised so far, entered by hand. Ignored while
  -- use_live_chuffed is on.
  raised            numeric not null default 0 check (raised >= 0),
  supporters        integer not null default 0 check (supporters >= 0),
  -- Turn on for the project the live Chuffed campaign is raising for; its
  -- raised amount and supporters then come from Chuffed.
  use_live_chuffed  boolean not null default false,
  days_left         integer not null default 0,
  -- [{"en": "...", "ar": "..."}], for knowledge / both projects.
  skills_needed     jsonb not null default '[]'::jsonb
                    check (jsonb_typeof(skills_needed) = 'array'),
  verified          boolean not null default true,
  -- A path in /public (e.g. /projects/photo.png) or a full image URL, such
  -- as one from the project-images storage bucket.
  cover_url         text,
  support_cta_en    text,
  support_cta_ar    text,
  published         boolean not null default false,
  -- Lower numbers are listed first.
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
  on public.projects
  for select
  to anon, authenticated
  using (published);

create or replace function public.set_projects_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_projects_updated_at();

-- Public bucket for project photos. Upload in the dashboard (Storage >
-- project-images), then paste the file's public URL into cover_url.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;
