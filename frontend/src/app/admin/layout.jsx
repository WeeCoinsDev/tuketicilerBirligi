import { AdminShell } from "@/components/admin/admin-shell";
import "../globals.css";

export const metadata = {
  title: "Admin | Tüketiciler Birliği",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
