import Image from "next/image";
import type { ReactNode } from "react";
import { LeafIcon } from "@/components/home-hero";
import { DONATE_URL, FUND_CTA, type AboutHeroImage } from "@/lib/about-content";

// Content container shared by the About pages.
export const ABOUT_CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-8";

// Opening block shared by the Who We Are pages, in the home hero's voice:
// leaf badge, a two-tone headline (last line in forest green), intro and
// the Fund CTA, beside framed, slightly tilted photo cards, with the faint
// skyline fading in along the bottom. Without an image or aside the copy
// centres, like the home hero.
export function AboutHero({
  eyebrow,
  titleLines,
  intro,
  image,
  secondaryImage,
  note,
  aside,
}: {
  eyebrow: string;
  titleLines: string[];
  intro: string;
  image?: AboutHeroImage;
  secondaryImage?: AboutHeroImage;
  note?: string;
  aside?: ReactNode;
}) {
  const visual = image ? (
    <FramedPhotos image={image} secondaryImage={secondaryImage} note={note} />
  ) : (
    aside
  );
  const centered = !visual;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="trust-skyline pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <Image
          src="/trust/skyline.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom mix-blend-multiply"
        />
      </div>

      <div
        className={`${ABOUT_CONTAINER} grid gap-14 pb-28 pt-10 sm:pb-36 sm:pt-14 lg:items-center lg:pb-40 lg:pt-16 ${
          centered ? "justify-items-center text-center" : "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
        }`}
      >
        <div className={`flex flex-col ${centered ? "max-w-3xl items-center" : "items-start"}`}>
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-7 text-balance text-foreground">
            {titleLines.map((line, i) => (
              <span
                key={line}
                className={`block ${i === titleLines.length - 1 && titleLines.length > 1 ? "text-accent" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
          <FundCta className="mt-9" />
        </div>
        {visual && <div className="w-full lg:justify-self-end">{visual}</div>}
      </div>
    </section>
  );
}

// The home hero's leaf badge.
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.22em]">
      <LeafIcon />
      {children}
    </span>
  );
}

// A section label set between two short rules, as on the home page.
export function SectionLabel({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "center" | "start";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-xs ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span aria-hidden className="h-px w-8 bg-foreground/30" />
      {children}
      {align === "center" && <span aria-hidden className="h-px w-8 bg-foreground/30" />}
    </p>
  );
}

// Photo in the home hero's card frame: white border, soft shadow, a slight
// tilt.
export function FramedPhoto({
  image,
  aspect = "aspect-[5/4]",
  tilt = "rotate-[1.5deg]",
  sizes,
  className = "",
}: {
  image: AboutHeroImage;
  aspect?: string;
  tilt?: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.1rem] bg-surface p-1.5 shadow-2xl shadow-foreground/15 ring-1 ring-border sm:p-2 ${tilt} ${className}`}
    >
      <div className={`relative overflow-hidden rounded-[0.75rem] bg-muted ${aspect}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
      </div>
    </div>
  );
}

function FramedPhotos({
  image,
  secondaryImage,
  note,
}: {
  image: AboutHeroImage;
  secondaryImage?: AboutHeroImage;
  note?: string;
}) {
  return (
    <figure className="relative mx-auto w-full max-w-lg lg:me-4">
      <FramedPhoto
        image={image}
        aspect={image.aspect}
        sizes="(min-width: 1024px) 32rem, 90vw"
      />
      {secondaryImage && (
        <FramedPhoto
          image={secondaryImage}
          aspect="aspect-square"
          tilt="-rotate-[5deg]"
          sizes="14rem"
          className="absolute -bottom-10 -start-6 hidden w-[40%] sm:block lg:-start-12"
        />
      )}
      {note && <HandNote className="absolute -top-12 end-2 hidden -rotate-6 sm:block">{note}</HandNote>}
    </figure>
  );
}

// Handwritten line in the home hero's note style; one sentence per line.
export function HandNote({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`about-hand-note text-end ${className}`}>
      {children.split(/(?<=\.)\s+/).map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </span>
  );
}

export function FundCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {FUND_CTA}
      <span aria-hidden className="inline-block rtl:-scale-x-100">
        →
      </span>
    </a>
  );
}

// Small line icons for the principles and trust rows.
export function AboutIcon({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    people: (
      <>
        <circle cx="8.5" cy="8" r="2.75" />
        <circle cx="16" cy="9" r="2.25" />
        <path d="M3.5 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8" />
        <path d="M14.2 14.4c2.3-.4 4.3 1.1 5 4" />
      </>
    ),
    local: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <path d="M9.5 10.5 12 8l2.5 2.5V13h-5Z" />
      </>
    ),
    sprout: (
      <>
        <path d="M12 20v-8" />
        <path d="M12 12c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6Z" />
        <path d="M12 12c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6Z" />
      </>
    ),
    loop: (
      <path d="M8.5 15.5c-2 0-3.5-1.6-3.5-3.5S6.5 8.5 8.5 8.5c3.5 0 3.5 7 7 7 2 0 3.5-1.6 3.5-3.5s-1.5-3.5-3.5-3.5c-3.5 0-3.5 7-7 7Z" />
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    document: (
      <>
        <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V3.5Z" />
        <path d="M14 3.5V8h4M9.5 12h5M9.5 15h5M9.5 18h3" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
      </>
    ),
    heart: (
      <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />
    ),
    calendar: (
      <>
        <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
        <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
        <path d="m9.5 15 1.8 1.8 3.4-3.6" />
      </>
    ),
    gift: (
      <>
        <rect x="4" y="9" width="16" height="11" rx="1.5" />
        <path d="M3.5 9h17v3.5h-17ZM12 9v11" />
        <path d="M12 9c-1.5-3.5-5-3.8-5-1.6C7 8.6 9 9 12 9Zm0 0c1.5-3.5 5-3.8 5-1.6C17 8.6 15 9 12 9Z" />
      </>
    ),
    image: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m4 17 5-4.5 3.5 3 3-2.5L20 16.5" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`text-accent ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
