import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Gizlilik",
  description: "Gizlilik politikası içerik hazırlık alanı."
};

export default function PrivacyPage() {
  return (
    <section className="gridContainer bg-white py-14">
      <div className="max-w-3xl">
        <SectionHeading
          eyebrow="Yasal"
          title="Gizlilik Politikası"
          description="Bu metin hukuk ve içerik ekibi tarafından hazırlanacak nihai gizlilik politikasıyla değiştirilmelidir."
        />
      </div>
    </section>
  );
}

