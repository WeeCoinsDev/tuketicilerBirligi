"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/**
 * Sticky header bar — publishes measured height as --site-header-height
 * so the hero pin/sheet math stays aligned on every viewport.
 */
export function StickyMainBar({ children }) {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function syncHeaderHeight() {
      const height = Math.ceil(bar.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--site-header-height", `${height}px`);
    }

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(bar);
    window.addEventListener("orientationchange", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", syncHeaderHeight);
    };
  }, []);

  return (
    <div ref={barRef} className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur-sm">
      <motion.div layoutRoot>{children}</motion.div>
    </div>
  );
}
