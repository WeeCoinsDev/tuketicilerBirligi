"use client";

import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroContent } from "./hero-content";
import { HeroSidePagination } from "./hero-side-pagination";

import "swiper/css";
import "swiper/css/effect-fade";

/** Shared right inset — pagination + nav align to the same edge. */
const CHROME_RIGHT = "right-4 sm:right-5 md:right-6 lg:right-8";

/**
 * Client Swiper shell:
 * - pagination: vertically centered, right side
 * - navigation: bottom-right, same right inset as pagination
 * Parent [data-hero-pin-stage] forces stage height via CSS (not full dvh).
 */
export function HeroCarousel({ slides, labels, dateLocale }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const items = slides?.length ? slides : [];

  if (!items.length) return null;

  const showChrome = items.length > 1;
  const progressPct = Math.max(autoplayProgress, 0.04) * 100;

  function goTo(index) {
    swiperRef.current?.slideToLoop?.(index);
  }

  function slidePrev() {
    swiperRef.current?.slidePrev?.();
  }

  function slideNext() {
    swiperRef.current?.slideNext?.();
  }

  return (
    <section
      data-hero-root
      className="gridContainer relative h-full overflow-hidden bg-card-foreground"
    >
      <div className="fluid relative h-full min-h-[400px] sm:min-h-[460px] md:min-h-[480px]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          className="home-hero-swiper h-[min(70vh,640px)] min-h-[400px] w-full sm:h-[min(78vh,720px)] sm:min-h-[460px] md:h-[min(82vh,760px)] md:min-h-[480px]"
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={showChrome}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            setAutoplayProgress(0);
          }}
          onAutoplayTimeLeft={(_swiper, _time, progress) => {
            setAutoplayProgress(1 - progress);
          }}
        >
          {items.map((slide, index) => (
            <SwiperSlide key={slide.id || slide.slug} className="h-full">
              <HeroContent
                dateLocale={dateLocale}
                labels={labels}
                priority={index === 0}
                slide={slide}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showChrome ? (
          <>
            <HeroSidePagination
              activeIndex={activeIndex}
              total={items.length}
              onSelect={goTo}
              className={`absolute top-1/2 z-20 -translate-y-1/2 ${CHROME_RIGHT}`}
            />

            <div
              className={`pointer-events-auto absolute bottom-5 z-20 flex items-center gap-3 sm:bottom-7 sm:gap-4 md:bottom-8 ${CHROME_RIGHT}`}
            >
              <button
                type="button"
                aria-label={labels.prevSlide}
                className="focus-ring font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white sm:text-[11px]"
                onClick={slidePrev}
              >
                ← {labels.prevSlide}
              </button>

              <div
                aria-hidden="true"
                className="relative h-px w-12 bg-white/30 sm:w-16 md:w-20"
              >
                <span
                  className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-white transition-[left] duration-100 ease-linear"
                  style={{ left: `calc(${progressPct}% - 3px)` }}
                />
              </div>

              <button
                type="button"
                aria-label={labels.nextSlide}
                className="focus-ring font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white sm:text-[11px]"
                onClick={slideNext}
              >
                {labels.nextSlide} →
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
