import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqBrowser } from "@/components/site/faq/faq-browser";

export async function HomeFaq({ items = [] }) {
  const t = await getTranslations("HomeFaq");
  const faqItems = items.slice(0, 6);

  return (
    <section aria-labelledby="home-faq-title" className="gridContainer py-8 md:py-10 lg:py-11 2xl:py-12">
      <Reveal className="grid gap-6 md:gap-7 lg:gap-8 2xl:gap-10" viewport={{ once: true, amount: 0.18 }}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
          <div id="home-faq-title" className="max-w-2xl">
            <SectionHeading
              className="[&_h2]:text-balance [&_h2]:text-2xl [&_h2]:leading-[1.08] [&_h2]:md:text-3xl [&_h2]:lg:text-[2rem] [&_h2]:xl:text-4xl [&_h2]:2xl:text-5xl [&_p:first-child]:mb-0 [&_p:first-child]:inline-flex [&_p:first-child]:items-center [&_p:first-child]:gap-2 [&_p:first-child]:rounded-full [&_p:first-child]:border [&_p:first-child]:border-line [&_p:first-child]:bg-white [&_p:first-child]:px-3 [&_p:first-child]:py-1 [&_p:first-child]:text-[11px] [&_p:first-child]:font-medium [&_p:first-child]:tracking-normal [&_p:first-child]:text-muted [&_p:first-child]:shadow-[0_6px_18px_rgba(22,32,51,0.04)] [&_p:last-child]:mt-3 [&_p:last-child]:max-w-xl [&_p:last-child]:text-sm [&_p:last-child]:leading-6 [&_p:last-child]:md:mt-4 [&_p:last-child]:md:text-[15px] [&_p:last-child]:md:leading-7 [&_p:last-child]:2xl:text-base"
              eyebrow={
                <>
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary/85" />
                  {t("eyebrow")}
                </>
              }
              title={t("title")}
              description={t("description")}
            />
          </div>

          <div className="md:shrink-0">
            <Link
              href="/sss"
              className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-ink/90 md:min-h-11 md:px-5"
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
      </Reveal>
    </section>
  );
}
