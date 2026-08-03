"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { publicNavigation } from "@/lib/navigation";

export function MobileNavDrawer() {
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");

  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        aria-label={t("openMenu")}
        className="focus-ring inline-flex size-11 items-center justify-center rounded-[8px] border border-line bg-white text-ink lg:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </DrawerTrigger>

      <DrawerContent className="bg-white data-[swipe-direction=right]:w-[min(100%,20rem)]">
        <DrawerHeader className="border-b border-line text-left">
          <DrawerTitle className="text-ink">{t("mobileNav")}</DrawerTitle>
        </DrawerHeader>

        <nav aria-label={t("mobileNav")} className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {publicNavigation.map((item) => (
            <DrawerClose
              key={item.href}
              render={
                <Link
                  className="focus-ring rounded-[8px] px-3 py-3 text-sm font-semibold text-ink transition hover:bg-primary-soft hover:text-primary-dark"
                  href={item.href}
                />
              }
            >
              {tNav(item.key)}
            </DrawerClose>
          ))}
        </nav>

        <div className="grid gap-2 border-t border-line p-4">
          <DrawerClose
            render={
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-[8px] bg-secondary px-4 py-2 text-sm font-semibold text-ink transition hover:bg-secondary-dark hover:text-white"
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
