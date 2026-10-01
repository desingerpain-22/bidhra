import type { Locale } from "@/i18n/routing";
import type { ChuffedStats } from "@/lib/chuffed";

export type LocalizedString = Record<Locale, string>;

export type SupportType = "funding" | "knowledge" | "both";

export type ProjectMediaKind = "image" | "video" | "embed";

// A photo or video on the project page. For "embed", url is a YouTube or
// Vimeo page link.
export type ProjectMedia = {
  id: string;
  kind: ProjectMediaKind;
  url: string;
  poster?: string;
  caption: LocalizedString;
};

export type Project = {
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  story: LocalizedString;
  owner: string;
  location: LocalizedString;
  category: LocalizedString;
  supportType: SupportType;
  goal: number;
  raised: number;
  supporters: number;
  // Funded from the shared Chuffed campaign (see allocateFunding) rather
  // than its own stored raised/supporters figures.
  useLiveChuffed: boolean;
  daysLeft: number;
  skillsNeeded: LocalizedString[];
  verified: boolean;
  cover?: string;
  supportCta?: LocalizedString;
  // Filled in by getProject (the project page); empty in the list.
  media: ProjectMedia[];
};

// Projects live in the Supabase `projects` table (see
// supabase/migrations/). They are read through Supabase's REST API with the
// public key, which only returns rows marked published, and cached for five
// minutes, so rows added or edited in the dashboard appear on the site
// without a redeploy.
const REVALIDATE_SECONDS = 300;

type ProjectRow = {
  slug: string;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  story_en: string;
  story_ar: string;
  owner: string;
  location_en: string;
  location_ar: string;
  category_en: string;
  category_ar: string;
  support_type: SupportType;
  goal: number | string;
  raised: number | string;
  supporters: number;
  use_live_chuffed: boolean;
  days_left: number;
  skills_needed: Array<Partial<LocalizedString>> | null;
  verified: boolean;
  cover_url: string | null;
  support_cta_en: string | null;
  support_cta_ar: string | null;
  project_media?: MediaRow[];
};

type MediaRow = {
  id: string;
  kind: ProjectMediaKind;
  url: string;
  poster_url: string | null;
  caption_en: string;
  caption_ar: string;
};

function toProject(row: ProjectRow): Project {
  const localized = (en: string, ar: string): LocalizedString => ({
    en,
    ar: ar || en,
  });
  return {
    slug: row.slug,
    title: localized(row.title_en, row.title_ar),
    summary: localized(row.summary_en, row.summary_ar),
    story: localized(row.story_en, row.story_ar),
    owner: row.owner,
    location: localized(row.location_en, row.location_ar),
    category: localized(row.category_en, row.category_ar),
    supportType: row.support_type,
    // Postgres numeric columns arrive as strings.
    goal: Number(row.goal),
    raised: Number(row.raised),
    supporters: row.supporters,
    useLiveChuffed: row.use_live_chuffed,
    daysLeft: row.days_left,
    skillsNeeded: (row.skills_needed ?? []).map((skill) =>
      localized(skill.en ?? "", skill.ar ?? ""),
    ),
    verified: row.verified,
    cover: row.cover_url ?? undefined,
    supportCta: row.support_cta_en
      ? localized(row.support_cta_en, row.support_cta_ar ?? "")
      : undefined,
    media: (row.project_media ?? []).map((item) => ({
      id: item.id,
      kind: item.kind,
      url: item.url,
      poster: item.poster_url ?? undefined,
      caption: localized(item.caption_en, item.caption_ar),
    })),
  };
}

// `select` may embed related rows, e.g. the project's media.
async function fetchProjects(
  filter = "",
  select = "*",
): Promise<Project[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("Projects: Supabase URL or anon key is not set.");
    return [];
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/projects?select=${select}&published=eq.true${filter}&order=sort_order.asc,created_at.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: REVALIDATE_SECONDS, tags: ["projects"] },
      },
    );
    if (!res.ok) {
      console.error(`Projects: Supabase returned ${res.status}.`);
      return [];
    }
    const rows = (await res.json()) as ProjectRow[];
    return rows.map(toProject);
  } catch (error) {
    console.error("Projects: request to Supabase failed.", error);
    return [];
  }
}

export function getProjects(): Promise<Project[]> {
  return fetchProjects();
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const [project] = await fetchProjects(
    `&slug=eq.${encodeURIComponent(slug)}&project_media.order=sort_order.asc,created_at.asc`,
    "*,project_media(*)",
  );
  return project;
}

export type FundingFigures = { raised: number; supporters: number };

// One Chuffed campaign funds every project marked use_live_chuffed, one
// business at a time: the campaign total fills those projects in sort order,
// each up to its goal, and what is left over flows to the next. E.g. a
// $5,670 total shows $4,500 on a fully funded $4,500 project and $1,170 on
// the next. Other projects show their stored figures. Supporters can't be
// split by project, so campaign-funded projects show the campaign's count.
// `projects` must be the full published list in sort order (getProjects).
export function allocateFunding(
  projects: Project[],
  chuffedStats: ChuffedStats | null,
): Map<string, FundingFigures> {
  const funding = new Map<string, FundingFigures>();
  let pool = chuffedStats?.raised ?? 0;
  for (const project of projects) {
    if (project.useLiveChuffed && chuffedStats) {
      const raised = Math.max(0, Math.min(project.goal, pool));
      pool -= raised;
      funding.set(project.slug, { raised, supporters: chuffedStats.supporters });
    } else {
      funding.set(project.slug, { raised: project.raised, supporters: project.supporters });
    }
  }
  return funding;
}
