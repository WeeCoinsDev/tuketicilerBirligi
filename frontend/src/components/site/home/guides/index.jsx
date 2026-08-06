import { getTranslations } from "next-intl/server";
import { GuideCard } from "./guide-card";
import { GuidesHeader } from "./guides-header";

export async function HomeGuides({ guides = [] }) {
  const t = await getTranslations("HomeGuides");
  const items = guides.slice(0, 4);

  return (
    <section aria-labelledby="home-guides-title" className="gridContainer border-t border-line/80 py-10 md:py-12">
      <div className="grid gap-8 md:gap-10">
        <div id="home-guides-title">
          <GuidesHeader description={t("description")} eyebrow={t("eyebrow")} title={t("title")} viewAllHref="/hak-rehberleri" viewAllLabel={t("viewAll")} />
        </div>

        {items.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((guide) => (
              <GuideCard badgeLabel={t("badge")} guide={guide} key={guide.slug} readMoreLabel={t("readMore")} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">{t("empty")}</p>
        )}
      </div>
    </section>
  );
}
