import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { transparencyPage as c } from "@/lib/about-content";
import {
  ABOUT_CONTAINER,
  AboutHero,
  AboutIcon,
  SectionLabel,
} from "@/components/about/about-hero";
import { WithTatreezMap } from "@/components/about/tatreez-map";

export const metadata: Metadata = {
  title: "Trust & Transparency — Bidhra",
  description:
    "How Bidhra works with its fiscal sponsor Tech for Palestine, how funds are used, how projects are verified, and how they are documented.",
};

export default async function TransparencyPage({
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
        aside={<SponsorLockup />}
      />

      <WithTatreezMap>
        <div className={`${ABOUT_CONTAINER} py-14 sm:py-20`}>
          <SectionLabel>How trust is built</SectionLabel>
          <ul className="mt-12 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {c.areas.map((area) => (
              <li key={area.title} id={area.id} className="scroll-mt-32 border-t border-foreground/15 pt-8">
                <AboutIcon name={area.icon} />
                <h2 className="mt-5 text-2xl text-foreground">
                  <span className="font-semibold">{area.title}</span>
                </h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {area.points.map((point) => (
                    <li
                      key={point.slice(0, 32)}
                      className="relative ps-5 text-pretty text-[0.9875rem] leading-relaxed text-foreground/75 before:absolute before:start-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </WithTatreezMap>
    </main>
  );
}

// Tech for Palestine × Bidhra, as on the homepage's sponsorship section.
function SponsorLockup() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-foreground/10 bg-surface/70 px-8 py-10 sm:px-12">
      <div className="flex items-center gap-5 sm:gap-7">
        <Image
          src="/trust/t4p-logo.png"
          alt="Tech for Palestine"
          width={988}
          height={300}
          sizes="12rem"
          className="h-10 w-auto sm:h-12"
        />
        <span aria-hidden className="text-2xl font-light text-muted-foreground">
          ×
        </span>
        <Image
          src="/bidhra-logo-2026.png"
          alt="Bidhra"
          width={1726}
          height={516}
          sizes="10rem"
          className="h-9 w-auto sm:h-11"
        />
      </div>
    </div>
  );
}
