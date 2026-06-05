import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProject, projects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectFunding } from "@/components/project-funding";
import { knowledgeRequests } from "@/lib/knowledge-requests";
import { ProjectKnowledgeSection } from "@/components/project-knowledge-section";
import { FootageMedia } from "@/components/footage-media";
import { PortraitSlideshow } from "@/components/portrait-slideshow";
import { Reveal } from "@/components/reveal";
import { moamenContent } from "@/lib/moamen-content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const EDITORIAL_SLUGS = new Set(["moamen-woodworking-deir-al-balah"]);

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations("Project");
  const loc = locale as Locale;
  const knowledgeRequest = knowledgeRequests.find((item) => item.projectSlug === slug);
  const isEditorial = EDITORIAL_SLUGS.has(slug);

  if (!isEditorial) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("back")}
        </Link>

        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span>{project.category[loc]}</span>
            <span aria-hidden>·</span>
            <span>{project.location[loc]}</span>
            {project.verified && (
              <>
                <span aria-hidden>·</span>
                <span className="text-accent">{t("verified")}</span>
              </>
            )}
          </div>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {project.title[loc]}
          </h1>
          <div>
            <span
              className={
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium " +
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
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary[loc]}
          </p>
        </header>

        {project.supportType !== "knowledge" && (
          <ProjectFunding
            projectSlug={project.slug}
            projectTitle={project.title[loc]}
            goal={project.goal}
            initialRaised={project.raised}
            initialSupporters={project.supporters}
            daysLeft={project.daysLeft}
            locale={locale}
            hasKnowledgeRequest={Boolean(knowledgeRequest)}
          />
        )}

        {knowledgeRequest && (
          <div id="project-knowledge" className="scroll-mt-24">
            <ProjectKnowledgeSection
              locale={loc}
              projectSlug={project.slug}
              projectTitle={project.title[loc]}
              request={knowledgeRequest}
            />
          </div>
        )}

        <article className="prose prose-neutral max-w-none whitespace-pre-line text-base leading-relaxed text-foreground">
          {project.story[loc]}
        </article>

        <section className="grid gap-4 rounded-xl border border-border bg-muted/40 p-5 sm:grid-cols-3 sm:p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("owner")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {project.owner}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("location")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {project.location[loc]}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("category")}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {project.category[loc]}
            </p>
          </div>
        </section>
      </main>
    );
  }

  const c = moamenContent;

  return (
    <div className="editorial flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-12 sm:pt-10">
        <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]">
          <Link
            href="/projects"
            className="inline-flex items-center text-foreground/80 hover:text-foreground"
          >
            {t("back")}
          </Link>
          <span className="text-end">{c.navMeta[loc]}</span>
        </div>
      </div>

      <section
        aria-label={project.title[loc]}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 pb-16 pt-12 sm:gap-12 sm:px-12 sm:pb-24 sm:pt-28 md:grid-cols-[2fr_1fr] md:items-end md:gap-16"
      >
        <Reveal direction="up">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {c.hero.eyebrow[loc]}
            </span>
            <h1 className="mt-6 text-[clamp(2rem,8vw,5.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-foreground">
              {c.hero.title[loc].plain}
              <br />
              <em className="em-accent">{c.hero.title[loc].accent}</em>
            </h1>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <div className="border-s ps-6 font-mono text-[11px] uppercase leading-[1.8] tracking-[0.15em] text-muted-foreground rtl:border-e rtl:border-s-0 rtl:ps-0 rtl:pe-6" style={{ borderColor: "var(--line-strong)" }}>
            <strong className="block font-medium text-foreground">
              {c.hero.metaLabel[loc]}
            </strong>
            {c.hero.metaValue[loc]}
            <br />
            <br />
            <span className="text-accent">{c.hero.metaTag[loc]}</span>
            <br />
            {c.hero.metaTagValue[loc]}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-12 sm:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[5fr_4fr] md:items-stretch md:gap-12">
          <Reveal direction="up">
            <PortraitSlideshow
              aspect="4/5"
              sizes="(min-width: 768px) 50vw, 100vw"
              slides={[
                { src: "/footage/portrait-2.jpg", alt: "Moamen, workshop moment" },
                { src: "/footage/portrait-3.jpg", alt: "Moamen, workshop moment" },
                { src: "/footage/portrait-4.jpg", alt: "Moamen, workshop moment" },
                { src: "/footage/portrait.jpg", alt: "Moamen, portrait close-up" },
              ]}
            />
          </Reveal>
          <Reveal direction="up" delay={120}>
            <div
              className="flex h-full flex-col justify-between border p-6 sm:p-10"
              style={{ background: "var(--bg-elev)", borderColor: "var(--line)" }}
            >
              <div>
                <p className="whitespace-pre-line text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl">
                  {c.profile.name[loc]}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  {c.profile.role[loc]}
                </p>
                <dl className="mt-8 flex flex-col sm:mt-10">
                  {c.profile.rows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-baseline gap-3 border-t py-4 last:border-b"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {row.label[loc]}
                      </dt>
                      <dd className="break-words text-sm font-normal text-foreground sm:text-lg">
                        {row.value[loc]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 8px var(--accent)" }}
                />
                {c.profile.verified[loc]}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-16 sm:gap-12 sm:px-12 sm:py-32 md:grid-cols-[1fr_2fr] md:gap-24">
        <Reveal direction="up">
          <span
            className="inline-block self-start border-t pt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent"
            style={{ borderColor: "var(--accent)" }}
          >
            {c.deck.label[loc]}
          </span>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-light leading-[1.3] tracking-[-0.015em] text-foreground">
            {c.deck.text[loc].plain}{" "}
            <em className="em-accent">{c.deck.text[loc].accent}</em>
          </p>
        </Reveal>
      </section>

      {c.chapters.map((ch, i) => {
        const mirrored = i === 1;
        return (
          <section
            key={ch.numeral}
            className="mx-auto w-full max-w-[1400px] border-t px-4 py-16 sm:px-12 sm:py-32"
            style={{ borderColor: "var(--line)" }}
          >
            <Reveal direction="up">
              <header className="mb-10 grid grid-cols-1 items-end gap-4 sm:mb-20 sm:grid-cols-[auto_1fr] sm:gap-12">
                <div className="text-[4rem] font-light italic leading-[0.9] tracking-[-0.04em] text-accent sm:text-[6rem]">
                  {ch.numeral}
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {ch.label[loc].plain}
                  </p>
                  <h2 className="mt-3 text-[clamp(1.75rem,6vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.025em] text-foreground">
                    {ch.title[loc].plain}
                    <br />
                    <em className="em-accent">{ch.title[loc].accent}</em>
                  </h2>
                </div>
              </header>
            </Reveal>

            <div
              className={
                "grid grid-cols-1 items-start gap-8 sm:gap-12 " +
                (mirrored
                  ? "md:grid-cols-[5fr_7fr]"
                  : "md:grid-cols-[7fr_5fr]")
              }
            >
              <Reveal direction="up">
                <FootageMedia
                  slot={mirrored ? "chapter2" : i === 0 ? "chapter1" : "chapter3"}
                  kind="video"
                  rounded={false}
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </Reveal>
              <Reveal direction="up" delay={120}>
                <div className="pt-2">
                  {ch.paragraphs[loc].map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        "text-base font-light leading-[1.7] text-foreground mb-5 sm:text-lg " +
                        (idx === 0 && !mirrored ? "dropcap" : "")
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            {i === 0 && (
              <Reveal direction="up">
                <div className="mx-auto mt-20 max-w-3xl px-2 text-center sm:mt-40">
                  <span
                    aria-hidden
                    className="block text-[4.5rem] italic leading-none text-accent opacity-25 sm:text-[8rem]"
                  >
                    “
                  </span>
                  <blockquote className="-mt-8 text-[clamp(1.25rem,5vw,2.75rem)] font-light italic leading-[1.3] tracking-[-0.02em] text-foreground sm:-mt-12">
                    {c.pullQuote.body[loc].plain}
                    <em className="em-accent">{c.pullQuote.body[loc].accent}</em>
                  </blockquote>
                  <cite className="mt-10 block font-mono text-[11px] uppercase not-italic tracking-[0.25em] text-muted-foreground">
                    {c.pullQuote.cite[loc]}
                  </cite>
                </div>
              </Reveal>
            )}

          </section>
        );
      })}

      <section
        className="border-t px-4 py-16 sm:px-12 sm:py-32"
        style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
        lang="en"
        dir="ltr"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {c.pdfStudy.map((page, pageIndex) => (
            <Reveal key={pageIndex} direction="up" delay={(pageIndex % 2) * 80}>
              <div
                className="h-full border p-5 sm:p-8"
                style={{ borderColor: "var(--line)", background: "var(--bg)" }}
              >
                {page.map((line, lineIndex) => (
                  <p
                    key={`${pageIndex}-${lineIndex}`}
                    className="mb-2 last:mb-0 text-base font-light leading-[1.55] text-foreground sm:text-lg"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="donate"
        className="mx-auto w-full max-w-5xl border-t px-4 py-16 text-center sm:px-12 sm:py-32"
        style={{ borderColor: "var(--line)" }}
      >
        <Reveal direction="up">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {c.ask.eyebrow[loc]}
          </p>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <p className="mt-6 text-[clamp(4rem,18vw,12rem)] font-light leading-[0.9] tracking-[-0.05em] text-foreground sm:mt-8">
            <span className="me-1 align-top text-[0.5em] font-normal italic text-accent">
              $
            </span>
            {c.ask.amount}
          </p>
        </Reveal>
        <Reveal direction="up" delay={240}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-[1.6] text-muted-foreground sm:mt-8 sm:text-xl">
            {c.ask.body[loc]}
          </p>
        </Reveal>

        <Reveal direction="up" delay={320}>
          <div
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 border-t sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
            style={{ borderColor: "var(--line)" }}
          >
            {c.ask.items.map((item, i) => (
              <div
                key={i}
                className="px-4 py-8 text-start border-b sm:border-b-0 sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 sm:border-e sm:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:last:border-e-0"
                style={{ borderColor: "var(--line)" }}
              >
                <p className="text-2xl font-normal italic text-accent">
                  {String.fromCharCode(8544 + i)}.
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label[loc]}
                </p>
                <p className="mt-2 text-base font-light leading-[1.5] text-foreground">
                  {item.body[loc]}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {project.supportType !== "knowledge" && (
          <Reveal direction="up" delay={400}>
            <div className="mt-16 text-start">
              <ProjectFunding
                projectSlug={project.slug}
                projectTitle={project.title[loc]}
                goal={project.goal}
                initialRaised={project.raised}
                initialSupporters={project.supporters}
                daysLeft={project.daysLeft}
                locale={locale}
                hasKnowledgeRequest={Boolean(knowledgeRequest)}
              />
            </div>
          </Reveal>
        )}

        {knowledgeRequest && (
          <div id="project-knowledge" className="mt-12 scroll-mt-24 text-start">
            <ProjectKnowledgeSection
              locale={loc}
              projectSlug={project.slug}
              projectTitle={project.title[loc]}
              request={knowledgeRequest}
            />
          </div>
        )}
      </section>

      <section
        className="border-t px-4 py-20 text-center sm:px-12 sm:py-32"
        style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
      >
        <Reveal direction="up">
          <h2 className="mx-auto max-w-3xl text-[clamp(2rem,7vw,4.5rem)] font-light leading-[1.1] tracking-[-0.03em] text-foreground">
            {c.closing.headline[loc].plain}
            <br />
            <em className="em-accent">{c.closing.headline[loc].accent}</em>
          </h2>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {c.closing.signature[loc]}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
