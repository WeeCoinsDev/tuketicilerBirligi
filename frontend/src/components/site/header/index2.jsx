import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNavbar } from "@/components/site/navbar";
import CornerShape from "@/components/common/cornerShape";
import { HeaderBrand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNavDrawer } from "./mobile-nav";
import { SiteSearch } from "./search";
import { SocialLinks } from "./social-links";
import { HeaderChrome2 } from "./header-chrome2";

/**
 * Design-v2 header: fixed over the hero, utility tab collapses on scroll.
 * Original Header remains untouched for rollback.
 */
export async function Header2({ settings }) {
  const t = await getTranslations("Header");

  return (
    <header className="contents">
      <HeaderChrome2
        utility={
          <>
            <SocialLinks settings={settings} tone="dark" />
            <span aria-hidden="true" className="h-3 w-px bg-ink/20" />
            <Suspense fallback={<div className="h-4 w-12" />}>
              <LanguageSwitcher />
            </Suspense>
          </>
        }
      >
        <div className="grid min-h-[70px] grid-cols-[1fr_auto] items-stretch gap-6 md:min-h-[80px] xl:grid-cols-[1fr_auto_1fr] xl:gap-10">
          <div className="flex items-center py-3 md:py-4">
            <HeaderBrand shortName={settings.shortName} tagline={t("tagline")} />
          </div>

          <div className="hidden h-full justify-self-center xl:block">
            <SiteNavbar />
          </div>

          <div className="flex w-full items-center justify-end gap-3 py-4 sm:gap-4 md:py-5">
            <div className="hidden sm:block">
              <SiteSearch />
            </div>

            <Link
              className="focus-ring hidden rounded-full bg-secondary px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-secondary-dark md:inline-flex"
              href="/basvuru-rehberi"
            >
              {t("cta")}
            </Link>
            <MobileNavDrawer />
          </div>
        </div>
      </HeaderChrome2>
    </header>
  );
}
