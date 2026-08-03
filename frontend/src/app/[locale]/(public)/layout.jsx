import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteSettings } from "@/lib/api";
import { ReactLenis } from "@/lib/lenis";

export default async function PublicLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettings(locale);

  return (
    <ReactLenis root options={{ autoRaf: true, syncTouch: false, lerp: 0.16 }}>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </ReactLenis>
  );
}
