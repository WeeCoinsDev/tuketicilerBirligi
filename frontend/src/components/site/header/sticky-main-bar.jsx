"use client";

import { motion } from "motion/react";

/**
 * White main header bar — sticky on its own so the ink top bar can scroll away.
 * Sticky stays on a plain div (Motion transform would break it).
 * layoutRoot wraps children so layoutId hovers stay stable while scrolling.
 */
export function StickyMainBar({ children }) {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-xs backdrop-blur-sm">
      <motion.div layoutRoot>{children}</motion.div>
    </div>
  );
}
