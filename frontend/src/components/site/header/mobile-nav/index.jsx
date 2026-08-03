"use client";

import { Menu as MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { navigationMenu } from "@/lib/navigation";
import { MobileSection } from "./mobile-section";

export function MobileNavDrawer() {
  const t = useTranslations("Header");

  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger aria-label={t("openMenu")} className="focus-ring inline-flex size-11 items-center justify-center rounded-[8px] border border-line bg-white text-ink xl:hidden">
        <MenuIcon size={20} aria-hidden="true" />
      </DrawerTrigger>

      <DrawerContent className="bg-white data-[swipe-direction=right]:w-[min(100%,20rem)]">
        <DrawerHeader className="border-b border-line text-left">
          <DrawerTitle className="font-heading text-ink">{t("mobileNav")}</DrawerTitle>
        </DrawerHeader>

        <nav aria-label={t("mobileNav")} className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
          {navigationMenu.map((entry) => (
            <MobileSection key={entry.item} entry={entry} />
          ))}
        </nav>

        <div className="grid gap-2 border-t border-line p-4">
          <DrawerClose
            render={
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-[8px] bg-secondary px-4 py-2 font-heading text-sm font-semibold text-ink transition hover:bg-secondary-dark hover:text-white"
                href="/basvuru-rehberi"
              />
            }
          >
            {t("cta")}
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
