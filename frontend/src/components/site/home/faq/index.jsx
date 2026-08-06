import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqBrowser } from "@/components/site/faq/faq-browser";

export async function HomeFaq({ items = [] }) {
  const t = await getTranslations("HomeFaq");
  const faqItems = items.slice(0, 6);

  return (
    <section aria-labelledby="home-faq-title" className="gridContainer border-t border-line/80 py-12 md:py-16">
      <div className="grid gap-8 md:gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div id="home-faq-title">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </div>

          <div className="lg:shrink-0">
            <Link
              href="/sss"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-xs transition hover:-translate-y-0.5 hover:border-primary-dark/30 hover:text-primary-dark"
            >
              {t("viewAll")}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <FaqBrowser
          accordion
          allLabel={t("all")}
          categoriesLabel={t("categoriesLabel")}
          clearSearchLabel={t("clearSearch")}
          copiedLabel={t("copied")}
          copyLinkLabel={t("copyLink")}
          emptyText={t("empty")}
          hideAnswerLabel={t("hideAnswer")}
          items={faqItems}
          searchPlaceholder={t("searchPlaceholder")}
          showAnswerLabel={t("showAnswer")}
        />
      </div>
    </section>
  );
}
