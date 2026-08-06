import { getLocale, getTranslations } from "next-intl/server";
import { AreasOfAction } from "../areas-of-action";
import { FeedGuidesStrip } from "./feed-guides-strip";
import { FeedShowcaseCarousel } from "./feed-showcase-carousel";

export async function HomeFeed({ announcements = [], guides = [], news = [] }) {
  const t = await getTranslations("HomeFeed");
  const locale = await getLocale();
  const newsItems = news.slice(0, 4).map((item) => ({ ...item, href: `/haberler/${item.slug}` }));
  const announcementItems = announcements.slice(0, 4).map((item) => ({ ...item, href: "/duyurular" }));
  const guideItems = guides.slice(0, 2);

  const useNews = newsItems.length > 0;
  const slides = useNews ? newsItems : announcementItems;

  return (
    <section className="gridContainer py-12 md:py-16">
      <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_17.5rem] xl:items-start xl:gap-x-20">
        <div className="min-w-0">
          {slides.length ? (
            <FeedShowcaseCarousel
              description={useNews ? t("newsDescription") : t("announcementsDescription")}
              eyebrow={useNews ? t("newsEyebrow") : t("announcementsEyebrow")}
              featuredLabel={t("featuredLabel")}
              items={slides}
              locale={locale}
              nextSlideLabel={t("nextSlide")}
              previousSlideLabel={t("previousSlide")}
              readMoreLabel={t("readMore")}
              title={useNews ? t("newsTitle") : t("announcementsTitle")}
              viewAllHref={useNews ? "/haberler" : "/duyurular"}
              viewAllLabel={useNews ? t("newsViewAll") : t("announcementsViewAll")}
            />
          ) : (
            <p className="py-5 text-sm text-muted">{t("emptyNews")}</p>
          )}
        </div>

        <AreasOfAction />
      </div>

      <FeedGuidesStrip
        badgeLabel={t("guidesEyebrow")}
        description={t("guidesDescription")}
        eyebrow={t("guidesEyebrow")}
        guides={guideItems}
        readMoreLabel={t("guidesReadMore")}
        title={t("guidesTitle")}
        viewAllHref="/hak-rehberleri"
        viewAllLabel={t("guidesViewAll")}
      />
    </section>
  );
}
