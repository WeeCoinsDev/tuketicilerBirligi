"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AdminShell({ children }) {
  const pathname = usePathname();

  async function logout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3402"}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    window.location.href = "/admin/login";
  }

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white p-5 lg:block">
        <Link className="focus-ring flex items-center gap-3 rounded-[8px]" href="/admin">
          <Image alt="" height={42} src="/logo.svg" width={42} />
          <span className="grid">
            <span className="text-sm font-bold text-ink">Yönetim Paneli</span>
            <span className="text-xs text-muted">Tüketiciler Birliği</span>
          </span>
        </Link>

        <nav className="mt-8 grid gap-1" aria-label="Admin menü">
          {adminNavigation.map((item) => (
            <Link
              className={cn(
                "focus-ring rounded-[8px] px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-primary-soft hover:text-primary-dark",
                pathname === item.href && "bg-primary-soft text-primary-dark"
              )}
              href={item.href}
              key={item.href}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-white">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-dark">
                Admin
              </p>
              <h1 className="text-lg font-bold text-ink">İçerik ve başvuru yönetimi</h1>
            </div>
            <button
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-line bg-white px-3 text-sm font-semibold text-ink hover:bg-primary-soft"
              onClick={logout}
              type="button"
            >
              <LogOut size={18} aria-hidden="true" />
              Çıkış
            </button>
          </div>
        </header>
        <div className="px-4 py-6 md:px-8">{children}</div>
      </div>
    </div>
  );
}

