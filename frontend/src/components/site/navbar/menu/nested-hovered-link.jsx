"use client";

import { useContext, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { HoverHighlight } from "./hover-highlight";
import { MenuContext, MenuHoverContext, NavAnchor, transition } from "./shared";

/**
 * Dropdown link that opens a nested (flyout) submenu on hover.
 */
export function NestedHoveredLink({
  children,
  className,
  submenu,
  submenuClassName,
  href,
  highlightId = "dropdown-hover",
  ...rest
}) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const menuCtx = useContext(MenuContext);
  const hoverCtx = useContext(MenuHoverContext);
  const { setActive: setMenuActive, currentItem } = menuCtx || {};
  const { registerHover, unregisterHover } = hoverCtx || {};

  const open = () => {
    registerHover?.();
    setShowSubmenu(true);
    setHovered(true);
    if (setMenuActive && currentItem) setMenuActive(currentItem);
  };

  const close = () => {
    setShowSubmenu(false);
    setHovered(false);
    unregisterHover?.();
  };

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <NavAnchor
        href={href}
        className={cn(
          "group relative z-0 flex items-center justify-between gap-3 px-3.5 py-2 text-nowrap transition-colors duration-200",
          hovered ? "text-ink" : "text-ink/80",
          className
        )}
        {...rest}
      >
        {hovered ? <HoverHighlight layoutId={highlightId} className="rounded-md" /> : null}
        <span className="relative">{children}</span>
        {submenu ? (
          <svg
            aria-hidden="true"
            className="relative h-3.5 w-3.5 shrink-0 text-muted/70 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : null}
      </NavAnchor>

      {submenu && showSubmenu ? (
        <div
          className="absolute top-0 left-full z-[60] min-w-48 pl-1"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <motion.div
            layoutScroll
            initial={{ x: 6 }}
            animate={{ x: 0 }}
            transition={transition}
            className={cn(
              "overflow-visible rounded-xl border border-line bg-white py-1 shadow-soft",
              submenuClassName
            )}
          >
            <div className="flex flex-col">
              {/* Submenu uses its own highlight id so it doesn’t fight the parent list. */}
              {submenu}
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
