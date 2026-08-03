"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileLink } from "./mobile-link";

export function MobileSection({ entry }) {
  const [open, setOpen] = useState(false);
  const hasDropdown = Array.isArray(entry.links) && entry.links.length > 0;

  if (!hasDropdown) {
    return (
      <MobileLink
        href={entry.href}
        className="focus-ring rounded-[8px] px-3 py-3 font-heading text-sm font-semibold text-ink transition hover:bg-primary-soft hover:text-primary-dark"
      >
        {entry.item}
      </MobileLink>
    );
  }

  return (
    <div className="rounded-[8px] border border-line">
      <button
        type="button"
        className="focus-ring flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-3 text-left font-heading text-sm font-semibold text-ink"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {entry.item}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 text-muted transition", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="border-t border-line px-2 py-2">
          {entry.links.map((link) => (
            <div key={link.label} className="mb-1 last:mb-0">
              <MobileLink
                href={link.href}
                className="focus-ring block rounded-lg px-3 py-2 font-sans text-sm text-ink transition hover:bg-primary-soft"
              >
                {link.label}
              </MobileLink>

              {link.submenu?.length ? (
                <div className="ml-3 border-l border-line pl-2">
                  {link.submenu.map((sub) => (
                    <MobileLink
                      key={sub.label}
                      href={sub.href}
                      className="focus-ring block rounded-lg px-3 py-1.5 font-sans text-xs text-muted transition hover:bg-primary-soft hover:text-ink"
                    >
                      {sub.label}
                    </MobileLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
