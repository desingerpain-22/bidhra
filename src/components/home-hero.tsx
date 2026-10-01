import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RotatingWord } from "@/components/rotating-word";

type HeroCard = {
  src: string;
  altKey: "carpentryAlt" | "embroideryAlt" | "iceCreamAlt" | "laundryAlt" | "farmingAlt";
  /** Degrees along the arc from its apex; negative sits left of center. */
  angle: number;
  /** Hand-placed tilt added on top of the arc rotation. */
  tilt: number;
  /** Place in the three-card mobile fan, or null to drop the card on mobile. */
  mobileSlot: -1 | 0 | 1 | null;
  objectPosition?: string;
};

// Cards are laid out along an arc by angle, so adding a photo only needs a
// new entry with its angle; the radius and card size live in globals.css.
const HERO_CARDS: HeroCard[] = [
  {
    // Pre-cropped to the card's 5:4 shape, framing his face and body. He
    // stands at the photo's left edge, so it takes the right outer slot,
    // where that side faces inward and stays on screen on laptops.
    src: "/hero/carpentry-workshop.webp",
    altKey: "carpentryAlt",
    angle: 29,
    tilt: -1.5,
    mobileSlot: 0,
  },
  {
    src: "/hero/embroidery-project.webp",
    altKey: "embroideryAlt",
    angle: -13,
    tilt: -1,
    mobileSlot: -1,
    objectPosition: "40% 35%",
  },
  {
    src: "/hero/ice-cream-project.webp",
    altKey: "iceCreamAlt",
    angle: 0,
    tilt: -1.5,
    mobileSlot: 1,
    objectPosition: "45% 35%",
  },
  // Pre-cropped to the card's 5:4 shape, without the old text overlay.
  { src: "/hero/laundry-tent.webp", altKey: "laundryAlt", angle: 13, tilt: 1, mobileSlot: null },
  {
    src: "/hero/farming-project.png",
    altKey: "farmingAlt",
    angle: -29,
    tilt: 1.5,
    mobileSlot: null,
    objectPosition: "36% 40%",
  },
];

// Widest card angle. Cards scale down from the apex toward it, so the center
// card reads as nearest and the outer ones recede.
const ARC_MAX_ANGLE = 29;

// Share of the arc angle a card turns by, so the fan stays gentle.
const ARC_ROTATION = 0.65;

function polar(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    "--arc-x": Math.sin(rad).toFixed(4),
    "--arc-y": (1 - Math.cos(rad)).toFixed(4),
  };
}

function cardStyle(card: HeroCard, index: number): CSSProperties {
  const slot = card.mobileSlot ?? 0;
  const spread = Math.abs(card.angle) / ARC_MAX_ANGLE;

  return {
    ...polar(card.angle),
    "--arc-rot": `${(card.angle * ARC_ROTATION + card.tilt).toFixed(2)}deg`,
    "--arc-scale": (1.1 - spread * 0.12).toFixed(3),
    "--arc-z": 10 - Math.round(Math.abs(card.angle) / 16),
    "--mob-slot": slot,
    "--mob-abs": Math.abs(slot),
    "--mob-z": 10 - Math.abs(slot),
    "--rise-delay": `${120 + index * 90}ms`,
  } as CSSProperties;
}

