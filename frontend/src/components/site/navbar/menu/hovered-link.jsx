"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HoverHighlight } from "./hover-highlight";
import { NavAnchor } from "./shared";

/**
 * Simple link inside a dropdown.
 */
export function HoveredLink({ children, className, href, highlightId = "dropdown-hover", ...rest }) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavAnchor
      href={href}
      {...rest}
      className={cn("relative z-0 block px-3.5 py-2 text-nowrap transition-colors duration-200", hovered ? "text-ink" : "text-ink/80", className)}
      onMouseEnter={(event) => {
        setHovered(true);
        rest.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        rest.onMouseLeave?.(event);
      }}
    >
      {hovered ? <HoverHighlight layoutId={highlightId} className="rounded-md" /> : null}
      <span className="relative">{children}</span>
    </NavAnchor>
  );
}
