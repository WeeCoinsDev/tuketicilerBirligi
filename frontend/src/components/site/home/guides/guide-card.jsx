import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CutoutCorner } from "@/components/ui/cutout-card";

export function GuideCard({ badgeLabel, guide, readMoreLabel }) {
  return (
    <Link
      className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-[24px] border border-line/80 bg-white p-6 shadow-[0_18px_45px_rgba(22,32,51,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-soft"
      href={`/hak-rehberleri/${guide.slug}`}
    >
      <span className="absolute right-0 top-0 rounded-bl-[18px] bg-secondary px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
        {badgeLabel}
        <CutoutCorner className="absolute -bottom-[23px] right-0 -rotate-90 text-secondary" size={24} />
        <CutoutCorner className="absolute -left-[23px] top-0 -rotate-90 text-secondary" size={24} />
      </span>

      <div className="grid gap-3 pr-16">
        <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-ink md:text-[1.35rem]">{guide.title}</h3>
        {guide.summary ? <p className="line-clamp-3 text-sm leading-7 text-muted">{guide.summary}</p> : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/80 pt-4">
        <span className="text-sm font-semibold text-ink">{readMoreLabel}</span>
        <ArrowUpRight aria-hidden="true" className="size-4 text-ink/45 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" />
      </div>
    </Link>
  );
}
