"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80";

export function HomeHero({ slides }) {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const dateLocale = locale === "en" ? "en-GB" : "tr-TR";
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const items = slides?.length ? slides : [];

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-ink">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        className="home-hero-swiper h-[min(72vh,680px)] min-h-[420px] w-full"
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={items.length > 1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        pagination={{
          el: ".home-hero-pagination",
          clickable: true,
          bulletClass: "home-hero-bullet",
          bulletActiveClass: "home-hero-bullet-active"
        }}
        onInit={(swiper) => {
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={slide.id || slide.slug}>
            <div className="relative flex h-full min-h-[420px] items-end">
              <Image
                alt=""
                className="object-cover"
                fill
                priority={index === 0}
                sizes="100vw"
                src={slide.image || FALLBACK_IMAGE}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

              <div className="relative z-10 w-full pb-20 pt-28 md:pb-24 md:pt-32">
                <div className="container-shell max-w-3xl">
                  {slide.category ? (
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-ink">
                      {slide.category}
                    </span>
                  ) : null}

                  <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl md:leading-[1.15]">
                    {slide.title}
                  </h1>

                  {slide.summary ? (
                    <p className="mt-4 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
                      {slide.summary}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {slide.href ? (
                      <Link
                        className="focus-ring inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition hover:bg-secondary-dark hover:text-white"
                        href={slide.href}
                      >
                        {t("readMore")}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    ) : null}

                    {slide.date ? (
                      <time className="text-sm text-white/50" dateTime={slide.date}>
                        {formatDate(slide.date, dateLocale)}
                      </time>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 md:bottom-8">
        <div className="container-shell flex items-center gap-3">
          <button
            ref={prevRef}
            aria-label={t("prevSlide")}
            className="pointer-events-auto focus-ring inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-ink/30 text-white backdrop-blur transition hover:bg-ink/50"
            type="button"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>

          <div className="home-hero-pagination pointer-events-auto flex items-center gap-2" />

          <button
            ref={nextRef}
            aria-label={t("nextSlide")}
            className="pointer-events-auto focus-ring inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-ink/30 text-white backdrop-blur transition hover:bg-ink/50"
            type="button"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-8 z-20 hidden flex-col items-center gap-3 lg:flex">
        <span className="rotate-90 text-[10px] uppercase tracking-[0.12em] text-white/40">
          {t("scrollHint")}
        </span>
        <span
          aria-hidden="true"
          className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </div>
    </section>
  );
}
