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

  function goToDashboard() {
    onOpenChange(false);
    router.push("/dashboard/offers");
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
      <div className="relative w-full rounded-t-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-2xl sm:max-w-xl sm:rounded-2xl">
        <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full px-3 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            {t("close")}
          </button>
        </header>

        <div className="space-y-4 px-5 py-5">
          {done ? (
            <div className="space-y-3">
              <p className="text-lg font-semibold text-emerald-300">{t("success.title")}</p>
              <p className="text-sm text-zinc-300">{t("success.body")}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="inline-flex h-10 items-center rounded-full bg-emerald-400 px-5 text-sm font-medium text-zinc-950"
                >
                  {t("success.openDashboard")}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-10 items-center rounded-full border border-zinc-700 px-5 text-sm text-zinc-200"
                >
                  {t("success.done")}
                </button>
              </div>
              {createdOfferId && (
                <p className="text-xs text-zinc-500">{t("success.demoNote")}</p>
              )}
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                <p className="text-xs uppercase tracking-widest text-zinc-500">{t("project")}</p>
                <p className="mt-1 text-sm font-medium">{projectTitle}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-zinc-300">{t("nameLabel")}</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-emerald-400"
                    placeholder={t("namePlaceholder")}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-zinc-300">{t("roleLabel")}</span>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-sm outline-none focus:border-emerald-400"
                    placeholder={t("rolePlaceholder")}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-zinc-300">{t("motivationLabel")}</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm outline-none focus:border-emerald-400"
                  placeholder={t("motivationPlaceholder")}
                />
              </label>

              <label className="flex items-start gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-emerald-400"
                />
                <span>{t("commitment")}</span>
              </label>

              {error && (
                <p className="rounded-md border border-rose-400/40 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
                  {error}
                </p>
              )}

              <button
                type="button"
                disabled={!agreed}
                onClick={submit}
                className="inline-flex h-11 items-center rounded-full bg-emerald-400 px-6 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
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
