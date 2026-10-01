-- Photos and videos shown on a project's page, one row per item, in
-- sort_order. Upload files to the project-images storage bucket and paste
-- their public URL into url, or use a YouTube / Vimeo link with kind
-- 'embed'.
--
-- Rows are readable by the public (anon) key only while their project is
-- published; edits are made in the dashboard (service role).

create table if not exists public.project_media (
  id            uuid primary key default gen_random_uuid(),
  project_slug  text not null
                references public.projects (slug)
                on update cascade on delete cascade,
  -- image: a photo; video: an uploaded video file (mp4 / webm);
  -- embed: a YouTube or Vimeo page link.
  kind          text not null default 'image'
                check (kind in ('image', 'video', 'embed')),
  url           text not null,
  -- Optional still shown before a video plays.
  poster_url    text,
  caption_en    text not null default '',
  caption_ar    text not null default '',
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists project_media_project_slug_idx
  on public.project_media (project_slug, sort_order);

alter table public.project_media enable row level security;

drop policy if exists "Media of published projects is public" on public.project_media;
create policy "Media of published projects is public"
  on public.project_media
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.projects p
      where p.slug = project_media.project_slug
        and p.published
    )
  );
