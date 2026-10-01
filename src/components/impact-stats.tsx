import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { getChuffedCampaignStats } from "@/lib/chuffed";
import { getProjects } from "@/lib/projects";

// Impact figures with no live data source. Update these as new figures are
// verified.
const IMPACT = {
  jobsCreated: 3,
  peopleBenefiting: 15,
};

// The impact numbers, directly below the hero: four figures, each with a
// line icon, between two thin rules that run to the screen edges. Raised is
// the live Chuffed total (skipped if the request fails), businesses come
// from the project list, and jobs and people are the verified figures in
// IMPACT.
export async function ImpactStats({ locale }: { locale: string }) {
  const t = await getTranslations("Hero");
  const [stats, projects] = await Promise.all([
    getChuffedCampaignStats(),
    getProjects(),
  ]);
  const numberFormatter = new Intl.NumberFormat(locale);
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const businessesSupported = projects.filter(
    (project) => project.supportType !== "knowledge",
  ).length;

  const metrics = [
    ...(stats
      ? [
          {
            key: "raised",
            value: currencyFormatter.format(stats.raised),
            label: t("metricRaised"),
            icon: <HeartHandIcon />,
          },
        ]
      : []),
    {
      key: "businesses",
      value: numberFormatter.format(businessesSupported),
      label: t("metricBusinesses", { count: businessesSupported }),
      icon: <StorefrontIcon />,
    },
    {
      key: "jobs",
      value: numberFormatter.format(IMPACT.jobsCreated),
      label: t("metricJobs", { count: IMPACT.jobsCreated }),
      icon: <BriefcaseIcon />,
    },
    {
      key: "people",
      value: numberFormatter.format(IMPACT.peopleBenefiting),
      label: t("metricPeople", { count: IMPACT.peopleBenefiting }),
      icon: <PeopleIcon />,
    },
  ];

  return (
    <section
      aria-label={t("metricsLabel")}
      className="border-y border-foreground/15 px-4 sm:px-8"
    >
      <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="flex flex-col items-center gap-4 border-foreground/10 px-3 py-9 text-center max-md:odd:border-e max-md:[&:nth-child(n+3)]:border-t sm:py-11 md:border-s md:px-6 md:first:border-s-0"
          >
            <span aria-hidden className="text-accent/80">
              {metric.icon}
            </span>
            <div className="flex flex-col-reverse gap-2">
              <dt className="text-sm leading-snug text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="text-[clamp(1.875rem,3.4vw,2.625rem)] font-semibold leading-none tracking-[-0.035em] text-foreground tabular-nums">
                {metric.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
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

// Raised: a heart held in an open hand.
function HeartHandIcon() {
  return (
    <Icon>
      <path d="M12 12.5s-4-2.4-4-5.4A2.2 2.2 0 0 1 12 5.9a2.2 2.2 0 0 1 4 1.2c0 3-4 5.4-4 5.4Z" />
      <path d="M3 15.5h2.5l3.2 1.6c.5.3 1.1.4 1.7.4h3.1a1.5 1.5 0 0 0 0-3H11" />
      <path d="m13.5 16 4.6-1.9a1.6 1.6 0 0 1 1.3 2.9L14 20.2c-.6.3-1.3.4-2 .3l-6.5-.8H3" />
    </Icon>
  );
}

// Businesses: a shopfront with an awning.
function StorefrontIcon() {
  return (
    <Icon>
      <path d="M4.5 10.5V20h15v-9.5" />
      <path d="M3.5 7.5 5 4h14l1.5 3.5a2.4 2.4 0 0 1-4.25 1.5A2.4 2.4 0 0 1 12 9a2.4 2.4 0 0 1-4.25 0A2.4 2.4 0 0 1 3.5 7.5Z" />
      <path d="M10 20v-5h4v5" />
    </Icon>
  );
}

// Jobs: a briefcase.
function BriefcaseIcon() {
  return (
    <Icon>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3.5 12.5h17" />
      <path d="M11 12.5v1.5h2v-1.5" />
    </Icon>
  );
}

// People benefiting: two figures.
function PeopleIcon() {
  return (
    <Icon>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M15.5 14.1c2.4-.3 4.4 1.4 5 4.4" />
    </Icon>
  );
}
