"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

type RevealAs = "div" | "section" | "article" | "header" | "li" | "ul" | "ol";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  amount?: number;
  as?: RevealAs;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  amount = 24,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const axis: Record<Direction, string> = {
    up: `translate3d(0, ${amount}px, 0)`,
    down: `translate3d(0, -${amount}px, 0)`,
    left: `translate3d(${amount}px, 0, 0)`,
    right: `translate3d(-${amount}px, 0, 0)`,
    fade: "translate3d(0, 0, 0)",
  };

  const style: CSSProperties & Record<string, string> = {
    transitionDelay: `${delay}ms`,
    "--reveal-from": axis[direction],
  };

  return createElement(
    as,
    {
      ref,
      "data-reveal": visible ? "visible" : "hidden",
      className,
      style,
    },
    children,
  );
}
