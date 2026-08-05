import { Link } from "@/i18n/navigation";
import { FooterLink, isPlaceholderHref } from "./footer-link";

export function FooterColumn({ title, href, links }) {
  return (
    <div>
      <h3 className="font-heading text-[13px] font-bold tracking-normal text-ink">
        {isPlaceholderHref(href) ? (
          title
        ) : (
          <Link
            className="focus-ring group/title relative inline-flex cursor-pointer rounded-sm transition-colors hover:text-secondary"
            href={href}
          >
            {title}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-secondary/70 transition-transform duration-300 group-hover/title:scale-x-100"
            />
          </Link>
        )}
      </h3>
      <ul className="mt-3 grid gap-1.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterColumns({ columns }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
      {columns.map((column) => (
        <FooterColumn href={column.href} key={column.title} links={column.links} title={column.title} />
      ))}
    </div>
  );
}

