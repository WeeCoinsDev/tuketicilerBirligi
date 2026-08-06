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
  const featuredNews = newsItems.find((item) => item.is_featured) || newsItems[0] || null;
  const featuredAnnouncement = announcementItems.find((item) => item.is_featured) || announcementItems[0] || null;
  const sections = [
    newsItems.length
      ? {
          id: "news",
          description: t("newsDescription"),
          eyebrow: t("newsEyebrow"),
          title: t("newsTitle"),
          viewAllHref: "/haberler",
          viewAllLabel: t("newsViewAll"),
          featuredLabel: t("featuredLabel"),
          readMoreLabel: t("readMore"),
          featuredItem: featuredNews,
          items: newsItems,
        }
      : null,
    announcementItems.length
      ? {
          id: "announcements",
          description: t("announcementsDescription"),
          eyebrow: t("announcementsEyebrow"),
          title: t("announcementsTitle"),
          viewAllHref: "/duyurular",
          viewAllLabel: t("announcementsViewAll"),
          featuredLabel: t("featuredLabel"),
          readMoreLabel: t("readMore"),
          featuredItem: featuredAnnouncement,
          items: announcementItems,
        }
      : null,
  ].filter(Boolean);

  return (
    <section className="gridContainer py-10 md:py-12">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.45fr)_22rem] xl:items-start">
        <div className="min-w-0">
          {sections.length ? (
            <>
              <FeedShowcaseCarousel locale={locale} sections={sections} />
              <FeedGuidesStrip
                badgeLabel={t("guidesEyebrow")}
                description={t("guidesDescription")}
                guides={guideItems}
                eyebrow={t("guidesEyebrow")}
                readMoreLabel={t("guidesReadMore")}
                title={t("guidesTitle")}
                viewAllHref="/hak-rehberleri"
                viewAllLabel={t("guidesViewAll")}
              />
            </>
          ) : (
            <p className="py-5 text-sm text-muted">{t("emptyNews")}</p>
          )}
        </div>

        <div className="xl:pl-2">
          <AreasOfAction />
        </div>
      </div>
    </section>
  );
}
