# Supabase migration steps (Knowledge Match Phase 1)

## 1) Prerequisites

- Install Supabase CLI:
  - `npm i -g supabase`
- Authenticate:
  - `supabase login`

## 2) Link this project (once)

- `supabase link --project-ref <YOUR_SUPABASE_PROJECT_REF>`

## 3) Apply migration remotely

- `supabase db push`

This will apply:
- `supabase/migrations/20260501173000_knowledge_match_phase1.sql`

## 4) Verify tables and policies

In Supabase SQL editor, run:

```sql
select tablename
from pg_tables
where schemaname = 'public'
  and tablename like 'knowledge_%'
   or tablename like 'mentor_%'
   or tablename like 'mentorship%';
```

Then verify RLS is enabled:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'knowledge_requests',
    'mentor_profiles',
    'mentorships',
    'mentorship_messages',
    'mentorship_sessions'
  );
```

## 5) Local development

If you run a local Supabase stack:

- `supabase start`
- `supabase db reset`

This recreates your local database and applies all migrations from scratch.
