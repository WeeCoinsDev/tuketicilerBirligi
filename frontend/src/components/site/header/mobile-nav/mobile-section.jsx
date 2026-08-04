"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { findActiveNavTrail } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MobileLink } from "./mobile-link";

export function MobileSection({ entry }) {
  const pathname = usePathname();
  const trail = useMemo(() => findActiveNavTrail(undefined, pathname), [pathname]);
  const isTopActive = trail?.topItem === entry.item;
  const [open, setOpen] = useState(isTopActive);
  const hasDropdown = Array.isArray(entry.links) && entry.links.length > 0;

  if (!hasDropdown) {
    return (
      <MobileLink
        href={entry.href}
        className={cn(
          "focus-ring rounded-[8px] px-3 py-3 font-sans text-sm font-semibold text-ink transition hover:bg-ink/4.5",
          isTopActive && "text-secondary-dark"
        )}
      >
        {entry.item}
      </MobileLink>
    );
  }

  return (
    <div className="rounded-[8px] border border-line">
      <button
        type="button"
        className={cn(
          "focus-ring flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-3 text-left font-sans text-sm font-semibold text-ink",
          isTopActive && "text-secondary-dark"
        )}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {entry.item}
        <ChevronDown aria-hidden="true" className={cn("size-4 text-muted transition", open && "rotate-180", isTopActive && "text-secondary-dark")} />
      </button>

      {open ? (
        <div className="border-t border-line px-2 py-2">
          {entry.links.map((link) => {
            const isLinkActive = isTopActive && trail?.linkLabel === link.label;

            return (
              <div key={link.label} className="mb-1 last:mb-0">
                <MobileLink
                  href={link.href}
                  className={cn(
                    "focus-ring block rounded-lg px-3 py-2 font-sans text-sm text-ink transition hover:bg-ink/4.5",
                    isLinkActive && "text-secondary-dark"
                  )}
                >
                  {link.label}
                </MobileLink>

                {link.submenu?.length ? (
                  <div className="ml-3 border-l border-line pl-2">
                    {link.submenu.map((sub) => {
                      const isSubActive = isLinkActive && trail?.subLabel === sub.label;

                      return (
                        <MobileLink
                          key={sub.label}
                          href={sub.href}
                          className={cn(
                            "focus-ring block rounded-lg px-3 py-1.5 font-sans text-xs text-muted transition hover:bg-ink/4.5 hover:text-ink",
                            isSubActive && "text-secondary-dark"
                          )}
                        >
                          {sub.label}
                        </MobileLink>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
