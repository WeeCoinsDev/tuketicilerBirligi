import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";

export const HERO_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80";

/**
 * Full-bleed image + opaque primary washes:
 * left→right (longer, behind copy) and bottom→top (shorter).
 */
export function HeroContent({ slide, labels, dateLocale, priority = false }) {
  const hasMeta = Boolean(slide.category || slide.date);

  return (
    <div className="relative flex h-full min-h-[480px] items-center bg-card-foreground">
      <Image alt="" className="object-cover object-right" fill priority={priority} sizes="100vw" src={slide.image || HERO_FALLBACK_IMAGE} />

      {/* Left → right: longer wash behind the copy column */}
      <div className="absolute inset-0 bg-linear-to-tr from-card-foreground to-transparent" />
      {/* Bottom → top: shorter lift for footer chrome + base of text */}
      <div className="absolute inset-0 bg-linear-to-t from-card-foreground/80 from-0% via-card-foreground/25 via-28% to-transparent to-48%" />

      <div className="relative z-10 w-full pb-36 pt-24 md:pb-40 md:pt-28 gridContainer">
        <div className="max-w-xl lg:max-w-3xl">
          {hasMeta ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              {slide.category ? <span>{slide.category}</span> : null}
              {slide.category && slide.date ? <span aria-hidden="true" className="h-px w-5 bg-white/30" /> : null}
              {slide.date ? <time dateTime={slide.date}>{formatDate(slide.date, dateLocale)}</time> : null}
            </div>
          ) : null}

          <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">{slide.title}</h1>

          {slide.summary ? <p className="mt-5 max-w-md font-sans text-sm leading-7 text-white/70 md:text-base md:leading-8">{slide.summary}</p> : null}

          {slide.href ? (
            <div className="mt-9">
              <Link className="focus-ring group inline-flex items-center gap-3 text-white" href={slide.href}>
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 group-hover:bg-secondary group-hover:text-ink">
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <span className="font-heading text-sm font-semibold tracking-wide">{labels.readMore}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
