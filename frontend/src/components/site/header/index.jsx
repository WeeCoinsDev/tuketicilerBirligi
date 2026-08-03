import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNavbar } from "@/components/site/navbar";
import { HeaderBrand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNavDrawer } from "./mobile-nav";
import { SiteSearch } from "./search";
import { SocialLinks } from "./social-links";
import { StickyMainBar } from "./sticky-main-bar";

export async function Header({ settings }) {
  const t = await getTranslations("Header");

  return (
    <header className="contents">
      <div className="gridContainer bg-ink text-white">
        <div className="flex min-h-9 items-center justify-end gap-4 py-1.5">
          <SocialLinks settings={settings} />
          <span aria-hidden="true" className="h-3 w-px bg-white/20" />
          <Suspense fallback={<div className="h-4 w-12" />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>

      <StickyMainBar>
        <div className="gridContainer">
          <div className="flex min-h-[76px] items-center justify-between gap-4 py-3">
            <HeaderBrand shortName={settings.shortName} tagline={t("tagline")} />
            <div className="hidden min-w-0 flex-1 justify-center xl:flex">
              <SiteNavbar />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <SiteSearch />
              </div>

              <Link
                className="focus-ring hidden rounded-full bg-secondary px-4 py-2 font-heading text-sm font-semibold text-ink shadow-soft transition hover:bg-secondary-dark hover:text-white md:inline-flex"
                href="/basvuru-rehberi"
              >
                {t("cta")}
              </Link>

              <MobileNavDrawer />
            </div>
          </div>
        </div>
      </StickyMainBar>
    </header>
  );
}
