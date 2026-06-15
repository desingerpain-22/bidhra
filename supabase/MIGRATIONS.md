# Supabase migration steps

## 1) Prerequisites

- Install Supabase CLI:
  - `npm i -g supabase`
- Authenticate:
  - `supabase login`

## 2) Link this project (once)

- `supabase link --project-ref <YOUR_SUPABASE_PROJECT_REF>`

## 3) Apply migrations remotely

- `supabase db push`

This will apply:
- `supabase/migrations/20260501173000_knowledge_match_phase1.sql`
- `supabase/migrations/20260615120000_donations.sql`

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

## 6) Donations table (20260615120000_donations.sql)

Tracks crypto donations created via NOWPayments and is read by the project
pages to show real `raised` / `supporters` numbers.

- `public.donations` — one row per donation attempt, keyed by `order_id`.
  RLS is enabled with **no policies**, so only the service role (server-side
  routes) can read/write rows.
- `public.project_donation_totals` — a view aggregating confirmed/finished
  donations per `project_slug` (`raised_usd`, `supporters`). Granted
  `select` to `anon`/`authenticated` so project pages can read it with the
  public anon key.

Verify after pushing:

```sql
select * from public.project_donation_totals;
```

### Required env vars

In `.env.local` (and the Vercel project settings):

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — used by
  project pages to read `project_donation_totals`.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, used by
  `/api/nowpayments/create-invoice` (to record a pending donation) and
  `/api/nowpayments/ipn` (to update its status). Bypasses RLS, so it must
  never be exposed to the browser.
- `NOWPAYMENTS_IPN_SECRET` — from the NOWPayments dashboard
  (Settings -> IPN), used to verify the `x-nowpayments-sig` header on
  incoming webhooks.

If any of these are unset, the app still works: invoice creation skips the
DB write and project pages fall back to `raised: 0, supporters: 0` from the
database (the static seed values in `src/lib/projects.ts` still show).
