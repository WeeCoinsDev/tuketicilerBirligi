import { AdminNote } from "@/components/admin/admin-note";
import { ResourcePage } from "@/components/admin/resource-page";
import { StaticCard } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <ResourcePage
      title="Özet"
      description="İlk sürüm paneli içerik, başvuru, medya, ayar ve kullanıcı yönetimi için hazırlanmıştır."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["İçerikler", "Haber, duyuru, rehber ve yasal sayfalar"],
          ["Formlar", "İletişim ve ön başvuru kayıtları"],
          ["Ayarlar", "Kurum adı, iletişim, sosyal bağlantılar"]
        ].map(([title, text]) => (
          <StaticCard key={title}>
            <h3 className="text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
          </StaticCard>
        ))}
      </div>
      <div className="mt-6">
        <AdminNote>
          Seed içerikler yer tutucudur. Yayına çıkmadan önce kurumun özgün metinleri, logo,
          gerçek iletişim bilgileri ve görselleri tamamlanmalıdır.
        </AdminNote>
      </div>
    </ResourcePage>
  );
}

