"use client";

import { useState } from "react";
import { Search } from "lucide-react";
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

export function SiteSearch() {
  const t = useTranslations("Search");
  const tNav = useTranslations("Nav");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function goTo(href) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        aria-label={t("trigger")}
        className="focus-ring inline-flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-primary-soft hover:text-primary-dark"
        type="button"
        onClick={() => setOpen(true)}
      >
        <Search size={18} aria-hidden="true" />
      </button>

      <CommandDialog
        description={t("placeholder")}
        open={open}
        title={t("title")}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder={t("placeholder")} />
        <CommandList>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          <CommandGroup heading={t("pages")}>
            {publicNavigation.map((item) => (
              <CommandItem
                key={item.href}
                value={tNav(item.key)}
                onSelect={() => goTo(item.href)}
              >
                {tNav(item.key)}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
