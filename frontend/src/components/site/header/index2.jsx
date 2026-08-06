import { getTranslations } from "next-intl/server";
import { SiteNavbar } from "@/components/site/navbar";
import { ApplicationCta } from "@/components/site/application-form";
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
        <div className="grid min-h-16 grid-cols-[1fr_auto] items-stretch gap-3 sm:min-h-17.5 sm:gap-4 md:min-h-18 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-3 xl:min-h-20 xl:gap-5 2xl:gap-8">
          <div className="flex items-center py-2.5 sm:py-3 md:py-3.5 lg:py-3 xl:py-4">
            <HeaderBrand shortName={settings.shortName} tagline={t("tagline")} />
          </div>

          <div className="hidden h-full min-w-0 justify-self-center lg:block">
            <SiteNavbar />
          </div>

          <div className="flex w-full items-center justify-end gap-2 py-2.5 sm:gap-3 sm:py-3 md:gap-3.5 md:py-3.5 lg:gap-2.5 xl:gap-4 xl:py-4">
            <div className="hidden sm:block">
              <SiteSearch />
            </div>

            <div className="hidden md:block">
              <ApplicationCta />
            </div>
            <MobileNavDrawer settings={settings} />
          </div>
        </div>
      </HeaderChrome2>
    </header>
  );
}
