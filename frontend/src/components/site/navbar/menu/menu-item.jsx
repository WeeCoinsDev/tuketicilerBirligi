"use client";

import { useContext, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverHighlight } from "./hover-highlight";
import { MenuContext, MenuHoverContext, NavAnchor, isPlaceholderHref, transition } from "./shared";

/**
 * Top-level nav item. Renders a link or plain label, and optionally a dropdown.
 */
export function MenuItem({ setActive, active, item, href, hasDropdown, className, dropdownClassName, dropdownPanelClassName, children }) {
  const hoverCtx = useContext(MenuHoverContext);
  const [isHovered, setIsHovered] = useState(false);
  const showDropdown = active === item && Boolean(children);
  const showHighlight = isHovered || showDropdown;
  const triggerClassName = cn("relative z-0 inline-flex items-center gap-1 px-2.5 py-2 text-nowrap transition-colors duration-200 xl:px-3", showHighlight ? "text-ink" : "text-ink/80", className);

  const triggerContent = (
    <>
      {showHighlight ? <HoverHighlight layoutId="nav-item-hover" /> : null}
      <span className="relative">{item}</span>
      {hasDropdown ? <ChevronDown aria-hidden="true" className={cn("relative size-3.5 shrink-0 opacity-45 transition duration-200", showDropdown && "rotate-180 opacity-70")} /> : null}
    </>
  );

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {hasDropdown && isPlaceholderHref(href) ? (
        <button type="button" className={triggerClassName} onMouseEnter={() => setActive(item)}>
          {triggerContent}
        </button>
      ) : (
        <NavAnchor href={href || "#"} className={triggerClassName} onMouseEnter={() => setActive(item)}>
          {triggerContent}
        </NavAnchor>
      )}

      {showDropdown ? (
        <div
          className={cn("absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3", dropdownClassName)}
          onMouseEnter={() => hoverCtx?.registerHover?.()}
          onMouseLeave={() => hoverCtx?.unregisterHover?.()}
        >
          <motion.div
            layoutId="active"
            layoutScroll
            transition={transition}
            className={cn("relative w-max overflow-visible rounded-xl border border-line bg-white text-ink shadow-soft", dropdownPanelClassName)}
          >
            <MenuContext.Provider value={{ setActive, currentItem: item }}>{children}</MenuContext.Provider>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
