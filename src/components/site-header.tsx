import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NavDropdown } from "@/components/nav-dropdown";
import { SiteHeaderShell } from "@/components/site-header-shell";
import { MobileMenu } from "@/components/mobile-menu";

const NAV_LINK =
  "whitespace-nowrap rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <SiteHeaderShell>
      {/* From lg up the equal outer columns keep the nav centered on the page
          regardless of the logo and CTA widths. */}
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10 xl:px-14">
        <Link
          href="/"
          aria-label="Bidhra"
          className="inline-flex min-w-0 items-center justify-self-start"
        >
          <Image
            src="/bidhra-logo-2026.png"
            alt="Bidhra"
            width={1726}
            height={516}
            priority
            className="h-10 w-auto sm:h-11 lg:h-12"
          />
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center justify-self-center gap-x-1 text-sm lg:flex xl:gap-x-3"
        >
          <NavDropdown
            label={t("whoWeAre")}
            items={[
              { href: "/about", label: t("aboutBidhra") },
              { href: "/about/our-story", label: t("ourStory") },
              { href: "/about/team", label: t("ourTeam") },
              { href: "/about/transparency", label: t("trustTransparency") },
            ]}
          />
          <Link href="/projects" className={NAV_LINK}>
            {t("browse")}
          </Link>
          <Link href="/how-to-donate" className={NAV_LINK}>
            {t("howToDonateNav")}
          </Link>
        </nav>
        {/* Leads to the projects, so visitors see who they fund before giving. */}
        <Link
          href="/projects"
          className="hidden min-h-10 items-center justify-center gap-2 justify-self-end whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/15 transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:inline-flex"
        >
          {t("fundCta")}
          <span aria-hidden className="inline-block rtl:-scale-x-100">
            →
          </span>
        </Link>
        {/* Below lg: a compact Fund a Business pill beside the menu button. */}
        <div className="flex min-w-0 items-center justify-self-end gap-2 lg:hidden">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3.5 text-[13px] font-semibold text-accent-foreground shadow-lg shadow-accent/15 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-5 sm:text-sm"
          >
            {t("fundCta")}
            <span aria-hidden className="hidden rtl:-scale-x-100 sm:inline-block">
              →
            </span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </SiteHeaderShell>
  );
}
