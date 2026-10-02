import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CHUFFED_URL, donatePage as c } from "@/lib/donate-content";
import { AboutAtmosphere } from "@/components/about/about-frame";
import {
  AboutIcon,
  Badge,
  FramedPhoto,
  HandNote,
} from "@/components/about/about-hero";
import { DonatePanel } from "./donate-panel";
import { PartnerForm } from "./partner-form";

export const metadata: Metadata = {
  title: "How to Donate — Bidhra",
  description:
    "Give once or monthly through Bidhra's official Chuffed campaign, or contact us about supporting Bidhra as an organization.",
};

const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-8";
const BRANCH = "/hero/olive-branch.webp";

// The partnership form (see src/app/api/partnership/route.ts); set to false
// to hide the section.
const SHOW_PARTNER_FORM = true;

export default async function HowToDonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-x-clip">
      <AboutAtmosphere />
      <Trust />
      <WaysToGive />
      {SHOW_PARTNER_FORM && <Organizations />}
    </main>
  );
}

// The donation panel, with the two ways to give as compact cards above it
// (see DonatePanel for why Chuffed's form isn't embedded).
function WaysToGive() {
  const w = c.ways;
  return (
    <section id="give" aria-labelledby="ways-heading" className="relative isolate scroll-mt-24">
      <Branch className="-right-16 top-6 w-[clamp(8rem,11vw,12rem)] -scale-x-100 rotate-12" />
      <div className={`${CONTAINER} py-14 sm:py-16`}>
        <div className="flex flex-col items-center text-center">
          <Badge>{w.eyebrow}</Badge>
          <h2 id="ways-heading" className="headline-display mt-5 text-balance text-foreground">
            {w.title}
          </h2>
        </div>

        {/* The form is the focus: a single centred column, with the two ways
            to give as compact cards above it. */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
          <ul className="grid gap-3 sm:grid-cols-2">
            {w.options.map((option) => (
              <li
                key={option.title}
                className={`flex items-start gap-3 rounded-xl border bg-surface/80 p-4 ${
                  option.recommended ? "border-accent/45" : "border-foreground/10"
                }`}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AboutIcon name={option.icon} className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-base font-bold text-foreground">{option.title}</span>
                    {option.recommended && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                        <span aria-hidden>★</span>
                        {option.recommended}
                      </span>
                    )}
                  </span>
                  <span className="text-sm leading-snug text-muted-foreground">{option.body}</span>
                </span>
              </li>
            ))}
          </ul>

          <DonatePanel />

          <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <AboutIcon name="shield" className="h-4 w-4 shrink-0" />
            {w.secure}
          </p>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const t = c.trust;
  return (
    <section aria-labelledby="trust-heading" className="relative isolate">
      <Branch className="-left-20 bottom-4 w-[clamp(9rem,12vw,13rem)] -rotate-[20deg]" />
      <HandNote className="absolute start-[4%] top-20 hidden -rotate-12 xl:block">{t.handNote}</HandNote>
      {/* Tilted Jerusalem photo, partly off the right edge. */}
      <div aria-hidden className="absolute -end-10 top-8 hidden w-[clamp(13rem,17vw,17rem)] xl:block">
        <FramedPhoto
          image={t.image}
          aspect="aspect-[4/5]"
          tilt="rotate-[8deg]"
          sizes="17rem"
        />
      </div>

      <div className={`${CONTAINER} flex flex-col items-center pb-14 pt-10 text-center sm:pb-16 sm:pt-14`}>
        <Badge>{t.eyebrow}</Badge>
        <h1 id="trust-heading" className="mt-6 text-balance text-foreground">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.bodyParts.map((part, i) =>
            typeof part === "string" ? (
              part
            ) : part.href === "chuffed" ? (
              <a key={i} href={CHUFFED_URL} target="_blank" rel="noreferrer" className={INLINE_LINK}>
                {part.text}
              </a>
            ) : (
              <Link key={i} href={part.href} className={INLINE_LINK}>
                {part.text}
              </Link>
            ),
          )}
        </p>
        <ul className="mt-10 grid w-full max-w-4xl gap-7 text-start sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-foreground/10 rtl:sm:divide-x-reverse">
          {t.points.map((point) => (
            <li key={point.title} className="flex gap-3.5 sm:px-6 sm:first:ps-0 sm:last:pe-0">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <AboutIcon name={point.icon} className="h-5 w-5" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[0.9375rem] font-semibold leading-snug text-foreground">{point.title}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{point.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <DonateButton className="mt-10">{t.cta}</DonateButton>
      </div>
    </section>
  );
}

function Organizations() {
  const o = c.organizations;
  return (
    <section id="partner" aria-labelledby="partner-heading" className="relative isolate scroll-mt-28">
      <Branch className="-left-24 top-1/2 w-[clamp(9rem,12vw,13rem)] rotate-[25deg] opacity-40 blur-[1px]" />
      <HandNote className="absolute end-[3%] top-1/2 hidden -rotate-6 xl:block">{o.handNote}</HandNote>

      <div className={`${CONTAINER} grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 xl:pe-28`}>
        <div className="flex flex-col items-start">
          <Badge>{o.eyebrow}</Badge>
          <h2 id="partner-heading" className="headline-display mt-5 text-balance text-foreground">
            {o.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            {o.body}
          </p>
        </div>
        <PartnerForm />
      </div>
    </section>
  );
}

const INLINE_LINK =
  "text-foreground underline decoration-foreground/40 underline-offset-4 transition hover:text-accent hover:decoration-accent";

// A single olive branch at a section's outer edge (desktop only).
function Branch({ className }: { className: string }) {
  return (
    <Image
      src={BRANCH}
      alt=""
      aria-hidden
      width={900}
      height={1125}
      sizes="13rem"
      className={`pointer-events-none absolute -z-10 hidden h-auto select-none opacity-70 lg:block ${className}`}
    />
  );
}

function DonateButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={CHUFFED_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {children}
      <span aria-hidden className="inline-block rtl:-scale-x-100">
        →
      </span>
    </a>
  );
}
