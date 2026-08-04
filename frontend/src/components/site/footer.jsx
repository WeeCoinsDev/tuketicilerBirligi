import { Suspense } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/site/header/language-switcher";
import { SocialLinks } from "@/components/site/header/social-links";
import { footerLegalLinks, getFooterColumns } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isPlaceholderHref(href) {
  return !href || href === "#";
}

function FooterLink({ href, children, className }) {
  const styles = cn("rounded-[4px] text-sm leading-6 text-ink/70 transition-colors duration-200 hover:text-secondary", className);

  if (isPlaceholderHref(href)) {
    return (
      <span aria-disabled="true" className={cn(styles, "cursor-default text-ink/40")}>
        {children}
      </span>
    );
  }

  return (
    <Link className={cn("focus-ring cursor-pointer", styles)} href={href}>
      {children}
    </Link>
  );
}

function FooterColumn({ title, href, links }) {
  return (
    <div>
      <h3 className="font-heading text-[13px] font-bold tracking-tight text-ink">
        {isPlaceholderHref(href) ? (
          title
        ) : (
          <Link className="focus-ring cursor-pointer rounded-[4px] transition-colors hover:text-secondary" href={href}>
            {title}
          </Link>
        )}
      </h3>
      <ul className="mt-3 grid gap-1.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn({ title, settings }) {
  return (
    <div>
      <h3 className="font-heading text-[13px] font-bold tracking-tight text-ink">{title}</h3>
      <ul className="mt-3 grid gap-3 text-sm leading-6 text-ink/70">
        <li className="flex gap-2.5">
          <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary" />
          <span>{settings.address}</span>
        </li>
        <li className="flex gap-2.5">
          <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary" />
          <span>{settings.phone}</span>
        </li>
        <li className="flex gap-2.5">
          <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary" />
          <a className="focus-ring cursor-pointer rounded-[4px] transition-colors hover:text-secondary" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>
        </li>
      </ul>
      <div className="mt-3">
        <FooterLink href="/iletisim">{title}</FooterLink>
      </div>
    </div>
  );
}

export async function Footer({ settings }) {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();
  const orgName = settings.organizationName || settings.shortName;

  const legalLinks = footerLegalLinks.map((link) => {
    if (link.href === "/gizlilik") return { ...link, label: t("privacy") };
    if (link.href === "/aydinlatma-metni") return { ...link, label: t("disclosure") };
    if (link.href === "/sss") return { ...link, label: t("faq") };
    return link;
  });

  const columns = [...getFooterColumns(), { title: t("legal"), href: null, links: legalLinks }];

  return (
    <footer className="border-t border-line bg-surface text-ink">
      <div className="gridContainer">
        <nav aria-label={t("navLabel")} className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 xl:gap-x-5">
            {columns.map((column) => (
              <FooterColumn href={column.href} key={column.title} links={column.links} title={column.title} />
            ))}
            <ContactColumn settings={settings} title={t("contact")} />
          </div>
        </nav>
      </div>

      <div className="gridContainer border-t border-line">
        <div className="flex flex-col items-center gap-8 py-12 md:gap-10 md:py-16 lg:py-20">
          <Link aria-label={t("brandHome")} className="focus-ring group flex max-w-full flex-col items-center gap-4 rounded-2xl px-2 sm:flex-row sm:gap-5" href="/">
            <Image
              alt=""
              className="size-16 shrink-0 object-contain transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] sm:size-20 md:size-24 lg:size-28"
              height={112}
              src="/logo.svg"
              width={112}
            />
            <span className="max-w-[14ch] text-center font-heading text-[clamp(2rem,7.5vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-secondary transition-colors duration-300 group-hover:text-secondary-dark sm:max-w-none sm:text-left">
              {settings.shortName || orgName}
            </span>
          </Link>

          <p className="max-w-2xl text-center text-xs leading-relaxed text-muted md:text-[13px]">
            <span>
              © {year} {orgName}. {t("rights")}
            </span>
            {settings.description ? <span className="mt-1 block line-clamp-2 text-muted/80">{settings.description}</span> : null}
          </p>

          <div aria-label={t("socialLabel")}>
            <SocialLinks className="gap-4" iconClassName="size-5" settings={settings} tone="dark" />
          </div>
        </div>
      </div>

      <div className="gridContainer border-t border-line">
        <div className="flex flex-col items-center justify-between gap-4 py-4 text-xs text-muted sm:flex-row sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <FooterLink className="text-xs" href="/gizlilik">
              {t("privacy")}
            </FooterLink>
            <FooterLink className="text-xs" href="/aydinlatma-metni">
              {t("disclosure")}
            </FooterLink>
          </div>

          <Suspense fallback={<div aria-hidden="true" className="h-4 w-12" />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>
    </footer>
  );
}
