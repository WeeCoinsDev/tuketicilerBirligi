import { getLocale, getTranslations } from "next-intl/server";
import { FeedColumn } from "./feed-column";
import { FeedItem } from "./feed-item";

export async function HomeFeed({ announcements = [], news = [] }) {
  const t = await getTranslations("HomeFeed");
  const locale = await getLocale();
  const newsItems = news.slice(0, 3);
  const announcementItems = announcements.slice(0, 3);

  return (
    <section className="gridContainer border-t border-line/80 py-10 md:py-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <FeedColumn eyebrow={t("newsEyebrow")} title={t("newsTitle")} viewAllHref="/haberler" viewAllLabel={t("newsViewAll")}>
          {newsItems.length ? (
            newsItems.map((item) => <FeedItem date={item.published_at} href={`/haberler/${item.slug}`} key={item.slug} locale={locale} summary={item.summary} title={item.title} />)
          ) : (
            <p className="py-5 text-sm text-muted">{t("emptyNews")}</p>
          )}
        </FeedColumn>

        <FeedColumn eyebrow={t("announcementsEyebrow")} title={t("announcementsTitle")} viewAllHref="/duyurular" viewAllLabel={t("announcementsViewAll")}>
          {announcementItems.length ? (
            announcementItems.map((item) => <FeedItem date={item.published_at} href="/duyurular" key={item.slug} locale={locale} summary={item.summary} title={item.title} />)
          ) : (
            <p className="py-5 text-sm text-muted">{t("emptyAnnouncements")}</p>
          )}
        </FeedColumn>
      </div>
    </section>
  );
}
