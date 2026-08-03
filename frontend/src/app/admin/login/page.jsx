import Image from "next/image";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Image alt="" height={52} src="/logo.svg" width={52} />
          <div>
            <h1 className="text-xl font-bold text-ink">Yönetim Paneli</h1>
            <p className="text-sm text-muted">İçerik ve başvuru yönetimi</p>
          </div>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}

