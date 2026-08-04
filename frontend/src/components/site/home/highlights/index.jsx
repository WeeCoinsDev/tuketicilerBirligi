import Link from "next/link";
import { ArrowUpRight, FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  CutoutCorner,
  cutoutCardSurfaceClassName,
} from "@/components/ui/cutout-card";

const HIGHLIGHTS = [
  {
    icon: MessageSquareText,
    kicker: "Öne çıkan",
    badge: "01",
    title: "Açık iletişim",
    text: "Telefon, e-posta, adres, form ve harita bilgileri tek sayfada toplanır.",
    note: "Tüm iletişim kanalları tek yerde, net ve erişilebilir.",
    href: "/iletisim",
    cta: "İletişime git",
    meta: "Doğrudan erişim",
    accentClassName: "from-[#0E4278] via-[#2667B2] to-[#8DB7EC]",
    waveClassName: "from-[#7E0D18] via-[#D0514E] to-[#F3A343]",
    pinClassName: "bg-ink text-white",
  },
  {
    icon: FileCheck2,
    kicker: "Öne çıkan",
    badge: "02",
    title: "Başvuru rehberi",
    text: "Başvuru öncesi gerekli bilgiler, belgeler ve kanallar sade şekilde anlatılır.",
    note: "Süreci gereksiz karmaşa olmadan adım adım açıklar.",
    href: "/basvuru-rehberi",
    cta: "Rehberi incele",
    meta: "Adım adım süreç",
    accentClassName: "from-[#103A65] via-[#2A6AA5] to-[#B4D0F2]",
    waveClassName: "from-[#8A1623] via-[#CE5A45] to-[#F1B24D]",
    pinClassName: "bg-primary-dark text-white",
  },
  {
    icon: ShieldCheck,
    kicker: "Öne çıkan",
    badge: "03",
    title: "Hak rehberleri",
    text: "Tüketicilerin en çok ihtiyaç duyduğu konular kategori bazlı yayınlanır.",
    note: "Hak arama süreçlerinde güven veren, düzenli içerik yapısı sunar.",
    href: "/hak-rehberleri",
    cta: "Rehberleri aç",
    meta: "Kategori bazlı içerik",
    accentClassName: "from-[#123D6B] via-[#225F9D] to-[#A8C7EE]",
    waveClassName: "from-[#7A101B] via-[#C84B43] to-[#EEA24A]",
    pinClassName: "bg-secondary text-white",
  },
];

export function HomeHighlights() {
  return (
    <section aria-labelledby="home-highlights-title" className="gridContainer border-b border-line pb-10 md:pb-14">
      <div className="grid gap-8">
        <div id="home-highlights-title">
          <SectionHeading
            eyebrow="Öne çıkanlar"
            title="Bilgiye hızlı erişim sağlayan sade bir deneyim"
            description="Ana temas noktalarını tek bakışta görünür kılan bu alan, ziyaretçilerin ihtiyaç duyduğu bilgiye daha kısa sürede ve daha az karmaşayla ulaşmasını destekler."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <CutoutCard
              key={item.title}
              className={`${cutoutCardSurfaceClassName} h-full rounded-[2rem] border-line bg-white text-ink`}
            >
              <article className="flex h-full flex-col">
                <CutoutCardMedia className={`relative h-60 rounded-t-[2rem] bg-linear-to-br ${item.accentClassName}`}>
                  <div className="absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-full bg-linear-to-b from-white/0 via-white/0 to-white/15" />
                    <div className={`absolute -left-10 bottom-7 h-24 w-44 rounded-full bg-linear-to-r opacity-95 blur-[2px] ${item.waveClassName}`} />
                    <div className={`absolute left-16 bottom-10 h-20 w-40 rounded-full bg-linear-to-r opacity-90 blur-[1px] ${item.waveClassName}`} />
                    <div className={`absolute right-[-1.5rem] bottom-5 h-28 w-52 rounded-full bg-linear-to-l opacity-95 blur-[2px] ${item.waveClassName}`} />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-white/10" />
                  </div>
                  <CutoutCardOverlay className="from-black/18 via-transparent to-transparent" />

                  <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-white px-5 py-3">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {item.kicker}
                    </span>
                    <CutoutCorner className="absolute -bottom-px -right-[31px] rotate-90 text-white" />
                    <CutoutCorner className="absolute -left-px -top-[31px] rotate-90 text-white" />
                  </CutoutCardInsetLabel>

                  <CutoutCardPin className={`right-0 top-0 rounded-bl-[16px] px-4 py-2 text-sm font-semibold shadow-md ring-1 ring-white/15 ${item.pinClassName}`}>
                    {item.badge}
                    <CutoutCorner
                      className={`absolute -left-[23px] top-0 -rotate-90 ${item.pinClassName.includes("bg-secondary") ? "text-secondary" : item.pinClassName.includes("bg-primary-dark") ? "text-primary-dark" : "text-ink"}`}
                      size={24}
                    />
                    <CutoutCorner
                      className={`absolute -bottom-[23px] right-0 -rotate-90 ${item.pinClassName.includes("bg-secondary") ? "text-secondary" : item.pinClassName.includes("bg-primary-dark") ? "text-primary-dark" : "text-ink"}`}
                      size={24}
                    />
                  </CutoutCardPin>

                  <div className="absolute inset-x-6 bottom-10 z-10 flex items-end justify-between gap-4">
                    <div className="max-w-44 text-white">
                      <p className="text-sm font-medium leading-6 text-white/90">{item.note}</p>
                    </div>
                    <div className="inline-flex size-12 items-center justify-center rounded-full bg-white/18 text-white ring-1 ring-white/30 backdrop-blur-sm">
                      <item.icon aria-hidden="true" size={22} strokeWidth={1.9} />
                    </div>
                  </div>
                </CutoutCardMedia>

                <CutoutCardContent className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Bilgilendirme alanı
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                    {item.text}
                  </p>

                  <CutoutCardFooter className="border-border/80 mt-5 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary-dark ring-2 ring-white">
                        <item.icon aria-hidden="true" size={18} strokeWidth={2} />
                      </div>
                      <span className="text-sm font-medium text-ink">Tüketici odaklı yapı</span>
                    </div>
                    <span className="text-xs tabular-nums text-muted">
                      {item.meta}
                    </span>
                  </CutoutCardFooter>
                </CutoutCardContent>

                <CutoutCardAction className="bottom-5 right-5">
                  <Link
                    href={item.href}
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-md transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5"
                  >
                    {item.cta}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </CutoutCardAction>
              </article>
            </CutoutCard>
          ))}
        </div>
      </div>
    </section>
  );
}
