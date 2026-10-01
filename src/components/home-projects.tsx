import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getChuffedCampaignStats } from "@/lib/chuffed";
import { allocateFunding, getProjects } from "@/lib/projects";
import { ProjectCard, toCardData } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

// Home page: the projects Bidhra supports (from Supabase), as the same cards
// as the Projects page, with a link through to all of them. Hidden if there
// are no published projects.
export async function HomeProjects({ locale }: { locale: string }) {
  const t = await getTranslations("HomeProjects");
  const [projects, chuffedStats] = await Promise.all([
    getProjects(),
    getChuffedCampaignStats(),
  ]);
  if (projects.length === 0) return null;
  const funding = allocateFunding(projects, chuffedStats);
  const cards = projects.map((project) => toCardData(project, funding.get(project.slug)));

  // Up to two cards, then the link to all projects in the next column, so
  // cards keep the same size as more projects are added.
  const shown = cards.slice(0, 2);

  return (
    <section aria-labelledby="home-projects-heading" className="mb-20 sm:mb-32">
      <Reveal direction="up">
        <header className="mx-auto flex max-w-3xl flex-col items-center pb-12 text-center sm:pb-14">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
            <span aria-hidden className="h-px w-8 bg-foreground/30" />
            {t("eyebrow")}
            <span aria-hidden className="h-px w-8 bg-foreground/30" />
          </p>
          <h2 id="home-projects-heading" className="headline-display mt-6 text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </Reveal>

      <Reveal direction="up">
        <div className="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((card) => (
            <ProjectCard key={card.project.slug} card={card} locale={locale} />
          ))}
          <div className="flex justify-center sm:justify-start sm:ps-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-b border-foreground/35 pb-1 text-lg font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              {t("viewAll")}
              <span aria-hidden className="rtl:-scale-x-100">→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

