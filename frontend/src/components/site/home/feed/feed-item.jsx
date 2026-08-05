import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";

export function FeedItem({ date, href, locale = "tr", summary, title }) {

  const body = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {date ? (
          <time className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted" dateTime={date}>
            {formatDate(date, locale)}
          </time>
        ) : null}
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug tracking-tight text-ink transition group-hover:text-secondary-dark md:text-xl">{title}</h3>
        {summary ? <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{summary}</p> : null}
      </div>
      <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-ink/30 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" />
    </div>
  );

  return (
    <article className="border-b border-line/70 py-5 last:border-b-0 first:pt-1">
      {href ? (
        <Link className="group focus-ring block rounded-lg" href={href}>
          {body}
        </Link>
      ) : (
        body
      )}
    </article>
  );
}
