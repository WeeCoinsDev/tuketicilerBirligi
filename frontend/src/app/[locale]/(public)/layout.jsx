import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteSettings } from "@/lib/api";

export default async function PublicLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettings(locale);

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
