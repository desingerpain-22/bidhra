"use client";

import { useEffect, useRef, useState } from "react";

const DISMISSED_KEY = "bidhra:donation-toast-dismissed";
const INITIAL_DELAY_MS = 3000;
const VISIBLE_MS = 4500;
const GAP_MS = 1800;

export function DonationToast({
  donations,
}: {
  donations: { displayName: string; amount: number }[];
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (donations.length === 0) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) {
      dismissedRef.current = true;
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (dismissedRef.current) return;
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % donations.length);
          showNext();
        }, GAP_MS);
      }, VISIBLE_MS);
    };

    timer = setTimeout(showNext, INITIAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [donations.length]);

  function dismiss() {
    dismissedRef.current = true;
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  }

  if (donations.length === 0 || !visible) return null;

  const donation = donations[index];

  return (
    <div className="fixed bottom-20 left-4 z-40 flex max-w-[16rem] items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 shadow-2xl sm:bottom-24 sm:left-6">
      <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
      <p className="text-sm text-foreground">
        <span className="font-semibold">{donation.displayName}</span> donated $
        {donation.amount.toLocaleString()}
      </p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        className="-me-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
