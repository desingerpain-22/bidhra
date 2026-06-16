"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Step = "amount" | "donor" | "confirm";
type Phase = "form" | "submitting" | "success" | "failure";

type Draft = {
  step: Step;
  amount: number | null;
  donorName: string;
  donorEmail: string;
  isPublic: boolean;
  updatedAt: number;
};

const PRESETS = [50, 100, 250, 500];
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function createCryptoInvoice(
  amount: number,
  projectSlug: string,
  projectTitle: string,
  locale: string,
  donorName: string,
  donorEmail: string,
  isPublic: boolean,
): Promise<string> {
  const res = await fetch("/api/nowpayments/create-invoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, projectSlug, projectTitle, locale, donorName, donorEmail, isPublic }),
  });
  if (!res.ok) throw new Error("invoice_failed");
  const data = (await res.json()) as { invoiceUrl?: string };
  if (!data.invoiceUrl) throw new Error("invoice_failed");
  return data.invoiceUrl;
}

export function DonateModal({
  open,
  onOpenChange,
  projectSlug,
  projectTitle,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectSlug: string;
  projectTitle: string;
  onSuccess: (amount: number) => void;
}) {
  const t = useTranslations("Donate");
  const locale = useLocale();

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [phase, setPhase] = useState<Phase>("form");
  const [resumeAvail, setResumeAvail] = useState(false);

  const draftKey = `bidhra:donation-draft:${projectSlug}`;

  function reset() {
    setStep("amount");
    setAmount(null);
    setCustom("");
    setDonorName("");
    setDonorEmail("");
    setIsPublic(true);
    setPhase("form");
  }

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const raw = localStorage.getItem(draftKey);
    if (!raw) {
      reset();
      setResumeAvail(false);
      return;
    }
    try {
      const d = JSON.parse(raw) as Draft;
      if (Date.now() - d.updatedAt < DRAFT_TTL_MS && d.amount) {
        setResumeAvail(true);
      } else {
        localStorage.removeItem(draftKey);
        reset();
        setResumeAvail(false);
      }
    } catch {
      localStorage.removeItem(draftKey);
      reset();
      setResumeAvail(false);
    }
  }, [open, draftKey]);

  useEffect(() => {
    if (!open || phase !== "form" || resumeAvail || amount === null) return;
    const d: Draft = { step, amount, donorName, donorEmail, isPublic, updatedAt: Date.now() };
    localStorage.setItem(draftKey, JSON.stringify(d));
  }, [open, step, amount, donorName, donorEmail, isPublic, phase, resumeAvail, draftKey]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  function applyResume() {
    const raw = localStorage.getItem(draftKey);
    if (!raw) { setResumeAvail(false); return; }
    try {
      const d = JSON.parse(raw) as Draft;
      setStep(d.step);
      setAmount(d.amount);
      if (d.amount) setCustom(String(d.amount));
      setDonorName(d.donorName ?? "");
      setDonorEmail(d.donorEmail ?? "");
      setIsPublic(d.isPublic ?? true);
      setResumeAvail(false);
    } catch {
      setResumeAvail(false);
    }
  }

  function discardResume() {
    localStorage.removeItem(draftKey);
    reset();
    setResumeAvail(false);
  }

  function pickPreset(v: number) {
    setAmount(v);
    setCustom(String(v));
  }

  function changeCustom(v: string) {
    setCustom(v);
    const n = Number(v);
    setAmount(Number.isFinite(n) && n > 0 ? n : null);
  }

  const emailValid = EMAIL_RE.test(donorEmail);

  const canNext =
    step === "amount"
      ? Boolean(amount && amount >= 1)
      : step === "donor"
        ? donorName.trim().length >= 1 && emailValid
        : true;

  function next() {
    if (step === "amount") setStep("donor");
    else if (step === "donor") setStep("confirm");
  }
  function back() {
    if (step === "donor") setStep("amount");
    else if (step === "confirm") setStep("donor");
  }

  async function submit() {
    if (!amount) return;
    setPhase("submitting");
    try {
      const invoiceUrl = await createCryptoInvoice(
        amount,
        projectSlug,
        projectTitle,
        locale,
        donorName,
        donorEmail,
        isPublic,
      );
      localStorage.removeItem(draftKey);
      window.location.href = invoiceUrl;
    } catch {
      setPhase("failure");
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${projectTitle} · Bidhra`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Bidhra", text, url });
        return;
      } catch { /* user canceled */ }
    }
    try {
      await navigator.clipboard?.writeText(url);
    } catch { /* clipboard unavailable */ }
  }

  if (!open) return null;

  const stepIndex = step === "amount" ? 1 : step === "donor" ? 2 : 3;
  const stepLabel = {
    amount: t("step.amount"),
    donor: t("step.donor"),
    confirm: t("step.confirm"),
  }[step];

  const displayName = isPublic ? donorName || t("donorStep.anonymousLabel") : t("donorStep.anonymousLabel");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-heading"
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label={t("close")}
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-2xl sm:max-w-md sm:rounded-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-900 px-5 py-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-zinc-100">{stepIndex} / 3</span>
            <span className="text-zinc-400">{stepLabel}</span>
          </div>
          <button
            type="button"
            aria-label={t("close")}
            onClick={() => onOpenChange(false)}
            className="-me-2 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            ×
          </button>
        </header>

        <div className="h-1 w-full bg-zinc-800">
          <div
            className="h-full bg-emerald-400 transition-[width] duration-300"
            style={{ width: `${(stepIndex / 3) * 100}%` }}
          />
        </div>

        <div className="px-5 py-6">
          {resumeAvail && phase === "form" && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm">
              <span className="text-zinc-300">{t("resume.banner")}</span>
              <div className="flex gap-2">
                <button type="button" onClick={discardResume} className="rounded-full px-3 py-1 text-zinc-400 hover:text-zinc-100">
                  {t("resume.discard")}
                </button>
                <button type="button" onClick={applyResume} className="rounded-full bg-emerald-400 px-3 py-1 font-medium text-zinc-950 hover:bg-emerald-300">
                  {t("resume.resume")}
                </button>
              </div>
            </div>
          )}

          {phase === "form" && step === "amount" && (
            <section className="flex flex-col gap-5">
              <h2 id="donate-heading" className="text-xl font-semibold">
                {t("amountStep.heading")}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PRESETS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => pickPreset(v)}
                    className={`rounded-xl border px-3 py-3 text-base font-semibold transition ${
                      amount === v
                        ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                        : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-zinc-400">{t("amountStep.customLabel")}</span>
                <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 ps-3">
                  <span className="text-zinc-400">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={1}
                    value={custom}
                    onChange={(e) => changeCustom(e.target.value)}
                    placeholder="0"
                    className="h-11 w-full bg-transparent pe-3 text-zinc-100 outline-none placeholder:text-zinc-600"
                  />
                </div>
                {custom && amount === null && (
                  <span className="text-xs text-rose-400">{t("amountStep.minError")}</span>
                )}
              </label>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
                <p className="mb-1 font-medium text-zinc-200">{t("amountStep.cryptoOnlyTitle")}</p>
                <p>{t("amountStep.cryptoOnlyNote")}</p>
                <Link href="/how-to-donate" className="mt-2 inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
                  {t("amountStep.howToLink")} →
                </Link>
              </div>
            </section>
          )}

          {phase === "form" && step === "donor" && (
            <section className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">{t("donorStep.heading")}</h2>
              <p className="text-sm text-zinc-400">{t("donorStep.subheading")}</p>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-zinc-300">{t("donorStep.nameLabel")}</span>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={t("donorStep.namePlaceholder")}
                  className="h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-emerald-400"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-zinc-300">{t("donorStep.emailLabel")}</span>
                <input
                  type="email"
                  inputMode="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder={t("donorStep.emailPlaceholder")}
                  className="h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-emerald-400"
                />
                <span className="text-xs text-zinc-500">{t("donorStep.emailNote")}</span>
                {donorEmail && !emailValid && (
                  <span className="text-xs text-rose-400">{t("donorStep.emailError")}</span>
                )}
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-zinc-300">{t("donorStep.visibilityLabel")}</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPublic(true)}
                    className={`flex flex-col items-start rounded-xl border p-3 text-start transition ${
                      isPublic
                        ? "border-emerald-400 bg-emerald-400/10"
                        : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    <span className={`text-sm font-medium ${isPublic ? "text-emerald-200" : "text-zinc-200"}`}>
                      {t("donorStep.publicLabel")}
                    </span>
                    <span className="mt-0.5 text-xs text-zinc-500">{t("donorStep.publicHint")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublic(false)}
                    className={`flex flex-col items-start rounded-xl border p-3 text-start transition ${
                      !isPublic
                        ? "border-emerald-400 bg-emerald-400/10"
                        : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    <span className={`text-sm font-medium ${!isPublic ? "text-emerald-200" : "text-zinc-200"}`}>
                      {t("donorStep.anonymousLabel")}
                    </span>
                    <span className="mt-0.5 text-xs text-zinc-500">{t("donorStep.anonymousHint")}</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm">
                <p className="font-medium text-zinc-200">{t("donorStep.paymentNote")}</p>
                <p className="mt-1 text-zinc-400">{t("donorStep.paymentNoteBody")}</p>
                <Link href="/how-to-donate" className="mt-2 inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
                  {t("donorStep.howToLink")} →
                </Link>
              </div>
            </section>
          )}

          {(phase === "form" || phase === "submitting") && step === "confirm" && (
            <section className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">{t("confirmStep.heading")}</h2>
              <dl className="divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-950 text-sm">
                <Row label={t("confirmStep.amount")} value={`$${amount}`} />
                <Row label={t("confirmStep.method")} value="USDT · Tron (TRC-20)" />
                <Row label={t("confirmStep.name")} value={displayName} />
                <Row label={t("confirmStep.project")} value={projectTitle} />
              </dl>
              <p className="text-sm text-zinc-400">{t("confirmStep.redirectNote")}</p>
            </section>
          )}

          {phase === "success" && (
            <section className="flex flex-col items-start gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-2xl text-emerald-300">
                ✓
              </div>
              <h2 className="text-xl font-semibold">{t("success.heading")}</h2>
              <p className="text-zinc-400">
                {t("success.body", { amount: amount ?? 0, project: projectTitle })}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-medium text-zinc-950 hover:bg-emerald-300"
                >
                  {t("success.share")}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-6 text-sm font-medium hover:bg-zinc-800"
                >
                  {t("success.close")}
                </button>
              </div>
            </section>
          )}

          {phase === "failure" && (
            <section className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold text-rose-300">{t("failure.heading")}</h2>
              <p className="text-zinc-400">{t("failure.bodyCrypto")}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setPhase("form"); setStep("confirm"); }}
                  className="inline-flex h-11 items-center rounded-full border border-zinc-700 px-5 text-sm hover:bg-zinc-800"
                >
                  {t("failure.cancel")}
                </button>
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex h-11 items-center rounded-full bg-emerald-400 px-5 text-sm font-medium text-zinc-950 hover:bg-emerald-300"
                >
                  {t("failure.retry")}
                </button>
              </div>
            </section>
          )}
        </div>

        {phase === "form" && (
          <footer className="sticky bottom-0 border-t border-zinc-800 bg-zinc-900 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              {step !== "amount" ? (
                <button
                  type="button"
                  onClick={back}
                  className="rounded-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  {t("back")}
                </button>
              ) : (
                <span />
              )}
              {step !== "confirm" ? (
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={next}
                  className="inline-flex h-11 items-center rounded-full bg-emerald-400 px-6 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("amountStep.next")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex h-11 items-center rounded-full bg-emerald-400 px-6 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300"
                >
                  {t("confirmStep.submit")}
                </button>
              )}
            </div>
          </footer>
        )}

        {phase === "submitting" && (
          <footer className="sticky bottom-0 border-t border-zinc-800 bg-zinc-900 px-5 py-4">
            <div className="flex items-center justify-end">
              <button
                disabled
                className="inline-flex h-11 items-center rounded-full bg-emerald-400/60 px-6 text-sm font-medium text-zinc-950"
              >
                {t("confirmStep.submitting")}
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number | undefined | null }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <dt className="text-zinc-400">{label}</dt>
      <dd className="font-medium text-zinc-100">{value}</dd>
    </div>
  );
}
