"use client";

import { useEffect, useRef, useState } from "react";

type FeasibilityStudyProps = {
  sections: string[][];
};

export function FeasibilityStudy({ sections }: FeasibilityStudyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveIndex(Number(visible.target.dataset.studyIndex ?? 0));
        }
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );

    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, [sections.length]);

  return (
    <section
      className="border-t px-4 py-16 sm:px-12 sm:py-32"
      style={{ borderColor: "var(--line)", background: "var(--bg)" }}
      lang="en"
      dir="ltr"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-20">
        <header className="xl:sticky xl:top-28 xl:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            Project 001
          </p>
          <h2 className="mt-5 max-w-sm text-5xl font-semibold leading-[0.95] text-foreground sm:text-6xl xl:text-7xl">
            Feasibility Study
          </h2>
          <div
            className="mt-10 hidden border-t pt-5 xl:block"
            style={{ borderColor: "var(--line)" }}
          >
            {sections.map((section, sectionIndex) => (
              <button
                key={section[0]}
                type="button"
                onClick={() => {
                  setActiveIndex(sectionIndex);
                  itemRefs.current[sectionIndex]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b py-3 text-start font-mono text-[10px] uppercase leading-[1.5] tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                style={{ borderColor: "var(--line)" }}
                aria-expanded={activeIndex === sectionIndex}
              >
                <span className="text-accent">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                <span>{section[0]}</span>
                <span
                  className={
                    "text-accent transition-transform duration-300 " +
                    (activeIndex === sectionIndex ? "rotate-180" : "")
                  }
                  aria-hidden
                >
                  ↓
                </span>
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col">
          {sections.map((section, sectionIndex) => {
            const isOpen = activeIndex === sectionIndex;

            return (
              <article
                key={section[0]}
                ref={(node) => {
                  itemRefs.current[sectionIndex] = node;
                }}
                data-study-index={sectionIndex}
                className="border-t py-5 sm:py-6"
                style={{ borderColor: "var(--line)" }}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(sectionIndex)}
                  className="grid w-full grid-cols-[1fr_auto] gap-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span
                    className={
                      "grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] md:gap-12 " +
                      (sectionIndex === 0 ? "md:grid-cols-1" : "")
                    }
                  >
                    <span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          "mt-3 block font-semibold leading-[1.05] text-foreground " +
                          (sectionIndex === 0
                            ? "max-w-2xl text-[clamp(2rem,5vw,4rem)]"
                            : "text-2xl sm:text-3xl")
                        }
                      >
                        {section[0]}
                      </span>
                    </span>
                  </span>
                  <span
                    className={
                      "mt-2 inline-flex h-10 w-10 items-center justify-center border font-mono text-xl text-accent transition-transform duration-300 " +
                      (isOpen ? "rotate-180" : "")
                    }
                    style={{ borderColor: "var(--line)" }}
                    aria-hidden
                  >
                    ↓
                  </span>
                </button>

                <div
                  className={
                    "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out " +
                    (isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="min-h-0">
                    <div
                      className={
                        "pt-8 " +
                        (sectionIndex === 0
                          ? "max-w-3xl"
                          : "grid grid-cols-1 gap-x-10 gap-y-3 md:ms-[calc(28.571428%+3rem)] 2xl:grid-cols-2")
                      }
                    >
                      {section.slice(1).map((line, lineIndex) => {
                        const isSubhead = /^[0-9]+\./.test(line);

                        return isSubhead ? (
                          <h4
                            key={`${sectionIndex}-${lineIndex}`}
                            className="mt-5 border-t pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent first:mt-0 2xl:col-span-2"
                            style={{ borderColor: "var(--line)" }}
                          >
                            {line}
                          </h4>
                        ) : sectionIndex > 0 && sectionIndex < 6 ? (
                          <p
                            key={`${sectionIndex}-${lineIndex}`}
                            className="grid grid-cols-[auto_1fr] gap-3 text-base font-light leading-[1.7] text-foreground sm:text-lg"
                          >
                            <span
                              className="mt-3 h-1.5 w-1.5 rounded-full bg-accent"
                              aria-hidden
                            />
                            <span>{line}</span>
                          </p>
                        ) : (
                          <p
                            key={`${sectionIndex}-${lineIndex}`}
                            className={
                              "text-base font-light leading-[1.7] text-foreground sm:text-lg " +
                              (sectionIndex === 0
                                ? "text-xl leading-[1.55] sm:text-2xl"
                                : "")
                            }
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
