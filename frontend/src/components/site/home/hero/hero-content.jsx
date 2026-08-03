import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80";

/**
 * Presentational slide body — no client hooks.
 * Text sits left (readable over the ink gradient); image anchors right.
 */
export function HeroContent({ slide, labels, dateLocale, priority = false }) {
  const hasMeta = Boolean(slide.category || slide.date);

  return (
    <div className="relative flex h-full min-h-[420px] items-center">
      <Image
        alt=""
        className="object-cover object-right"
        fill
        priority={priority}
        sizes="100vw"
        src={slide.image || FALLBACK_IMAGE}
      />

      {/* Left → right: ink softens so the right-anchored photo stays visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/25" />

      <div className="relative z-10 w-full py-24 md:py-28 gridContainer">
        <div className="max-w-xl lg:max-w-2xl">
          {hasMeta ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
              {slide.category ? <span>{slide.category}</span> : null}
              {slide.category && slide.date ? (
                <span aria-hidden="true" className="h-px w-5 bg-white/30" />
              ) : null}
              {slide.date ? (
                <time dateTime={slide.date}>{formatDate(slide.date, dateLocale)}</time>
              ) : null}
            </div>
          ) : null}

          <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
            {slide.title}
          </h1>

          {slide.summary ? (
            <p className="mt-5 max-w-lg font-sans text-base leading-7 text-white/70 md:text-lg md:leading-8">
              {slide.summary}
            </p>
          ) : null}

          {slide.href ? (
            <div className="mt-8">
              <Link
                className="focus-ring group inline-flex items-center gap-2 border-b border-secondary pb-1 font-heading text-sm font-semibold text-white transition hover:border-white"
                href={slide.href}
              >
                {labels.readMore}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
