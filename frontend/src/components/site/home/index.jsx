import { getTranslations } from "next-intl/server";
import { getHomeData } from "@/lib/api";
import { HomeHero } from "./hero";
import { HomeHighlights } from "./highlights";
import { HomeGuides } from "./guides";
import { HomeFeed } from "./feed";

export { HomeHero } from "./hero";
export { HomeHighlights } from "./highlights";
export { HomeGuides } from "./guides";
export { HomeFeed } from "./feed";

export function buildHeroSlides({ news, announcements, guides }, tHero) {
  const categoryMap = {
    news: tHero("categoryNews"),
    announcement: tHero("categoryAnnouncement"),
    guide: tHero("categoryGuide"),
  };

  const hrefMap = {
    news: (slug) => `/haberler/${slug}`,
    announcement: () => "/duyurular",
    guide: (slug) => `/hak-rehberleri/${slug}`,
  };

  const pooled = [
    ...news.slice(0, 2).map((item) => ({ ...item, type: "news" })),
    ...announcements.slice(0, 1).map((item) => ({ ...item, type: "announcement" })),
    ...guides.slice(0, 1).map((item) => ({ ...item, type: "guide" })),
  ].slice(0, 3);

  return pooled.map((item) => ({
    id: item.id || item.slug,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    ctaLabel: tHero("readMore"),
    date: item.published_at,
    category: categoryMap[item.type],
    href: hrefMap[item.type](item.slug),
    image: item.cover_image || item.image || null,
  }));
}

/**
 * Full home composition — keeps the route page thin.
 */
export async function HomePageContent({ locale }) {
  const tHero = await getTranslations("Hero");
  const { guides, heroSlides, news, announcements } = await getHomeData(locale);
  const slides =
    heroSlides?.length
      ? heroSlides.map((slide) => ({
          id: slide.id,
          title: slide.title,
          summary: slide.summary,
          ctaLabel: slide.ctaLabel,
          href: slide.href,
          image: slide.image || null,
          category: null,
          date: null
        }))
      : buildHeroSlides({ news, announcements, guides }, tHero);

  return (
    <>
      <section>
        <HomeHero slides={slides} />
      </section>

      <section className="bg-white pt-12 md:pt-16">
        <HomeHighlights />
        <HomeGuides guides={guides} />
        <HomeFeed news={news} announcements={announcements} />
      </section>
    </>
  );
}
