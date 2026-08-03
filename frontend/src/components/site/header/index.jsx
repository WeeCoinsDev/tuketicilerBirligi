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
      {/* <div className="gridContainer  bg-white text-ink">
        <div className="flex min-h-9 items-center justify-end gap-4 py-1.5">
          <SocialLinks settings={settings} />
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <Suspense fallback={<div className="h-4 w-12" />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div> */}

      <StickyMainBar>
        <div className="gridContainer">
          <div className="grid min-h-[76px] grid-cols-[1fr_auto] items-center gap-4 py-3 xl:grid-cols-[1fr_auto_1fr]">
            <HeaderBrand shortName={settings.shortName} tagline={t("tagline")} />

            <div className="hidden justify-self-center xl:block">
              <SiteNavbar />
            </div>

            <div className="flex items-center justify-self-end gap-2">
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
