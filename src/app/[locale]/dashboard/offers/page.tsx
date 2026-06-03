"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  type DemoOffer,
  listOffers,
  subscribeOffers,
  updateOfferStatus,
} from "@/lib/demo-store";

export default function DashboardOffersPage() {
  const t = useTranslations("OwnerOffers");
  const [offers, setOffers] = useState<DemoOffer[] | null>(null);

  useEffect(() => {
    setOffers(listOffers());
    const unsub = subscribeOffers(() => setOffers(listOffers()));
    return unsub;
  }, []);

  if (offers === null) {
    return (
      <section className="rounded-xl border border-border bg-background p-8 text-sm text-muted-foreground">
        {t("loading")}
      </section>
    );
  }

  if (offers.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-background p-8 text-sm text-muted-foreground">
        <p>{t("empty")}</p>
        <Link
          href="/knowledge"
          className="mt-3 inline-block text-foreground underline underline-offset-4"
        >
          {t("emptyCta")}
        </Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {offers.map((o) => (
        <article
          key={o.id}
          className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {t("forProject")}
              </p>
              <p className="break-words text-sm font-medium text-foreground">{o.projectTitle}</p>
            </div>
            <span
              className={
                "rounded-full px-3 py-1 text-xs font-medium " +
                (o.status === "pending"
                  ? "bg-muted text-foreground"
                  : o.status === "active"
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-muted text-muted-foreground")
              }
            >
              {t(`status.${o.status}`)}
            </span>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
            <p className="font-medium text-foreground">
              {o.mentorName}
              {o.mentorRole ? ` · ${o.mentorRole}` : ""}
            </p>
            {o.motivation && (
              <blockquote className="mt-2 border-s-2 border-accent ps-3 italic text-muted-foreground">
                {o.motivation}
              </blockquote>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {o.status === "pending" && (
              <>
                <button
                  type="button"
                  onClick={() => updateOfferStatus(o.id, "active")}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  {t("accept")}
                </button>
                <button
                  type="button"
                  onClick={() => updateOfferStatus(o.id, "declined")}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  {t("decline")}
                </button>
              </>
            )}
            {o.status === "active" && (
              <Link
                href={`/dashboard/chat/${o.id}`}
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                {t("openChat")}
              </Link>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
