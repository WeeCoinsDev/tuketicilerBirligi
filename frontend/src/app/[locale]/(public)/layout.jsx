import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/footer";
import { Header2 } from "@/components/site/header/index2";
import { getSiteSettings } from "@/lib/api";
import { ReactLenis } from "@/lib/lenis";

export default async function PublicLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettings(locale);

  return (
    <ReactLenis root options={{ autoRaf: true, syncTouch: false, lerp: 0.15 }}>
      {/* <Header settings={settings} /> */}
      <Header2 settings={settings} />
      <main className="pt-[var(--site-header-height)]">{children}</main>
      <Footer settings={settings} />
    </ReactLenis>
  );
}
