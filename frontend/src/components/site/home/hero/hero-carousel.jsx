"use client";

import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroContent } from "./hero-content";
import { HeroSidePagination } from "./hero-side-pagination";
import { HeroUpNext } from "./hero-up-next";

import "swiper/css";
import "swiper/css/effect-fade";

/**
 * Client Swiper shell with reference-inspired chrome:
 * Up Next strip, prev / progress / next, vertical index.
 */
export function HeroCarousel({ slides, labels, dateLocale }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const items = slides?.length ? slides : [];

  if (!items.length) return null;

  const nextSlide = items[(activeIndex + 1) % items.length];
  const showChrome = items.length > 1;

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
    <section className="gridContainer relative overflow-hidden bg-card-foreground">
      <div className="fluid relative">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          className="home-hero-swiper h-[min(82vh,760px)] min-h-[480px] w-full"
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
            // progress = remaining (1 → 0); invert for fill
            setAutoplayProgress(1 - progress);
          }}
        >
          {items.map((slide, index) => (
            <SwiperSlide key={slide.id || slide.slug}>
              <HeroContent dateLocale={dateLocale} labels={labels} priority={index === 0} slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        {showChrome ? (
          <>
            <HeroSidePagination activeIndex={activeIndex} total={items.length} onSelect={goTo} />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
              <div className="gridContainer">
                <div className="pointer-events-auto flex flex-col gap-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:pb-8">
                  <HeroUpNext label={labels.upNext} slide={nextSlide} onClick={slideNext} />

                  <div className="flex items-center gap-4 self-start sm:self-end">
                    <button
                      type="button"
                      aria-label={labels.prevSlide}
                      className="focus-ring font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
                      onClick={slidePrev}
                    >
                      ← {labels.prevSlide}
                    </button>

                    <div aria-hidden="true" className="relative h-px w-14 overflow-hidden bg-white/25 md:w-20">
                      <span className="absolute inset-y-0 left-0 bg-white transition-[width] duration-100 ease-linear" style={{ width: `${Math.max(autoplayProgress, 0.04) * 100}%` }} />
                    </div>

                    <button
                      type="button"
                      aria-label={labels.nextSlide}
                      className="focus-ring font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
                      onClick={slideNext}
                    >
                      {labels.nextSlide} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
