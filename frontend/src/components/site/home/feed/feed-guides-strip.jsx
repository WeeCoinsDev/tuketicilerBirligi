import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FeedGuideCard } from "./feed-guide-card";

export function FeedGuidesStrip({ badgeLabel, description, guides = [], eyebrow, readMoreLabel, title, viewAllHref, viewAllLabel }) {
  if (!guides.length) return null;

  return (
    <section className="mt-16 md:mt-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="min-w-0 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary" />
            {eyebrow}
          </span>
          <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-ink md:text-[2.35rem]">{title}</h2>
          {description ? <p className="mt-3 max-w-xl text-sm font-light leading-7 text-muted">{description}</p> : null}
        </div>

        <Link
          className="focus-ring inline-flex shrink-0 items-center gap-1.5 self-start text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition hover:text-secondary-dark md:self-end"
          href={viewAllHref}
        >
          {viewAllLabel}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
        {guides.map((guide) => (
          <FeedGuideCard badgeLabel={badgeLabel} guide={guide} key={guide.slug} readMoreLabel={readMoreLabel} />
        ))}
      </div>
    </section>
  );
}
