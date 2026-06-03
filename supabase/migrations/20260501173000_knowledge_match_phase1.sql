-- Knowledge Match (بذرة المعرفة) - Phase 1 schema
-- Creates mentorship and chat tables with RLS policies.

create extension if not exists pgcrypto;

create table if not exists public.knowledge_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  knowledge_type text not null check (
    knowledge_type in (
      'business_strategy',
      'digital_marketing',
      'design_branding',
      'tech_development',
      'finance_accounting',
      'legal_licensing'
    )
  ),
  description_ar text,
  description_en text,
  urgency text not null default 'flexible' check (
    urgency in ('urgent', 'soon', 'flexible')
  ),
  preferred_sessions integer not null default 4 check (preferred_sessions > 0),
  preferred_hours_per_session integer not null default 1 check (preferred_hours_per_session > 0),
  language_preference text not null default 'ar' check (
    language_preference in ('ar', 'en', 'both')
  ),
  status text not null default 'open' check (
    status in ('open', 'matched', 'in_progress', 'completed', 'cancelled')
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.mentor_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  bio_ar text,
  bio_en text,
  expertise_areas text[] not null default '{}',
  years_of_experience integer check (years_of_experience >= 0),
  current_role text,
  current_company text,
  hours_per_week_available integer check (hours_per_week_available >= 0),
  weeks_committed integer not null default 4 check (weeks_committed > 0),
  response_time_hours integer not null default 48 check (response_time_hours > 0),
  languages text[] not null default '{ar}',
  linkedin_url text,
  portfolio_url text,
  total_mentees_helped integer not null default 0 check (total_mentees_helped >= 0),
  total_hours_given integer not null default 0 check (total_hours_given >= 0),
  average_rating numeric(2,1) not null default 0.0 check (average_rating >= 0 and average_rating <= 5),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.mentorships (
  id uuid primary key default gen_random_uuid(),
  knowledge_request_id uuid not null references public.knowledge_requests(id) on delete cascade,
  mentor_id uuid not null references public.profiles(id) on delete cascade,
  project_owner_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  status text not null default 'pending' check (
    status in ('pending', 'active', 'completed', 'declined', 'cancelled')
  ),
  sessions_completed integer not null default 0 check (sessions_completed >= 0),
  total_messages integer not null default 0 check (total_messages >= 0),
  motivation_message text,
  started_at timestamptz,
  completed_at timestamptz,
  mentor_rating_of_mentee integer check (mentor_rating_of_mentee between 1 and 5),
  mentee_rating_of_mentor integer check (mentee_rating_of_mentor between 1 and 5),
  mentor_feedback text,
  mentee_feedback text,
  created_at timestamptz not null default now()
);

create table if not exists public.mentorship_messages (
  id uuid primary key default gen_random_uuid(),
  mentorship_id uuid not null references public.mentorships(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  attachment_url text,
  attachment_type text check (attachment_type in ('image', 'document', 'voice')),
  is_read boolean not null default false,
  is_session_marker boolean not null default false,
  session_action text check (
    session_action in ('session_start', 'session_end', 'session_summary')
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.mentorship_sessions (
  id uuid primary key default gen_random_uuid(),
  mentorship_id uuid not null references public.mentorships(id) on delete cascade,
  session_number integer check (session_number > 0),
  topic text,
  duration_minutes integer check (duration_minutes > 0),
  summary text,
  marked_complete_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_knowledge_requests_project_id on public.knowledge_requests(project_id);
create index if not exists idx_knowledge_requests_status on public.knowledge_requests(status);
create index if not exists idx_mentor_profiles_expertise_gin on public.mentor_profiles using gin(expertise_areas);
create index if not exists idx_mentor_profiles_languages_gin on public.mentor_profiles using gin(languages);
create index if not exists idx_mentorships_knowledge_request_id on public.mentorships(knowledge_request_id);
create index if not exists idx_mentorships_mentor_id on public.mentorships(mentor_id);
create index if not exists idx_mentorships_project_owner_id on public.mentorships(project_owner_id);
create index if not exists idx_mentorship_messages_mentorship_id_created_at
  on public.mentorship_messages(mentorship_id, created_at);
create index if not exists idx_mentorship_sessions_mentorship_id on public.mentorship_sessions(mentorship_id);

alter table public.knowledge_requests enable row level security;
alter table public.mentor_profiles enable row level security;
alter table public.mentorships enable row level security;
alter table public.mentorship_messages enable row level security;
alter table public.mentorship_sessions enable row level security;

-- mentor_profiles policies
drop policy if exists "mentor profiles are publicly readable" on public.mentor_profiles;
create policy "mentor profiles are publicly readable"
on public.mentor_profiles
for select
using (true);

drop policy if exists "mentor can insert own profile" on public.mentor_profiles;
create policy "mentor can insert own profile"
on public.mentor_profiles
for insert
with check (auth.uid() = id);

drop policy if exists "mentor can update own profile" on public.mentor_profiles;
create policy "mentor can update own profile"
on public.mentor_profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "mentor can delete own profile" on public.mentor_profiles;
create policy "mentor can delete own profile"
on public.mentor_profiles
for delete
using (auth.uid() = id);

-- knowledge requests: visible for discovery
drop policy if exists "knowledge requests are publicly readable" on public.knowledge_requests;
create policy "knowledge requests are publicly readable"
on public.knowledge_requests
for select
using (true);

-- mentorships: only mentor or project owner can read/update
drop policy if exists "participants can read mentorships" on public.mentorships;
create policy "participants can read mentorships"
on public.mentorships
for select
using (auth.uid() = mentor_id or auth.uid() = project_owner_id);

drop policy if exists "mentor can create mentorship offer" on public.mentorships;
create policy "mentor can create mentorship offer"
on public.mentorships
for insert
with check (auth.uid() = mentor_id);

drop policy if exists "participants can update mentorships" on public.mentorships;
create policy "participants can update mentorships"
on public.mentorships
for update
using (auth.uid() = mentor_id or auth.uid() = project_owner_id)
with check (auth.uid() = mentor_id or auth.uid() = project_owner_id);

-- messages: only mentorship participants can read/write
drop policy if exists "participants can read mentorship messages" on public.mentorship_messages;
create policy "participants can read mentorship messages"
on public.mentorship_messages
for select
using (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_messages.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
);

drop policy if exists "participants can insert mentorship messages" on public.mentorship_messages;
create policy "participants can insert mentorship messages"
on public.mentorship_messages
for insert
with check (
  auth.uid() = sender_id
  and exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_messages.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
);

drop policy if exists "participants can update mentorship messages" on public.mentorship_messages;
create policy "participants can update mentorship messages"
on public.mentorship_messages
for update
using (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_messages.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_messages.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
);

-- sessions: only mentorship participants can read/write
drop policy if exists "participants can read mentorship sessions" on public.mentorship_sessions;
create policy "participants can read mentorship sessions"
on public.mentorship_sessions
for select
using (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_sessions.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
);

drop policy if exists "participants can insert mentorship sessions" on public.mentorship_sessions;
create policy "participants can insert mentorship sessions"
on public.mentorship_sessions
for insert
with check (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_sessions.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
);

drop policy if exists "participants can update mentorship sessions" on public.mentorship_sessions;
create policy "participants can update mentorship sessions"
on public.mentorship_sessions
for update
using (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_sessions.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.mentorships m
    where m.id = mentorship_sessions.mentorship_id
      and (m.mentor_id = auth.uid() or m.project_owner_id = auth.uid())
  )
);

-- Keep mentorship message counter in sync
create or replace function public.increment_mentorship_message_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.mentorships
  set total_messages = total_messages + 1
  where id = new.mentorship_id;
  return new;
end;
$$;

drop trigger if exists trg_increment_mentorship_message_count on public.mentorship_messages;
create trigger trg_increment_mentorship_message_count
after insert on public.mentorship_messages
for each row
execute function public.increment_mentorship_message_count();
