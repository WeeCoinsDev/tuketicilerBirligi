import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Aydınlatma Metni",
  description: "KVKK aydınlatma metni içerik hazırlık alanı."
};

export default function DisclosurePage() {
  return (
    <section className="bg-white py-14">
      <div className="container-shell max-w-3xl">
        <SectionHeading
          eyebrow="KVKK"
          title="Aydınlatma Metni"
          description="Formlarda alınan kişisel veriler için resmi aydınlatma metni hukuk ekibi tarafından hazırlanmalıdır."
        />
      </div>
    </section>
  );
}

