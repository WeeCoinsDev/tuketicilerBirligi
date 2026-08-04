import { FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const HIGHLIGHTS = [
  {
    icon: MessageSquareText,
    title: "Açık iletişim",
    text: "Telefon, e-posta, adres, form ve harita bilgileri tek sayfada toplanır.",
  },
  {
    icon: FileCheck2,
    title: "Başvuru rehberi",
    text: "Başvuru öncesi gerekli bilgiler, belgeler ve kanallar sade şekilde anlatılır.",
  },
  {
    icon: ShieldCheck,
    title: "Hak rehberleri",
    text: "Tüketicilerin en çok ihtiyaç duyduğu konular kategori bazlı yayınlanır.",
  },
];

export function HomeHighlights() {
  return (
    <section className="gridContainer border-b border-line pb-10">
      <div className="grid gap-4 md:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <Card key={item.title}>
            <item.icon className="text-primary-dark" size={28} aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
