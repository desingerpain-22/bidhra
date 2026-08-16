import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { aboutChapters, aboutValues, aboutNavItems } from "@/lib/about-content";
import { AboutRailNav } from "@/components/about-rail-nav";

export const metadata: Metadata = {
  title: "About — Bidhra",
  description:
    "Bidhra turns aid and donations into real Palestinian businesses — our mission, vision, and the story behind why Bidhra exists.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 gap-12 px-4 py-12 sm:px-6 sm:py-20 lg:gap-16 lg:px-10">
      <aside className="hidden shrink-0 lg:block lg:w-48">
        <div className="sticky top-24">
          <p className="mb-7 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About Bidhra
          </p>
          <AboutRailNav items={aboutNavItems} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-8 lg:hidden">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About Bidhra
          </p>
          <AboutRailNav items={aboutNavItems} />
        </div>

        {aboutChapters.map((chapter) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className="mb-16 flex scroll-mt-24 gap-5 sm:mb-20 sm:gap-7"
          >
            <span className="w-14 shrink-0 font-light italic leading-[0.9] tracking-[-0.03em] text-accent text-[2.5rem] sm:w-20 sm:text-[3.5rem]">
              {chapter.numeral}
            </span>
            <div className="min-w-0 flex-1 pt-1 sm:pt-2">
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {chapter.heading}
              </h2>
              {chapter.image && (
                <div
                  aria-hidden
                  className="mb-5 flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border text-xs font-mono uppercase tracking-widest text-muted-foreground"
                >
                  Image
                </div>
              )}
              {chapter.lede && (
                <p className="mb-3.5 max-w-[34ch] text-lg leading-snug text-foreground">
                  {chapter.lede}
                </p>
              )}
              {chapter.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-3.5 max-w-[56ch] text-[15.5px] leading-relaxed text-foreground/80"
                >
                  {p}
                </p>
              ))}
              {chapter.quote && (
                <div className="mt-4 border-s-2 border-accent ps-4.5">
                  <p className="text-base italic leading-relaxed text-foreground">
                    {chapter.quote.body}
                  </p>
                  <p className="mt-2.5 font-mono text-xs tracking-wide text-muted-foreground">
                    {chapter.quote.attribution}
                  </p>
                </div>
              )}
            </div>
          </section>
        ))}

        <section
          id="values"
          className="mb-16 flex scroll-mt-24 gap-5 sm:mb-20 sm:gap-7"
        >
          <span className="w-14 shrink-0 font-light italic leading-[0.9] tracking-[-0.03em] text-accent text-[2.5rem] sm:w-20 sm:text-[3.5rem]">
            05
          </span>
          <div className="min-w-0 flex-1 pt-1 sm:pt-2">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Our Values
            </h2>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {aboutValues.map((value) => (
                <div
                  key={value.word}
                  className={
                    "rounded-xl border border-border bg-muted/20 p-4.5 sm:p-5 " +
                    (value.spanFull ? "sm:col-span-2" : "")
                  }
                >
                  <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                    {value.word}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {value.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-20 text-center sm:mt-24">
          <p className="mb-8 text-lg italic text-foreground">
            From a seed, to a forest.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              See Verified Projects
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              How We Work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
