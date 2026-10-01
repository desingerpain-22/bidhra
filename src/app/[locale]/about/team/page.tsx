import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { advisors, teamMembers, teamPage as c } from "@/lib/about-content";
import {
  ABOUT_CONTAINER,
  AboutHero,
  FramedPhoto,
  SectionLabel,
} from "@/components/about/about-hero";
import { WithTatreezMap } from "@/components/about/tatreez-map";

export const metadata: Metadata = {
  title: "Our Team — Bidhra",
  description: "The people behind Bidhra, and the partners it works alongside.",
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <AboutHero eyebrow={c.eyebrow} titleLines={c.titleLines} intro={c.intro} />

      <WithTatreezMap>
        <div className={`${ABOUT_CONTAINER} py-14 sm:py-20`}>
          <SectionLabel>{c.gridLabel}</SectionLabel>
          <ul className="mt-12 grid justify-center gap-x-10 gap-y-14 sm:grid-cols-[repeat(auto-fit,minmax(16rem,22rem))]">
            {teamMembers.map((person, i) => (
              <li key={person.name} className="flex flex-col">
                {person.image && (
                  <FramedPhoto
                    image={person.image}
                    aspect="aspect-[4/5]"
                    tilt={i % 2 ? "rotate-[1.25deg]" : "-rotate-[1.25deg]"}
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                  />
                )}
                <h2 className="mt-5 text-xl text-foreground">
                  <span className="font-semibold">{person.name}</span>
                </h2>
                <p className="mt-1 text-sm font-medium text-accent">{person.role}</p>
                <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {person.bio}
                </p>
                {person.link && (
                  <a
                    href={person.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 self-start border-b border-foreground/35 pb-1 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                  >
                    {person.link.label}
                    <span aria-hidden className="rtl:-scale-x-100">→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {advisors.length > 0 && (
            <section
              aria-labelledby="advisors-heading"
              className="mt-24 border-t border-foreground/10 pt-20 sm:mt-28 sm:pt-24"
            >
              <SectionLabel align="start">{c.advisors.eyebrow}</SectionLabel>
              <h2
                id="advisors-heading"
                className="headline-display mt-6 max-w-3xl text-balance text-foreground"
              >
                {c.advisors.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {c.advisors.intro}
              </p>

              <ul className="mt-12 flex flex-col gap-8">
                {advisors.map((advisor) => (
                  <li
                    key={advisor.name}
                    className="grid gap-8 rounded-2xl border border-foreground/10 bg-surface/60 p-5 shadow-[0_24px_60px_-44px] shadow-foreground/30 sm:p-8 md:grid-cols-[minmax(0,17rem)_auto_minmax(0,1fr)] md:items-center md:gap-10 lg:p-10"
                  >
                    <div className="relative aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={advisor.image.src}
                        alt={advisor.image.alt}
                        fill
                        sizes="17rem"
                        className="object-cover"
                        style={{ objectPosition: advisor.image.position }}
                      />
                    </div>

                    {/* Hairline with a small outlined diamond, as elsewhere
                        on the site. */}
                    <div aria-hidden className="relative hidden items-center justify-center self-stretch md:flex">
                      <span className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                      <span className="absolute h-2.5 w-2.5 rotate-45 border border-accent/40 bg-background" />
                    </div>

                    <div className="flex flex-col items-start">
                      <h3 className="text-[1.75rem] leading-tight text-foreground sm:text-[2rem]">
                        <span className="font-semibold">{advisor.name}</span>
                      </h3>
                      <p className="mt-3 text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-accent">
                        {advisor.role}
                      </p>
                      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                        {advisor.bio}
                      </p>
                      {advisor.linkedin && (
                        <a
                          href={advisor.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="group mt-7 inline-flex items-center gap-3 text-base font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                              <path d="M6.94 8.98H3.78v10.1h3.16V8.98ZM5.36 4.92a1.84 1.84 0 1 0 0 3.68 1.84 1.84 0 0 0 0-3.68Zm13.86 8.37c0-3.04-1.62-4.45-3.78-4.45a3.26 3.26 0 0 0-2.96 1.63h-.04V8.98H9.42v10.1h3.15v-5c0-1.32.25-2.6 1.89-2.6 1.6 0 1.62 1.5 1.62 2.68v4.92h3.14v-5.79Z" />
                            </svg>
                          </span>
                          <span className="border-b border-foreground/35 pb-0.5 transition group-hover:border-accent group-hover:text-accent">
                            {c.advisors.linkLabel}
                          </span>
                          <span aria-hidden className="transition group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100">
                            →
                          </span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </WithTatreezMap>
    </main>
  );
}
