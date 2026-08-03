import { Newspaper } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/utils";

export function HomeFeed({ news = [], announcements = [] }) {
  return (
    <section className="gridContainer border-y border-line bg-white py-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Haberler" title="Güncel duyuru ve haber akışı" />
          <div className="mt-6 grid gap-4">
            {news.slice(0, 3).map((item) => (
              <Card key={item.slug}>
                <div className="flex items-start gap-4">
                  <Newspaper className="mt-1 shrink-0 text-primary-dark" size={22} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-muted">{formatDate(item.published_at)}</p>
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
                <p className="text-xs font-semibold text-muted">{formatDate(item.published_at)}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
