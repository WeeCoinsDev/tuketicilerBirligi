import { getTranslations } from "next-intl/server";
import { getHomeData } from "@/lib/api";
import { HomeHero } from "./hero";
import { HeroPinStage } from "./hero-pin-stage";
import { HomeContentSheet } from "./content-sheet";
import { HomeHighlights } from "./highlights";
import { HomeGuides } from "./guides";
import { HomeFeed } from "./feed";

export { HomeHero } from "./hero";
export { HeroPinStage } from "./hero-pin-stage";
export { HomeContentSheet } from "./content-sheet";
export { HomeHighlights } from "./highlights";
export { HomeGuides } from "./guides";
export { HomeFeed } from "./feed";

export function buildHeroSlides({ news, announcements, guides }, tHero) {
  const categoryMap = {
    news: tHero("categoryNews"),
    announcement: tHero("categoryAnnouncement"),
    guide: tHero("categoryGuide")
  };

  const hrefMap = {
    news: (slug) => `/haberler/${slug}`,
    announcement: () => "/duyurular",
    guide: (slug) => `/hak-rehberleri/${slug}`
  };

  const pooled = [
    ...news.slice(0, 2).map((item) => ({ ...item, type: "news" })),
    ...announcements.slice(0, 1).map((item) => ({ ...item, type: "announcement" })),
    ...guides.slice(0, 1).map((item) => ({ ...item, type: "guide" }))
  ].slice(0, 3);

  return pooled.map((item) => ({
    id: item.id || item.slug,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    date: item.published_at,
    category: categoryMap[item.type],
    href: hrefMap[item.type](item.slug),
    image: item.cover_image || item.image || null
  }));
}

/**
 * Full home composition — keeps the route page thin.
 */
export async function HomePageContent({ locale }) {
  const tHero = await getTranslations("Hero");
  const { guides, news, announcements } = await getHomeData(locale);
  const slides = buildHeroSlides({ news, announcements, guides }, tHero);

  return (
    <>
      <HeroPinStage>
        <HomeHero slides={slides} />
      </HeroPinStage>

      <HomeContentSheet>
        <HomeHighlights />
        <HomeGuides guides={guides} />
        <HomeFeed news={news} announcements={announcements} />
      </HomeContentSheet>
    </>
  );
}
