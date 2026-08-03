import { SectionHeading } from "@/components/ui/section-heading";

export function DisclosurePageContent() {
  return (
    <section className="gridContainer bg-white py-14">
      <div className="max-w-3xl">
        <SectionHeading
          eyebrow="KVKK"
          title="Aydınlatma Metni"
          description="Formlarda alınan kişisel veriler için resmi aydınlatma metni hukuk ekibi tarafından hazırlanmalıdır."
        />
      </div>
    </section>
  );
}
