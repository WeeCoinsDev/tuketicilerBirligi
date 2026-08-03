"use client";

import { motion } from "motion/react";

export function StickyMainBar({ children }) {
  return (
    <div className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur-sm">
      <motion.div layoutRoot>{children}</motion.div>
    </div>
  );
}
