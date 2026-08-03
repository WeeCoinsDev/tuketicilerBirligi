import { FaqPageContent } from "@/components/site/faq";

export const metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "Tüketici başvuruları ve iletişim süreçleri hakkında sıkça sorulan sorular."
};

export default async function FaqPage({ params }) {
  const { locale } = await params;
  return <FaqPageContent locale={locale} />;
}