export async function HomeHero({ locale }: { locale: string }) {
  const t = await getTranslations("Hero");
  const headingWords = t.raw("headingWords") as string[];
  const listFormatter = new Intl.ListFormat(locale, { type: "conjunction" });
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="home-hero relative isolate overflow-hidden"
    >
      <div aria-hidden className="hero-landscape pointer-events-none absolute inset-x-0 bottom-0">
        <Image
          src="/hero/landscape.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_62%] mix-blend-multiply"
        />
      </div>

      <div className="hero-inner relative mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 pt-6 sm:px-8 md:pt-10">
        <HeroOrnaments />

        <div className="hero-arc w-full">
          <span aria-hidden className="hero-arc-ring hero-arc-ring-outer max-md:hidden" />
          <span aria-hidden className="hero-arc-ring hero-arc-ring-inner max-md:hidden" />
          <HeroNote text={t("noteLeft")} className="hero-note-left" />
          <HeroNote text={t("noteRight")} className="hero-note-right" underline />
          {HERO_CARDS.map((card, index) => (
            <figure
              key={card.src}
              className={`hero-arc-card ${card.mobileSlot === null ? "max-md:hidden" : ""}`}
              style={cardStyle(card, index)}
            >
              <div className="hero-arc-card-inner rounded-[1.1rem] bg-surface p-1.5 shadow-2xl shadow-foreground/15 ring-1 ring-border sm:p-2">
                <div className="hero-card-photo relative aspect-[5/4] overflow-hidden rounded-[0.75rem] bg-muted">
                  <Image
                    src={card.src}
                    alt={t(card.altKey)}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 17vw, 44vw"
                    loading={card.mobileSlot === null ? "lazy" : "eager"}
                    fetchPriority={card.mobileSlot === 0 ? "high" : undefined}
                    className="object-cover"
                    style={{ objectPosition: card.objectPosition }}
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>

        <div className="hero-copy relative z-10 flex max-w-4xl flex-col items-center text-center">
          <span className="hero-badge hero-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.22em]">
            <LeafIcon />
            {t("eyebrow")}
          </span>
          <h1
            id="home-hero-heading"
            className="hero-title hero-rise mt-6 text-balance text-[clamp(2.25rem,5.4vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-foreground [--rise-delay:80ms]"
          >
            <span className="block">{t("headingPlain")}</span>
            <em className="block text-accent">
              {/* Screen readers get one stable sentence instead of a word
                  that changes every few seconds. */}
              <span aria-hidden>
                {t("headingLead")}{" "}
                <RotatingWord
                  words={headingWords}
                  fallbackIndex={headingWords.length - 1}
                  suffix="."
                />
              </span>
              <span className="sr-only">
                {t("headingLead")} {listFormatter.format(headingWords)}.
              </span>
            </em>
          </h1>
          <p className="hero-sub hero-rise mt-6 max-w-2xl text-pretty md:max-w-3xl text-base leading-relaxed text-muted-foreground [--rise-delay:160ms] sm:text-lg md:text-xl">
            {t("subheading")}
          </p>
          <div className="hero-actions hero-rise mt-8 flex w-full flex-col items-stretch gap-3 [--rise-delay:240ms] sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {t("cta")}
              <span aria-hidden className="inline-block rtl:-scale-x-100">
                →
              </span>
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-border bg-surface/70 px-6 text-base font-medium text-foreground backdrop-blur transition hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <ArrowDownCircleIcon />
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>

      <OliveBranches />
    </section>
  );
}

function OliveBranches() {
  const branch = (className: string, sizes: string) => (
    <Image
      src="/hero/olive-branch.webp"
      alt=""
      width={900}
      height={1125}
      sizes={sizes}
      className={`pointer-events-none absolute h-auto select-none ${className}`}
    />
  );

  // Mobile sizes are unchanged; from md up the branches shrink and soften
  // into quiet framing at the corners.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {branch(
        "-left-10 -top-10 w-36 -rotate-6 sm:w-52 md:-left-14 md:-top-14 md:w-[clamp(9rem,13vw,15rem)] md:opacity-80",
        "(min-width: 768px) 15rem, 13rem",
      )}
      {branch(
        "-right-10 -top-12 w-32 -scale-x-100 rotate-6 sm:w-48 md:-right-14 md:-top-16 md:w-[clamp(8.5rem,12vw,14rem)] md:opacity-80",
        "(min-width: 768px) 14rem, 12rem",
      )}
      {branch(
        "hero-branch-low -bottom-10 -left-24 hidden w-[clamp(11rem,14vw,15rem)] -scale-y-100 rotate-12 opacity-40 blur-[4px] md:block",
        "15rem",
      )}
      {branch(
        "hero-branch-low -bottom-12 -right-24 hidden w-[clamp(11rem,14vw,15rem)] -scale-100 -rotate-12 opacity-40 blur-[4px] md:block",
        "15rem",
      )}
    </div>
  );
}

// Tiny dots, diamonds and dot clusters: restrained editorial marks around
// the arc. The curved lines are the arc rings in globals.css.
function HeroOrnaments() {
  const dot = "absolute rounded-full";
  const diamond = "absolute rotate-45 border";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      <span className={`${diamond} left-[31%] top-[1.5rem] h-2 w-2 border-accent/40`} />
      <span className={`${diamond} right-[31%] top-[2rem] h-1.5 w-1.5 border-foreground/25`} />
      <span className={`${diamond} left-[7%] top-[46%] h-1.5 w-1.5 border-accent/30`} />
      <span className={`${diamond} right-[6%] top-[40%] h-2 w-2 border-foreground/20`} />
      <span className={`${dot} left-[24%] top-[3.25rem] h-1.5 w-1.5 bg-accent/30`} />
      <span className={`${dot} right-[23%] top-[2.75rem] h-1 w-1 bg-accent/40`} />
      <span className={`${dot} left-[10%] top-[34%] h-1 w-1 bg-foreground/20`} />
      <span className={`${dot} right-[9%] top-[30%] h-1.5 w-1.5 bg-foreground/15`} />
      <DotCluster className="left-[37%] top-[0.9rem]" />
      <DotCluster className="right-[16%] top-[4.5rem]" />
      <DotCluster className="bottom-[22%] left-[5%]" />
      <DotCluster className="bottom-[26%] right-[5%]" />
    </div>
  );
}

// Small handwritten editorial note for the hero's outer edges; one sentence
// per line. Decorative, so hidden from assistive tech.
export function HeroNote({
  text,
  className,
  underline = false,
}: {
  text: string;
  className: string;
  underline?: boolean;
}) {
  const lines = text.split(/(?<=\.)\s+/);

  return (
    <span aria-hidden className={`hero-note hidden xl:block ${className}`}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      {underline ? (
        <svg viewBox="0 0 60 8" className="hero-note-flourish" fill="none">
          <path
            d="M2 5.5c14-3 34-4 56-1.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

function DotCluster({ className }: { className: string }) {
  return (
    <span className={`absolute flex gap-1 ${className}`}>
      <span className="h-[3px] w-[3px] rounded-full bg-accent/35" />
      <span className="mt-1 h-[3px] w-[3px] rounded-full bg-accent/25" />
      <span className="h-[3px] w-[3px] rounded-full bg-foreground/20" />
    </span>
  );
}

function IconFrame({ children, className = "h-8 w-8" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function LeafIcon() {
  return (
    <IconFrame className="h-4 w-4 text-accent">
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
      <path d="M5 19 13 11" />
    </IconFrame>
  );
}

function ArrowDownCircleIcon() {
  return (
    <IconFrame className="h-5 w-5 text-accent">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8.5 12.5 12 16l3.5-3.5" />
    </IconFrame>
  );
}

