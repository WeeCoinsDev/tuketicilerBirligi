import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  MessageSquareText,
  Newspaper,
  ShieldCheck
} from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { HomeHero, buildHeroSlides } from "@/components/site/home";
import { getHomeData } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Hero");
  const { guides, news, announcements } = await getHomeData(locale);
  const slides = buildHeroSlides({ news, announcements, guides }, tHero);

  return (
    <>
      <HomeHero slides={slides} />

      <section className="border-b border-line bg-surface py-10">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {[
            {
              icon: MessageSquareText,
              title: "Açık iletişim",
              text: "Telefon, e-posta, adres, form ve harita bilgileri tek sayfada toplanır."
            },
            {
              icon: FileCheck2,
              title: "Başvuru rehberi",
              text: "Başvuru öncesi gerekli bilgiler, belgeler ve kanallar sade şekilde anlatılır."
            },
            {
              icon: ShieldCheck,
              title: "Hak rehberleri",
              text: "Tüketicilerin en çok ihtiyaç duyduğu konular kategori bazlı yayınlanır."
            }
          ].map((item) => (
            <Card key={item.title}>
              <item.icon className="text-primary-dark" size={28} aria-hidden="true" />
              <h2 className="mt-4 text-lg font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Hak rehberleri"
            title="Kurum ekibinin özgün içerikleri için hazır yayın alanı"
            description="Seed kayıtları yalnızca örnektir. Gerçek metinler admin panelinden güncellendiğinde SEO dostu liste ve detay sayfalarında görünür."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {guides.slice(0, 4).map((guide) => (
              <Card key={guide.slug}>
                <Badge>Rehber</Badge>
                <h3 className="mt-4 text-xl font-bold text-ink">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{guide.summary}</p>
                <Link
                  className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[8px] text-sm font-bold text-primary-dark"
                  href={`/hak-rehberleri/${guide.slug}`}
                >
                  Detaya git <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Haberler" title="Güncel duyuru ve haber akışı" />
            <div className="mt-6 grid gap-4">
              {news.slice(0, 3).map((item) => (
                <Card key={item.slug}>
                  <div className="flex items-start gap-4">
                    <Newspaper
                      className="mt-1 shrink-0 text-primary-dark"
                      size={22}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold text-muted">
                        {formatDate(item.published_at)}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Duyurular" title="Öne çıkan bilgilendirmeler" />
            <div className="mt-6 grid gap-4">
              {announcements.slice(0, 3).map((item) => (
                <Card key={item.slug}>
                  <p className="text-xs font-semibold text-muted">
                    {formatDate(item.published_at)}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
