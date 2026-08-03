"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Building2,
  FileText,
  Home,
  Megaphone,
  Newspaper,
  Phone,
  Search
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { publicNavigation } from "@/lib/navigation";

const navIcons = {
  home: Home,
  corporate: Building2,
  guides: BookOpen,
  news: Newspaper,
  announcements: Megaphone,
  applicationGuide: FileText,
  contact: Phone
};

export function SiteSearch() {
  const t = useTranslations("Search");
  const tNav = useTranslations("Nav");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function goTo(href) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        aria-label={t("trigger")}
        className="focus-ring inline-flex h-10 items-center gap-2 px-1.5 text-ink/70 transition-colors hover:text-ink sm:pr-2"
        type="button"
        onClick={() => setOpen(true)}
      >
        <Search size={18} strokeWidth={1.75} aria-hidden="true" />
        <kbd className="pointer-events-none hidden font-sans text-[10px] font-medium tracking-wide text-muted sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        description={t("placeholder")}
        open={open}
        title={t("title")}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder={t("placeholder")} />
        <CommandList className="site-search-scroll">
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          <CommandGroup heading={t("pages")}>
            {publicNavigation.map((item) => {
              const Icon = navIcons[item.key] || FileText;

              return (
                <CommandItem
                  key={item.href}
                  value={tNav(item.key)}
                  onSelect={() => goTo(item.href)}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-[color] group-data-[selected=true]/command-item:text-ink"
                    strokeWidth={1.5}
                  />
                  <span className="flex-1">{tNav(item.key)}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
          <p className="font-sans text-[11px] text-muted">{t("hint")}</p>
          <div className="flex items-center gap-2.5 font-sans text-[11px] text-muted">
            <span className="inline-flex items-center gap-1">
              <kbd className="text-[10px] text-ink/50">↵</kbd>
              {t("open")}
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="text-[10px] text-ink/50">esc</kbd>
              {t("close")}
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
