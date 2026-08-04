import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/common/content-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function HomeGuides({ guides = [] }) {
  return (
    <section className="gridContainer bg-white py-14">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
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
  );
}
