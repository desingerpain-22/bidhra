import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { getChuffedCampaignStats } from "@/lib/chuffed";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Projects");
  const loc = locale as Locale;
  const numberFormatter = new Intl.NumberFormat(locale);
  const chuffedStats = await getChuffedCampaignStats();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {projects.map((project) => {
          const isKnowledgeOnly = project.supportType === "knowledge";
          const raised = chuffedStats?.raised ?? project.raised;
          const supporters = chuffedStats?.supporters ?? project.supporters;
          const pct = isKnowledgeOnly
            ? 0
            : Math.min(100, Math.round((raised / project.goal) * 100));
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:border-accent hover:shadow-lg"
            >
              {project.cover && (
                <div
                  className="relative w-full overflow-hidden bg-muted"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={project.cover}
                    alt={project.title[loc]}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <span>{project.category[loc]}</span>
                <span>{project.location[loc]}</span>
              </div>
              <div>
                <span
                  className={
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium " +
                    (project.supportType === "knowledge"
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                      : project.supportType === "both"
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                        : "bg-muted text-foreground")
                  }
                >
                  {t(`supportBadge.${project.supportType}`)}
                </span>
              </div>
              <h2 className="text-xl font-semibold leading-snug text-foreground">
                {project.title[loc]}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.summary[loc]}
              </p>
              {isKnowledgeOnly ? (
                <div className="mt-auto flex flex-wrap gap-2">
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
                <div className="mt-auto flex flex-col gap-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
                    <span className="font-medium text-foreground">
                      ${numberFormatter.format(raised)}{" "}
                      <span className="text-muted-foreground">
                        {t("of")} ${numberFormatter.format(project.goal)}
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      {numberFormatter.format(supporters)}{" "}
                      {t("supporters")}
                    </span>
                  </div>
                </div>
              )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
