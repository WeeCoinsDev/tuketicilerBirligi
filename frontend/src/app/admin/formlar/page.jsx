import { AdminNote } from "@/components/admin/admin-note";
import { ResourcePage } from "@/components/admin/resource-page";

export default function AdminFormsPage() {
  return (
    <ResourcePage
      title="Formlar"
      description="İletişim ve tüketici ön başvuru kayıtları buradan incelenir, durumları güncellenir."
    >
      <AdminNote>
        Backend uçları: GET /api/admin/form-submissions ve PATCH
        /api/admin/form-submissions/:id. Durumlar: new, in_review, resolved, spam.
      </AdminNote>
    </ResourcePage>
  );
}

