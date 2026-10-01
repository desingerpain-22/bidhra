"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 2500;

// Cycles through `words` like a small vertical carousel: the current word
// floats up and out while the next rises into place beneath it (the motion
// itself lives in globals.css). Every word is stacked in the same grid cell,
// so the slot is always as wide as the longest one and the line never
// shifts. With reduced motion the rotation is off and CSS shows the
// `fallbackIndex` word instead.
export function RotatingWord({
  words,
  fallbackIndex,
  suffix = "",
}: {
  words: string[];
  fallbackIndex: number;
  /** Trailing punctuation kept attached to each word, e.g. ".". */
  suffix?: string;
}) {
  const [index, setIndex] = useState(0);
  // Until the first change the opening word simply rests, and nothing is
  // "leaving" yet, so the page doesn't load mid-animation.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setStarted(true);
      setIndex((current) => (current + 1) % words.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [words.length]);

  const previous = (index - 1 + words.length) % words.length;

  const stateOf = (i: number) => {
    if (i === index) return started ? "entering" : "resting";
    if (started && i === previous) return "leaving";
    return "waiting";
  };

  return (
    <span className="rotating-word">
      {words.map((word, i) => (
        <span
          key={word}
          className="rotating-word-item"
          data-state={stateOf(i)}
          data-fallback={i === fallbackIndex ? "" : undefined}
        >
          {word}
          {suffix}
        </span>
      ))}
    </span>
  );
}
