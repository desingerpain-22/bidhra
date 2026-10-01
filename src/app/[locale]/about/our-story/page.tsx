import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { storyPage as c } from "@/lib/about-content";
import {
  ABOUT_CONTAINER,
  AboutHero,
  FramedPhoto,
  SectionLabel,
} from "@/components/about/about-hero";
import { WithTatreezMap } from "@/components/about/tatreez-map";

export const metadata: Metadata = {
  title: "Our Story — Bidhra",
  description:
    "Bidhra started with people, not a business plan: the founder's account of why Bidhra exists.",
};

export default async function OurStoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <AboutHero
        eyebrow={c.eyebrow}
        titleLines={c.titleLines}
        intro={c.intro}
        image={c.image}
      />

      <WithTatreezMap>
        <div className={`${ABOUT_CONTAINER} py-14 sm:py-20`}>
          <div className="mb-14 md:ms-[13rem] md:ps-12">
            <SectionLabel align="start">The story</SectionLabel>
          </div>
          {/* The account, in order, along a thin rule with a dot per step. */}
          <ol className="relative flex flex-col gap-16 border-s border-foreground/15 ps-7 sm:gap-20 sm:ps-12 md:ms-[13rem]">
            {c.chapters.map((chapter) => (
              <li key={chapter.marker} id={chapter.id} className="scroll-mt-32 relative">
                <span
                  aria-hidden
                  className="absolute -start-[calc(1.75rem+4.5px)] top-1.5 h-2 w-2 rounded-full bg-accent sm:-start-[calc(3rem+4.5px)]"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground md:absolute md:-start-[calc(13rem+3rem)] md:top-0.5 md:w-[11rem] md:text-end">
                  {chapter.marker}
                </p>
                <h2 className="mt-3 max-w-2xl text-pretty text-[1.75rem] text-foreground sm:text-[2rem] md:mt-0">
                  {chapter.heading}
                </h2>
                <div className="mt-6 flex max-w-2xl flex-col gap-5">
                  {chapter.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="text-pretty text-[1.0625rem] leading-[1.75] text-foreground/80"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                {chapter.image && (
                  <figure className="mt-12 max-w-3xl">
                    <FramedPhoto
                      image={chapter.image}
                      aspect="aspect-[16/9]"
                      tilt="-rotate-[0.75deg]"
                      sizes="(min-width: 1024px) 48rem, 100vw"
                    />
                    <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {chapter.image.caption}
                    </figcaption>
                  </figure>
                )}
              </li>
            ))}
          </ol>

          {/* The founder's closing words, as a centred pull quote. */}
          <figure
            id="founder"
            className="scroll-mt-32 mt-24 flex flex-col items-center border-t border-foreground/10 pt-20 text-center sm:mt-28 sm:pt-24"
          >
            <FramedPhoto
              image={c.quote.image}
              aspect="aspect-[4/5]"
              tilt="-rotate-[3deg]"
              sizes="11rem"
              className="w-36 sm:w-44"
            />
            <blockquote className="mt-12 max-w-3xl text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-[2rem] sm:leading-[1.25]">
              “{c.quote.body}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 text-sm text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-foreground/30" />
              <span>
                <span className="font-semibold text-foreground">{c.quote.name}</span>
                {" · "}
                {c.quote.role}
              </span>
              <span aria-hidden className="h-px w-8 bg-foreground/30" />
            </figcaption>
            <a
              href={c.presentation.href}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 border-b border-foreground/35 pb-1 text-base font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              {c.presentation.label}
              <span aria-hidden className="rtl:-scale-x-100">→</span>
            </a>
          </figure>
        </div>
      </WithTatreezMap>
    </main>
  );
}

