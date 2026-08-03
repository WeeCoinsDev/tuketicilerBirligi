"use client";

import Image from "next/image";
import { HERO_FALLBACK_IMAGE } from "./hero-content";

/**
 * Reference-style "Up Next" strip: ink panel + next-slide thumbnail.
 */
export function HeroUpNext({ slide, label, onClick }) {
  if (!slide) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring group flex max-w-md items-stretch overflow-hidden bg-ink text-left text-white transition hover:bg-ink/95"
    >
      <span className="flex min-w-0 flex-1 flex-col justify-center px-5 py-4">
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
          {label}
        </span>
        <span className="mt-1.5 line-clamp-2 font-heading text-sm font-semibold leading-snug tracking-tight">
          {slide.title}
        </span>
      </span>

      <span className="relative hidden w-18 shrink-0 sm:block md:w-24">
        <Image
          alt=""
          className="object-cover transition duration-300 group-hover:scale-105"
          fill
          sizes="96px"
          src={slide.image || HERO_FALLBACK_IMAGE}
        />
      </span>
    </button>
  );
}
