import { cn } from "@/lib/utils";

/**
 * Flexio-lite hero stage (CSS only — no GSAP):
 * Track / stage / sheet overlap share CSS vars from globals + measured --site-header-height.
 * sticky top = header height so the climb starts under the header, not after dead scroll.
 */
export function HeroPinStage({ children, className }) {
  return (
    <div
      data-hero-pin-track
      className={cn(
        "relative z-0 w-full",
        "h-[var(--hero-pin-track-height)]",
        "motion-reduce:h-auto",
        className
      )}
    >
      <div
        data-hero-pin-stage
        className={cn(
          "sticky z-[1] w-full overflow-hidden",
          "top-[var(--site-header-height)]",
          "h-[var(--hero-stage-height)] min-h-[380px]",
          "motion-reduce:relative motion-reduce:top-0 motion-reduce:h-auto",
          "[&_.fluid]:h-full [&_.fluid]:min-h-0",
          "[&_.home-hero-swiper]:h-full [&_.home-hero-swiper]:min-h-0",
          "[&_[data-hero-root]]:h-full",
          "[&_[data-hero-slide]]:min-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
