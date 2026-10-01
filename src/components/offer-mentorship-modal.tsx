"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { newId, saveOffer } from "@/lib/demo-store";

export function OfferMentorshipModal({
  open,
  onOpenChange,
  projectSlug,
  projectTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectSlug: string;
  projectTitle: string;
}) {
  const t = useTranslations("MentorshipOffer");
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [createdOfferId, setCreatedOfferId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  function submit() {
    if (!name.trim() || !role.trim()) {
      setError(t("errors.missingFields"));
      return;
    }
    setError(null);
    const id = newId();
    saveOffer({
      id,
      projectSlug,
      projectTitle,
      mentorName: name.trim(),
      mentorRole: role.trim(),
      motivation: message.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    setCreatedOfferId(id);
    setDone(true);
  }

  function goToProjects() {
    onOpenChange(false);
    router.push("/projects");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
    >
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label={t("close")}
      />
      <div className="relative w-full rounded-t-2xl border border-border bg-surface text-foreground shadow-2xl sm:max-w-xl sm:rounded-2xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full px-3 py-1 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
          >
            {t("close")}
          </button>
        </header>

        <div className="space-y-4 px-5 py-5">
          {done ? (
            <div className="space-y-3">
              <p className="text-lg font-semibold text-accent">{t("success.title")}</p>
              <p className="text-sm text-foreground/80">{t("success.body")}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={goToProjects}
                  className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
                >
                  {t("success.browseProjects")}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm text-foreground"
                >
                  {t("success.done")}
                </button>
              </div>
              {createdOfferId && (
                <p className="text-xs text-muted-foreground">{t("success.demoNote")}</p>
              )}
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-border bg-surface-soft p-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("project")}</p>
                <p className="mt-1 text-sm font-medium">{projectTitle}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-foreground/80">{t("nameLabel")}</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border border-border bg-surface-soft px-3 text-sm outline-none focus:border-accent"
                    placeholder={t("namePlaceholder")}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-foreground/80">{t("roleLabel")}</span>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 rounded-xl border border-border bg-surface-soft px-3 text-sm outline-none focus:border-accent"
                    placeholder={t("rolePlaceholder")}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-foreground/80">{t("motivationLabel")}</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-soft p-3 text-sm outline-none focus:border-accent"
                  placeholder={t("motivationPlaceholder")}
                />
              </label>

              <label className="flex items-start gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2 text-sm text-foreground/80">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-accent"
                />
                <span>{t("commitment")}</span>
              </label>

              {error && (
                <p className="rounded-md border border-red-400/40 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="button"
                disabled={!agreed}
                onClick={submit}
                className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t("submit")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
