import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { publicNavigation } from "@/lib/navigation";

export function Footer({ settings }) {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <h2 className="text-xl font-bold">{settings.organizationName}</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/76">{settings.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-secondary">
            Hızlı Erişim
          </h3>
          <nav className="mt-4 grid gap-2 text-sm text-white/80">
            {publicNavigation.slice(1).map((item) => (
              <Link
                className="focus-ring rounded-[6px] hover:text-secondary"
                href={item.href}
                key={item.href}
              >
                {item.title}
              </Link>
            ))}
            <Link className="focus-ring rounded-[6px] hover:text-secondary" href="/sss">
              Sıkça Sorulan Sorular
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-secondary">
            İletişim
          </h3>
          <ul className="mt-4 grid gap-3 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-secondary" size={18} aria-hidden="true" />
              <span>{settings.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 shrink-0 text-secondary" size={18} aria-hidden="true" />
              <span>{settings.phone}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 shrink-0 text-secondary" size={18} aria-hidden="true" />
              <span>{settings.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-white/68">
          <p>
            © {new Date().getFullYear()} {settings.organizationName}. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <Link className="focus-ring rounded-[6px] hover:text-secondary" href="/gizlilik">
              Gizlilik
            </Link>
            <Link className="focus-ring rounded-[6px] hover:text-secondary" href="/aydinlatma-metni">
              Aydınlatma Metni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
