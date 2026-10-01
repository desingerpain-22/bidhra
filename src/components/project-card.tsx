import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { FundingFigures, Project } from "@/lib/projects";

export type ProjectStatus = "inProgress" | "funded";

export type ProjectCardData = {
  project: Project;
  isKnowledgeOnly: boolean;
  raised: number;
  pct: number;
  status: ProjectStatus;
};

// Funding figures and status for a project card. A project is Funded once
// what it has raised reaches its goal, and In Progress until then.
export function toCardData(project: Project, funding: FundingFigures | undefined): ProjectCardData {
  const isKnowledgeOnly = project.supportType === "knowledge";
  const raised = funding?.raised ?? project.raised;
  const pct = isKnowledgeOnly ? 0 : Math.min(100, Math.round((raised / project.goal) * 100));
  const status: ProjectStatus = !isKnowledgeOnly && raised >= project.goal ? "funded" : "inProgress";
  return { project, isKnowledgeOnly, raised, pct, status };
}

// Project card shared by the Projects page and the home page: cover photo
// with a status pill, category, title, location, summary and funding bar.
export async function ProjectCard({
  card,
  locale,
}: {
  card: ProjectCardData;
  locale: string;
}) {
  const t = await getTranslations("Projects");
  const loc = locale as Locale;
  const numberFormatter = new Intl.NumberFormat(locale);
  const { project, isKnowledgeOnly, raised, pct, status } = card;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-2xl border border-foreground/[0.08] bg-surface p-2.5 shadow-[0_18px_44px_-30px] shadow-foreground/30 transition hover:-translate-y-0.5 hover:border-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/8.5] overflow-hidden rounded-xl bg-muted">
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.title[loc]}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        )}
        <span className="absolute end-3 top-3 inline-flex items-center rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-accent-foreground shadow-sm sm:text-[0.8125rem]">
          {t(`status.${status}`)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-5 sm:px-5">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <TagIcon />
          {project.category[loc]}
        </p>
        <h3 className="mt-2.5 text-xl text-foreground sm:text-2xl">
          {/* The span carries the weight: the global heading rules would
              override a weight class on the heading itself. */}
          <span className="font-bold">{project.title[loc]}</span>
        </h3>
        <p className="mt-2.5 flex items-center gap-1.5 text-[0.9375rem] text-foreground/70">
          <PinIcon />
          {project.location[loc]}
        </p>
        <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {project.summary[loc]}
        </p>

        {isKnowledgeOnly ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.skillsNeeded.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
              >
                {skill[loc]}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-auto pt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-3.5 flex items-baseline justify-between gap-3 tabular-nums">
              <span className="text-[0.9375rem] text-foreground/75">
                <span className="font-bold text-foreground">${numberFormatter.format(raised)}</span>{" "}
                {status === "funded"
                  ? t("raised")
                  : t("raisedOf", { goal: `$${numberFormatter.format(project.goal)}` })}
              </span>
              <span className="text-[0.9375rem] font-bold text-accent">
                {numberFormatter.format(pct)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function TagIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16" />
      <path d="M6 20v-8.5L12 6l6 5.5V20" />
      <path d="M10 20v-4.5h4V20" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}
