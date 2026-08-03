"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function LocaleFlagButton({ active, alt, flagSrc, label, onClick }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            aria-current={active ? "true" : undefined}
            className={cn("inline-flex items-center rounded-sm transition hover:opacity-100 border-0 outline-none ring-0", active ? "opacity-100" : "opacity-70")}
            onClick={onClick}
          />
        }
      >
        <Image alt={alt} className="h-[14px] w-[20px] object-cover" height={14} src={flagSrc} width={20} />
      </TooltipTrigger>
      <TooltipContent className="rounded-full bg-white text-black">{label}</TooltipContent>
    </Tooltip>
  );
}

export function LanguageSwitcher({ className }) {
  const t = useTranslations("LanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const query = Object.fromEntries(searchParams.entries());

  function switchLocale(nextLocale) {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace({ pathname, query }, { locale: nextLocale, scroll: false });
    });
  }

  return (
    <TooltipProvider>
      <div aria-label={t("label")} className={cn("flex h-4 items-center gap-2.5", isPending && "opacity-70", className)}>
        <LocaleFlagButton active={locale === "tr"} alt={t("turkish")} flagSrc="https://flagcdn.com/24x18/tr.png" label={t("turkish")} onClick={() => switchLocale("tr")} />
        <span aria-hidden="true" className="h-full w-px bg-white/40" />
        <LocaleFlagButton active={locale === "en"} alt={t("english")} flagSrc="https://flagcdn.com/24x18/us.png" label={t("english")} onClick={() => switchLocale("en")} />
      </div>
    </TooltipProvider>
  );
}
