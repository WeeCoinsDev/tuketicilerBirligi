import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";

function ContactItem({ children, icon: Icon }) {
  return (
    <li className="flex gap-2.5">
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.8} />
      <span>{children}</span>
    </li>
  );
}

export function FooterContact({ settings, title }) {
  return (
    <div className="rounded-xl border border-line/80 bg-white/70 p-4 shadow-[0_14px_36px_rgba(22,32,51,0.06)] backdrop-blur-sm">
      <h3 className="font-heading text-[13px] font-bold tracking-normal text-ink">
        <Link className="focus-ring cursor-pointer rounded-sm transition-colors hover:text-secondary" href="/iletisim">
          {title}
        </Link>
      </h3>
      <ul className="mt-3 grid gap-3 text-sm leading-6 text-ink/70">
        <ContactItem icon={MapPin}>{settings.address}</ContactItem>
        <ContactItem icon={Phone}>{settings.phone}</ContactItem>
        <ContactItem icon={Mail}>
          <a
            className="focus-ring cursor-pointer rounded-sm transition-colors hover:text-secondary"
            href={`mailto:${settings.email}`}
          >
            {settings.email}
          </a>
        </ContactItem>
      </ul>
    </div>
  );
}

