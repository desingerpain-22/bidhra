"use client";

import { use, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  type DemoMessage,
  type DemoOffer,
  getOffer,
  listMessages,
  newId,
  saveMessage,
  subscribeMessages,
  subscribeOffers,
} from "@/lib/demo-store";
import type { Locale } from "@/i18n/routing";

export default function ChatPage({
  params,
}: {
  params: Promise<{ locale: string; mentorshipId: string }>;
}) {
  const { locale, mentorshipId } = use(params);
  const t = useTranslations("Chat");
  const loc = locale as Locale;

  const [hydrated, setHydrated] = useState(false);
  const [offer, setOffer] = useState<DemoOffer | undefined>(undefined);
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [role, setRole] = useState<"mentor" | "owner">("owner");
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dateFormatter = new Intl.DateTimeFormat(loc, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  useEffect(() => {
    setOffer(getOffer(mentorshipId));
    setMessages(listMessages(mentorshipId));
    setHydrated(true);
  }, [mentorshipId]);

  useEffect(() => {
    const unsubMsg = subscribeMessages(mentorshipId, () =>
      setMessages(listMessages(mentorshipId)),
    );
    const unsubOff = subscribeOffers(() => setOffer(getOffer(mentorshipId)));
    return () => {
      unsubMsg();
      unsubOff();
    };
  }, [mentorshipId]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const content = draft.trim();
    if (!content || !offer || offer.status !== "active") return;
    saveMessage({
      id: newId(),
      offerId: offer.id,
      sender: role,
      content,
      createdAt: new Date().toISOString(),
    });
    setDraft("");
  }

  if (!hydrated) {
    return (
      <section className="rounded-xl border border-border bg-background p-8 text-sm text-muted-foreground">
        {t("loading")}
      </section>
    );
  }

  if (!offer) {
    return (
      <section className="rounded-xl border border-border bg-background p-8 text-sm text-muted-foreground">
        <p>{t("notFound")}</p>
        <Link
          href="/dashboard/offers"
          className="mt-3 inline-block text-foreground underline underline-offset-4"
        >
          {t("backToOffers")}
        </Link>
      </section>
    );
  }

  const canSend = offer.status === "active";

  return (
    <section className="flex flex-1 flex-col gap-4">
      <Link
        href="/dashboard/offers"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {t("backToOffers")}
      </Link>
      <header className="rounded-xl border border-border bg-background p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {t("threadFor")}
            </p>
            <p className="mt-1 break-words text-base font-medium text-foreground sm:text-lg">
              {offer.projectTitle}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted/30 p-1 text-xs">
            <span className="hidden px-2 text-muted-foreground sm:inline">{t("youAre")}:</span>
            {(["owner", "mentor"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={
                  "rounded-full px-2.5 py-1 transition sm:px-3 " +
                  (role === r
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {t(`roles.${r}`)}
              </button>
            ))}
          </div>
        </div>
        {!canSend && (
          <p className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-50 px-3 py-2 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            {t("notActive")}
          </p>
        )}
      </header>

      <div className="flex min-h-[55vh] flex-1 flex-col rounded-xl border border-border bg-background sm:min-h-[60vh]">
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4"
          aria-live="polite"
        >
          {messages.length === 0 && (
            <div className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              {t("emptyThread", { role: t(`roles.${role}`) })}
            </div>
          )}
          {messages.map((m) => {
            const mine = m.sender === role;
            return (
              <div
                key={m.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm sm:max-w-[80%] " +
                    (mine
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-muted/40 text-foreground")
                  }
                >
                  <p className="text-[10px] uppercase tracking-wide opacity-70">
                    {t(`roles.${m.sender}`)}
                  </p>
                  <p className="mt-0.5 whitespace-pre-wrap break-words">{m.content}</p>
                  <p
                    className={
                      "mt-1 text-[10px] " +
                      (mine ? "text-primary-foreground/70" : "text-muted-foreground")
                    }
                  >
                    {dateFormatter.format(new Date(m.createdAt))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={send}
          className="flex items-end gap-2 border-t border-border p-2 sm:p-3"
        >
          <textarea
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (draft.trim() && canSend) send(e);
              }
            }}
            disabled={!canSend}
            placeholder={canSend ? t("placeholder") : t("disabledPlaceholder")}
            className="min-h-[44px] min-w-0 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!canSend || !draft.trim()}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60 sm:px-5"
          >
            {t("send")}
          </button>
        </form>
      </div>
    </section>
  );
}
