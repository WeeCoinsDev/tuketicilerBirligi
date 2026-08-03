"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { hoverTransition } from "./shared";

/**
 * Shared sliding highlight for nav / dropdown rows.
 * One visible instance per layoutId at a time → Motion morphs between them.
 */
export function HoverHighlight({ layoutId, className }) {
  return (
    <motion.span
      layoutId={layoutId}
      className={cn("pointer-events-none absolute inset-0 -z-10 rounded-md bg-ink/[0.045]", className)}
      transition={hoverTransition}
    />
  );
}
