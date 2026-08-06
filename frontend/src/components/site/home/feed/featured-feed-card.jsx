import Image from "next/image";
import { Link } from "@/i18n/navigation";

const FALLBACK_IMAGE = "/ornek-hero.png";

export function FeaturedFeedCard({ category, date, href, image, locale = "tr", summary, title }) {
  const mediaSrc = image || FALLBACK_IMAGE;

  return (
    <article>
      <Link className="group block focus-ring" href={href}>
        <div className="relative aspect-[2.15/1] overflow-hidden rounded-2xl bg-surface">
          <Image
            alt={title}
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 1024px) 100vw, 52rem"
            src={mediaSrc}
          />

          {category ? (
            <span className="absolute left-4 top-4 rounded-sm bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              {category}
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8">
          <div className="shrink-0 md:min-w-16">
            {date ? (
              <>
                <p className="font-heading text-[2.5rem] font-semibold leading-none tracking-tight text-primary-dark/45 md:text-[2.85rem]">
                  {new Date(date).toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
                    day: "2-digit",
                  })}
                </p>
                <time className="mt-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted" dateTime={date}>
                  {new Date(date).toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </>
            ) : null}
          </div>

          <div className="min-w-0">
            <h3 className="font-heading text-[1.45rem] font-semibold leading-snug tracking-tight text-ink transition group-hover:text-secondary-dark md:text-[1.7rem]">
              {title}
            </h3>
            {summary ? <p className="mt-3 max-w-2xl text-sm font-light leading-7 text-muted">{summary}</p> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
