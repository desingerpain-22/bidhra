"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { faqCategories } from "@/lib/faq";

function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s)]+)/g).map((chunk, i) =>
    chunk.startsWith("http") ? (
      <a
        key={i}
        href={chunk}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-1 underline-offset-2 hover:text-accent"
      >
        {chunk}
      </a>
    ) : (
      chunk
    ),
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const started = messages.length > 0;
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, started]);

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    // Rendered as a child of <body>; wrapped so the `fixed` children below
    // aren't direct children of body, which globals.css forces to
    // `position: relative` via an unlayered `body > *` rule.
    <div>
      {open && (
        <div className="fixed right-4 bottom-24 z-50 flex h-[32rem] max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:right-6">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              <span className="text-sm font-semibold text-foreground">
                Ask Bidhra
              </span>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <CloseIcon />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-4"
          >
            {!started ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Ask anything about Bidhra, or start with a common question
                  below.
                </p>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Common questions
                  </h3>
                  {faqCategories.map((category) => {
                    const isOpen = openCategory === category.id;
                    return (
                      <div
                        key={category.id}
                        className="overflow-hidden rounded-xl border border-border bg-muted/30"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenCategory(isOpen ? null : category.id)
                          }
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              {category.title}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {category.entries.length} questions
                            </span>
                          </span>
                          <ChevronIcon
                            className={
                              "h-4 w-4 shrink-0 text-muted-foreground transition-transform " +
                              (isOpen ? "rotate-180" : "")
                            }
                          />
                        </button>
                        {isOpen && (
                          <div className="flex flex-col divide-y divide-border border-t border-border">
                            {category.entries.map((entry) => (
                              <button
                                key={entry.question}
                                type="button"
                                onClick={() => ask(entry.question)}
                                className="px-4 py-3 text-start text-sm text-foreground transition hover:bg-muted/50 hover:text-accent"
                              >
                                {entry.question}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap " +
                      (message.role === "user"
                        ? "self-end bg-primary text-primary-foreground"
                        : "self-start bg-muted text-foreground")
                    }
                  >
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <span key={i}>{linkify(part.text)}</span>
                      ) : null,
                    )}
                  </div>
                ))}
                {busy && messages[messages.length - 1]?.role === "user" && (
                  <div className="self-start rounded-2xl bg-muted px-4 py-2 text-sm text-muted-foreground">
                    Typing…
                  </div>
                )}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              disabled={busy}
              className="h-11 flex-1 rounded-full border border-border bg-muted/30 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:opacity-90 sm:right-6"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}

function ChatIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

function CloseIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SendIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}
