"use client";

import { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { A11y, Autoplay, EffectFade, Keyboard, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroContent } from "./hero-content";
import { HeroSidePagination } from "./hero-side-pagination";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/parallax";

/** Shared right inset — pagination + nav align to the same edge. */
const CHROME_RIGHT = "right-4 sm:right-5 md:right-6 lg:right-8";

const AUTOPLAY = {
  enabled: true,
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: false,
  // Fade animates slide opacity, not the wrapper — waiting for wrapper transitionend stalls autoplay.
  waitForTransition: false,
  stopOnLastSlide: false,
};

/**
 * Fade + crossfade (800ms) + parallax.
 * Rewind (not Swiper loop): few slides + fade disables loop; rewind still wraps forever.
 * Nav progress uses the same activeIndex ratio as side pagination.
 */
export function HeroCarousel({ slides, labels, dateLocale }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = slides?.length ? slides : [];

  if (!items.length) return null;

  const showChrome = items.length > 1;
  const progress = ((activeIndex + 1) / items.length) * 100;

  function restartAutoplay() {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay || !showChrome) return;
    swiper.autoplay.stop();
    swiper.autoplay.start();
  }

  function goTo(index) {
    swiperRef.current?.slideTo(index);
    restartAutoplay();
  }

  function slidePrev() {
    swiperRef.current?.slidePrev();
    restartAutoplay();
  }

  function slideNext() {
    swiperRef.current?.slideNext();
    restartAutoplay();
  }

  return (
    <section data-hero-root className="gridContainer relative z-[1] h-full overflow-hidden bg-card-foreground">
      <div className="fluid relative h-full min-h-0">
        <Swiper
          modules={[A11y, Autoplay, EffectFade, Keyboard, Parallax]}
          a11y={{ enabled: true }}
          autoplay={showChrome ? AUTOPLAY : false}
          className="home-hero-swiper h-full min-h-0 w-full"
          effect="fade"
          fadeEffect={{ crossFade: true }}
          keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: true }}
          loop={false}
          rewind={showChrome}
          parallax
          speed={800}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (showChrome && swiper.autoplay && !swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {items.map((slide, index) => (
            <SwiperSlide key={slide.id || slide.slug} className="h-full">
              <HeroContent dateLocale={dateLocale} labels={labels} priority={index === 0} slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        {showChrome ? (
          <>
            <HeroSidePagination activeIndex={activeIndex} total={items.length} onSelect={goTo} className={`absolute top-1/2 z-30 -translate-y-1/2 ${CHROME_RIGHT}`} />

            <div className={`pointer-events-auto absolute bottom-5 z-30 flex items-center gap-3 sm:bottom-7 sm:gap-4 md:bottom-8 ${CHROME_RIGHT}`}>
              <button
                type="button"
                aria-label={labels.prevSlide}
                className="focus-ring inline-flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white sm:text-[11px]"
                onClick={slidePrev}
              >
                <HiChevronLeft aria-hidden="true" className="size-3.5 shrink-0" />
                {labels.prevSlide}
              </button>

              <div aria-hidden="true" className="relative h-px w-12 bg-white/30 sm:w-16 md:w-20">
                <span className="absolute inset-y-0 left-0 bg-white transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
              </div>

              <button
                type="button"
                aria-label={labels.nextSlide}
                className="focus-ring inline-flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white sm:text-[11px]"
                onClick={slideNext}
              >
                {labels.nextSlide}
                <HiChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
