import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";

export const HERO_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80";

/**
 * Full-bleed image + dark washes for copy readability.
 */
export function HeroContent({ slide, labels, dateLocale, priority = false }) {
  const hasMeta = Boolean(slide.category || slide.date);

  return (
    <div
      data-hero-slide
      className="relative flex h-full min-h-[400px] items-center bg-card-foreground sm:min-h-[460px] md:min-h-[480px]"
    >
      <Image alt="" className="object-cover object-right" fill priority={priority} sizes="100vw" src={slide.image || HERO_FALLBACK_IMAGE} />

      <div className="absolute inset-0 bg-linear-to-r from-card-foreground from-[16%] via-card-foreground/85 via-[42%] to-transparent to-[78%]" />
      <div className="absolute inset-0 bg-linear-to-t from-card-foreground/75 from-0% via-card-foreground/20 via-[26%] to-transparent to-[46%]" />

      <div className="relative z-10 w-full py-20 sm:py-24 md:py-28 gridContainer">
        <div className="max-w-xl lg:max-w-3xl">
          {hasMeta ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">
              {slide.category ? <span>{slide.category}</span> : null}
              {slide.category && slide.date ? <span aria-hidden="true" className="h-px w-5 bg-white/30" /> : null}
              {slide.date ? <time dateTime={slide.date}>{formatDate(slide.date, dateLocale)}</time> : null}
            </div>
          ) : null}

          <h1 className="mt-4 font-heading text-[1.85rem] font-semibold leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.02]">
            {slide.title}
          </h1>

          {slide.summary ? <p className="mt-4 max-w-md font-sans text-sm leading-6 text-white/70 sm:mt-5 sm:leading-7 md:text-base md:leading-8">{slide.summary}</p> : null}

          {slide.href ? (
            <div className="mt-7 sm:mt-9">
              <Link className="focus-ring group inline-flex items-center gap-2.5 text-white sm:gap-3" href={slide.href}>
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 group-hover:bg-secondary group-hover:text-ink sm:size-11">
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
