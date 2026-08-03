import { Suspense } from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { MobileNavDrawer } from "@/components/site/mobile-nav-drawer";
import { SiteSearch } from "@/components/site/site-search";
import { publicNavigation } from "@/lib/navigation";

function XIcon({ className }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function socialItems(settings) {
  const links = settings.socialLinks || {};

  return [
    { href: links.facebook || null, label: "Facebook", icon: Facebook },
    { href: links.x || null, label: "X", icon: XIcon },
    { href: links.instagram || null, label: "Instagram", icon: Instagram },
    { href: links.youtube || null, label: "YouTube", icon: Youtube },
  ];
}

function SocialLink({ href, label, icon: Icon }) {
  const className =
    "focus-ring inline-flex cursor-pointer items-center justify-center p-1 text-white/55 transition-colors duration-200 hover:text-white";

  const icon = <Icon aria-hidden="true" className="size-3.5" size={14} strokeWidth={1.75} />;

  if (!href) {
    return (
      <span aria-label={label} className={className} title={label}>
        {icon}
      </span>
    );
  }

  return (
    <a aria-label={label} className={className} href={href} rel="noreferrer" target="_blank">
      {icon}
    </a>
  );
}

export async function Header({ settings }) {
  const t = await getTranslations("Header");
  const tNav = await getTranslations("Nav");
  const socials = socialItems(settings);

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-ink text-white">
        <div className="container-shell flex min-h-9 items-center justify-end gap-4 py-1.5">
          <div className="flex items-center gap-3">
            {socials.map((item) => (
              <SocialLink href={item.href} icon={item.icon} key={item.label} label={item.label} />
            ))}
          </div>

          <span aria-hidden="true" className="h-3 w-px bg-white/20" />

          <Suspense fallback={<div className="h-4 w-12" />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="container-shell flex min-h-[76px] items-center justify-between gap-4 py-3">
          <Link className="focus-ring flex min-w-0 items-center gap-3 rounded-[8px]" href="/">
            <Image alt="" className="size-12 shrink-0 rounded-[14px] object-contain" height={48} priority src="/logo.svg" width={48} />
            <span className="grid min-w-0">
              <span className="truncate text-base font-bold leading-tight tracking-tight text-ink md:text-lg">{settings.shortName}</span>
              <span className="truncate text-xs font-medium text-muted">{t("tagline")}</span>
            </span>
          </Link>

          <nav aria-label={t("mainNav")} className="hidden items-center gap-0.5 xl:flex">
            {publicNavigation.map((item) => (
              <Link className="focus-ring rounded-xl px-3 py-2 text-sm font-medium text-ink transition hover:bg-primary-soft hover:text-primary-dark" href={item.href} key={item.href}>
                {tNav(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <SiteSearch />
            </div>

            <Link
              className="focus-ring hidden rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-ink shadow-soft transition hover:bg-secondary-dark hover:text-white md:inline-flex"
              href="/basvuru-rehberi"
            >
              {t("cta")}
            </Link>

            <MobileNavDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
