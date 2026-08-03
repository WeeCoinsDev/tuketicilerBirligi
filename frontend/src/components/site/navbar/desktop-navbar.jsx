"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HoveredLink,
  Menu,
  MenuItem,
  NestedHoveredLink
} from "./menu";

/**
 * Data-driven desktop navbar built on menu primitives.
 */
export function DesktopNavbar({
  items = [],
  linkComponent,
  className,
  menuClassName,
  itemClassName,
  dropdownClassName,
  dropdownPanelClassName,
  linkClassName,
  nestedLinkClassName,
  submenuClassName
}) {
  const [active, setActive] = useState(null);

  return (
    <nav
      aria-label="Ana menü"
      className={cn(
        "flex w-full items-center font-sans text-sm font-medium text-nowrap text-ink",
        className
      )}
    >
      <Menu
        setActive={setActive}
        linkComponent={linkComponent}
        className={cn("gap-1 md:gap-1.5 xl:gap-2", menuClassName)}
      >
        {items.map((entry) => {
          const hasDropdown = Array.isArray(entry.links) && entry.links.length > 0;

          return (
            <MenuItem
              key={entry.item}
              setActive={setActive}
              active={active}
              item={entry.item}
              href={entry.href}
              hasDropdown={hasDropdown}
              className={cn("cursor-pointer", itemClassName)}
              dropdownClassName={dropdownClassName}
              dropdownPanelClassName={dropdownPanelClassName}
            >
              {hasDropdown ? (
                <div className="flex flex-col py-1.5 font-sans text-sm">
                  {entry.links.map((link, idx) => {
                    if (link.submenu?.length) {
                      return (
                        <NestedHoveredLink
                          key={`${link.label}-${idx}`}
                          href={link.href}
                          className={nestedLinkClassName}
                          submenuClassName={submenuClassName}
                          submenu={
                            <>
                              {link.submenu.map((sub, sidx) => (
                                <HoveredLink
                                  key={`${sub.label}-${sidx}`}
                                  href={sub.href}
                                  highlightId="submenu-hover"
                                  className={linkClassName}
                                >
                                  {sub.label}
                                </HoveredLink>
                              ))}
                            </>
                          }
                        >
                          {link.label}
                        </NestedHoveredLink>
                      );
                    }

                    return (
                      <HoveredLink
                        key={`${link.label}-${idx}`}
                        href={link.href}
                        className={linkClassName}
                      >
                        {link.label}
                      </HoveredLink>
                    );
                  })}
                </div>
              ) : null}
            </MenuItem>
          );
        })}
      </Menu>
    </nav>
  );
}
