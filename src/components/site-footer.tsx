import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { ReactNode } from "react";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-10">
        <Link href="/" aria-label="Bidhra" className="inline-flex">
          <Image
            src="/logo.png"
            alt="Bidhra"
            width={1124}
            height={262}
            className="h-8 w-auto opacity-95"
          />
        </Link>

        <p className="max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("mission")}
        </p>

        <nav
          aria-label={t("linksHeading")}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-foreground/70 sm:text-base"
        >
          <Link href="/projects" className="transition hover:text-foreground">
            {t("browse")}
          </Link>
          <Link href="/apply" className="transition hover:text-foreground">
            {t("apply")}
          </Link>
        </nav>

        <div
          aria-label={t("socialHeading")}
          className="flex items-center justify-center gap-3"
        >
          <SocialLink
            href="https://www.linkedin.com/company/bidhra"
            label={t("linkedin")}
          >
            <LinkedInIcon />
          </SocialLink>
          <SocialLink
            href="https://www.instagram.com/bidhra"
            label={t("instagram")}
          >
            <InstagramIcon />
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="currentColor"
    >
      <path d="M6.94 8.98H3.78v10.1h3.16V8.98ZM5.36 4.92a1.84 1.84 0 1 0 0 3.68 1.84 1.84 0 0 0 0-3.68Zm13.86 8.37c0-3.04-1.62-4.45-3.78-4.45a3.26 3.26 0 0 0-2.96 1.63h-.04V8.98H9.42v10.1h3.15v-5c0-1.32.25-2.6 1.89-2.6 1.6 0 1.62 1.5 1.62 2.68v4.92h3.14v-5.79Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.2h.01" />
    </svg>
  );
}
