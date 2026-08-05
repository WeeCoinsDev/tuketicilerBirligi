import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function FeedColumn({ children, eyebrow, title, viewAllHref, viewAllLabel }) {
  return (
    <div className="grid content-start gap-2">
      <div className="flex items-end justify-between gap-4 border-b border-line/80 pb-5">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-medium text-muted shadow-[0_6px_18px_rgba(22,32,51,0.04)]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary/85" />
            {eyebrow}
          </span>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h2>
        </div>

        <Link
          className="focus-ring hidden shrink-0 items-center gap-1 rounded-lg text-sm font-semibold text-ink/70 transition hover:text-secondary-dark sm:inline-flex"
          href={viewAllHref}
        >
          {viewAllLabel}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div>{children}</div>

      <Link className="focus-ring mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink/70 sm:hidden" href={viewAllHref}>
        {viewAllLabel}
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
