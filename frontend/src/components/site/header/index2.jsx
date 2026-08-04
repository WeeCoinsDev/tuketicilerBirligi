import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNavbar } from "@/components/site/navbar";
import { HeaderBrand } from "./brand";
import { MobileNavDrawer } from "./mobile-nav";
import { SiteSearch } from "./search";
import { HeaderChrome2 } from "./header-chrome2";

/**
 * Public site header used by the current marketing layout.
 */
export async function Header2({ settings }) {
  const t = await getTranslations("Header");

  return (
    <header className="contents">
      <HeaderChrome2>
        <div className="grid min-h-17.5 grid-cols-[1fr_auto] items-stretch gap-6 md:min-h-20 xl:grid-cols-[1fr_auto_1fr] xl:gap-10">
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
