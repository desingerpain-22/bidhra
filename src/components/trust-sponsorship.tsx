import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { LeafIcon } from "@/components/home-hero";

// Trust & Sponsorship, directly below the hero: a calm two-column editorial
// block (copy | partner logos) with a light touch of the hero's atmosphere,
// namely olive branches at the outer top corners and a faint skyline along the
// bottom. Decorative layers are aria-hidden.
export async function TrustSponsorship() {
  const t = await getTranslations("TrustSponsorship");

  return (
    <section
      aria-labelledby="trust-sponsorship-heading"
      className="trust-section relative isolate overflow-hidden"
    >
      <div aria-hidden className="trust-skyline pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <Image
          src="/trust/skyline.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom mix-blend-multiply"
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10">
        <Image
          src="/hero/olive-branch.webp"
          alt=""
          width={900}
          height={1125}
          sizes="(min-width: 768px) 14rem, 7rem"
          className="absolute -left-10 -top-12 h-auto w-28 -rotate-12 opacity-60 md:-left-12 md:w-[clamp(9rem,13vw,14rem)] md:opacity-70"
        />
        <Image
          src="/hero/olive-branch.webp"
          alt=""
          width={900}
          height={1125}
          sizes="(min-width: 768px) 13rem, 7rem"
          className="absolute -right-10 -top-10 h-auto w-24 -scale-x-100 rotate-12 opacity-60 md:-right-12 md:w-[clamp(8.5rem,12vw,13rem)] md:opacity-70"
        />
        <span className="absolute left-[9%] top-24 hidden h-2 w-2 rotate-45 border border-accent/35 md:block" />
        <span className="absolute right-[10%] top-32 hidden h-1.5 w-1.5 rotate-45 border border-foreground/25 md:block" />
      </div>

      <Reveal direction="up">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-32 pt-16 sm:px-8 sm:pb-52 sm:pt-24 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,0.75fr)] lg:pb-60 lg:pt-28">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/75 sm:text-xs">
              <LeafIcon />
              {t("eyebrow")}
            </span>
            <h2
              id="trust-sponsorship-heading"
              className="headline-display text-balance text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.04] tracking-tight text-foreground lg:text-[clamp(2.5rem,3.9vw,3.5rem)]"
            >
              <span className="block lg:whitespace-nowrap">{t("titleLead")}</span>
              <span className="block">{t("titleEmphasis")}</span>
            </h2>
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
            <Link
              href="/about/transparency"
              className="group mt-1 inline-flex items-center gap-3 text-base font-medium text-foreground transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-lg"
            >
              <span className="border-b border-foreground/35 pb-1 transition group-hover:border-accent">
                {t("link")}
              </span>
              <span aria-hidden className="inline-block transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                →
              </span>
            </Link>
          </div>

          <TrustDivider />

          <div className="flex flex-col items-center gap-6">
            <div
              role="img"
              aria-label={t("partnership")}
              className="flex items-center justify-center gap-x-4 sm:gap-x-7 lg:gap-x-5 xl:gap-x-7"
            >
              <Image
                src="/trust/t4p-logo.png"
                alt=""
                width={988}
                height={300}
                sizes="12rem"
                className="h-9 w-auto sm:h-14 lg:h-[clamp(2.5rem,3.6vw,3.5rem)]"
              />
              <span aria-hidden className="text-2xl font-light text-muted-foreground">
                ×
              </span>
              <Image
                src="/bidhra-logo-2026.png"
                alt=""
                width={1726}
                height={516}
                sizes="12rem"
                className="h-8 w-auto sm:h-12 lg:h-[clamp(2.2rem,3.2vw,3.1rem)]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// Hairline that fades out at both ends, with a tiny outlined diamond at its
// center: vertical between the columns on desktop, a short horizontal rule
// between the stacked blocks on smaller screens.
function TrustDivider() {
  return (
    <div aria-hidden className="relative flex items-center justify-center self-stretch">
      <span className="h-px w-40 bg-gradient-to-r from-transparent via-border to-transparent lg:h-full lg:min-h-64 lg:w-px lg:bg-gradient-to-b" />
      <span className="absolute h-2.5 w-2.5 rotate-45 border border-accent/40 bg-background" />
    </div>
  );
}
