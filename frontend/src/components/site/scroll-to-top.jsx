"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 480;

export function ScrollToTop() {
  const t = useTranslations("Footer");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      aria-hidden={!visible}
      aria-label={t("backToTop")}
      className={cn(
        "focus-ring fixed right-5 bottom-5 z-40 inline-flex size-11 items-center justify-center rounded-full bg-ink text-white shadow-[0_14px_32px_rgba(22,32,51,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-ink/90 sm:right-8 sm:bottom-8 sm:size-12",
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      <ArrowUp aria-hidden="true" className="size-4" strokeWidth={1.75} />
    </button>
  );
}
