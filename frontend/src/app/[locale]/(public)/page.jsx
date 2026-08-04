import { setRequestLocale } from "next-intl/server";
import { HomePageContent2 } from "@/components/site/home";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent2 locale={locale} />;
}
