import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { allocateFunding, getProjects } from "@/lib/projects";
import { ProjectCard, toCardData } from "@/components/project-card";
import { getChuffedCampaignStats } from "@/lib/chuffed";
import { HeroNote } from "@/components/home-hero";

type StatusFilter = "all" | "inProgress" | "funded";

// URL value for each filter; "all" is the bare /projects URL.
const FILTER_QUERY: Record<StatusFilter, string | null> = {
  all: null,
  inProgress: "in-progress",
  funded: "funded",
};

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  const activeFilter: StatusFilter =
    status === FILTER_QUERY.funded
      ? "funded"
      : status === FILTER_QUERY.inProgress
        ? "inProgress"
        : "all";
  setRequestLocale(locale);
  const t = await getTranslations("Projects");
  const tHero = await getTranslations("Hero");
  const numberFormatter = new Intl.NumberFormat(locale);
  const [projects, chuffedStats] = await Promise.all([
    getProjects(),
    getChuffedCampaignStats(),
  ]);

  const funding = allocateFunding(projects, chuffedStats);
  const cards = projects.map((project) => toCardData(project, funding.get(project.slug)));
  const counts: Record<StatusFilter, number> = {
    all: cards.length,
    inProgress: cards.filter((c) => c.status === "inProgress").length,
    funded: cards.filter((c) => c.status === "funded").length,
  };
  const visible =
    activeFilter === "all"
      ? cards
      : cards.filter((c) => c.status === activeFilter);
  const filters = Object.keys(FILTER_QUERY) as StatusFilter[];

  return (
    <main className="projects-page relative isolate flex flex-1 flex-col overflow-hidden">
      <ProjectsDecor />

      {/* Copy on the left over cream; the photo sits on the right, washed
          out and fading into the page towards the copy and the cards. */}
      <section className="projects-hero relative isolate">
        <div
          aria-hidden
          className="projects-hero-photo absolute inset-y-0 end-0 -z-20 w-full md:w-[72%]"
        >
          <Image
            src="/projects/gaza-ruins.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 72vw, 100vw"
            className="object-cover object-[55%_68%]"
          />
        </div>
        <div aria-hidden className="projects-hero-veil absolute inset-0 -z-10" />
        {/* Above the photo and its haze, so the handwriting reads clearly. */}
        <HeroNote text={tHero("noteLeft")} className="projects-note" underline />

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:pt-20">
          <h1 className="text-foreground lg:text-[clamp(3rem,5vw,4.25rem)]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70 sm:text-xl">
            {t("subtitle")}
          </p>

          <nav
            aria-label={t("filtersLabel")}
            className="mt-9 flex flex-wrap items-center gap-y-2"
          >
            {filters.map((filter, i) => {
              const query = FILTER_QUERY[filter];
              const isActive = filter === activeFilter;
              return (
                <span key={filter} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden className="mx-2 hidden h-6 w-px bg-foreground/15 sm:block" />
                  )}
                  <Link
                    href={query ? `/projects?status=${query}` : "/projects"}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-3 text-[0.8125rem] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-6 sm:text-base " +
                      (isActive
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-transparent text-foreground/75 hover:text-foreground")
                    }
                  >
                    {t(`filters.${filter}`)} ({numberFormatter.format(counts[filter])})
                  </Link>
                </span>
              );
            })}
          </nav>
        </div>
      </section>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-8 sm:pb-20">
        {/* With nothing In Progress there is no business to fund on this
            page, so point donors to the next one instead of a dead end. */}
        {counts.inProgress === 0 && counts.all > 0 && (
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-base font-semibold text-foreground">{t("nextBusiness.title")}</p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {t("nextBusiness.body")}
              </p>
            </div>
            <Link
              href="/how-to-donate"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/15 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:self-auto"
            >
              {t("nextBusiness.cta")}
              <span aria-hidden className="inline-block rtl:-scale-x-100">
                →
              </span>
            </Link>
          </div>
        )}
        {visible.length === 0 ? (
          <p className="py-16 text-base text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((card) => (
              <ProjectCard key={card.project.slug} card={card} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Light touches from the home hero: one faint arc across the top, a few
// small diamonds and olive branches at the outer edges. Hidden or reduced
// on small screens.
function ProjectsDecor() {
  const branch = "/hero/olive-branch.webp";
  const diamond = "absolute hidden rotate-45 border md:block";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <span className="projects-arc absolute hidden md:block" />
      <span className={`${diamond} left-[41%] top-[6.5rem] h-2 w-2 border-accent/40`} />
      <span className={`${diamond} left-[3%] top-[15rem] h-2 w-2 border-accent/35`} />
      <span className={`${diamond} left-[6%] top-[31rem] h-2 w-2 border-foreground/20`} />
      <span className={`${diamond} right-[5%] top-[35rem] h-2 w-2 border-accent/30`} />
      <span className="absolute left-[5.5%] top-[23rem] hidden h-1.5 w-1.5 rounded-full bg-accent/40 md:block" />

      <Image
        src={branch}
        alt=""
        width={900}
        height={1125}
        sizes="12rem"
        className="absolute -left-16 top-4 h-auto w-28 -rotate-[28deg] opacity-80 sm:w-40 lg:w-48"
      />
      <Image
        src={branch}
        alt=""
        width={900}
        height={1125}
        sizes="11rem"
        className="absolute -left-20 top-[30rem] hidden h-auto w-44 rotate-[18deg] opacity-45 blur-[1px] lg:block"
      />
      <Image
        src={branch}
        alt=""
        width={900}
        height={1125}
        sizes="11rem"
        className="absolute -right-16 top-[34rem] hidden h-auto w-44 -scale-x-100 -rotate-[12deg] opacity-50 blur-[1px] lg:block"
      />

    </div>
  );
}
