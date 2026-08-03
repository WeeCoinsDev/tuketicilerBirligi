"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroContent } from "./hero-content";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Client-only Swiper shell. Content stays presentational via HeroContent.
 */
export function HeroCarousel({ slides, labels, dateLocale }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const items = slides?.length ? slides : [];

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-ink">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        className="home-hero-swiper h-[min(78vh,720px)] min-h-[420px] w-full"
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
            <HeroContent
              dateLocale={dateLocale}
              labels={labels}
              priority={index === 0}
              slide={slide}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="container-shell flex items-center gap-5 pb-7 md:pb-9">
            <div className="pointer-events-auto flex items-center gap-1">
              <button
                ref={prevRef}
                aria-label={labels.prevSlide}
                className="focus-ring inline-flex size-9 items-center justify-center text-white/55 transition-colors hover:text-white"
                type="button"
              >
                <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                ref={nextRef}
                aria-label={labels.nextSlide}
                className="focus-ring inline-flex size-9 items-center justify-center text-white/55 transition-colors hover:text-white"
                type="button"
              >
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="home-hero-pagination pointer-events-auto flex items-center gap-1.5" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
