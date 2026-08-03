import { StaticCard } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/lib/api";

export const metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "Tüketici başvuruları ve iletişim süreçleri hakkında sıkça sorulan sorular."
};

export default async function FaqPage({ params }) {
  const { locale } = await params;
  const items = await getContents({ type: "faq", locale });

  return (
    <section className="bg-white py-14">
      <div className="container-shell max-w-4xl">
        <SectionHeading
          eyebrow="SSS"
          title="Sıkça sorulan sorular"
          description="Cevaplar kurumun resmi süreçlerine göre netleştirilip admin panelinden güncellenmelidir."
        />
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <StaticCard key={item.slug}>
              <h2 className="text-lg font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
            </StaticCard>
          ))}
        </div>
      </div>
    </section>
  );
}

