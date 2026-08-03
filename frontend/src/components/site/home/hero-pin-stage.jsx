import { cn } from "@/lib/utils";

/** Hero stage height — shorter than full viewport (previous carousel scale). */
const STAGE_H =
  "h-[min(70vh,640px)] min-h-[400px] sm:h-[min(78vh,720px)] sm:min-h-[460px] md:h-[min(82vh,760px)] md:min-h-[480px]";

/**
 * Flexio-lite hero stage (CSS only — no GSAP):
 * Tall track keeps sticky longer (sheet climbs over; hero isn’t pushed early).
 * -mt on the content sheet is paired so initial peek stays near the hero bottom.
 * prefers-reduced-motion: plain flow.
 */
export function HeroPinStage({ children, className }) {
  return (
    <div
      data-hero-pin-track
      className={cn(
        "relative z-0 h-[155vh] w-full md:h-[170vh]",
        "motion-reduce:h-auto",
        className
      )}
    >
      <div
        data-hero-pin-stage
        className={cn(
          "sticky top-0 z-0 w-full overflow-hidden",
          STAGE_H,
          "motion-reduce:relative motion-reduce:h-auto",
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
