import { cn } from "@/lib/utils";

/**
 * Design-v2 hero pin stage:
 * - sticky top-0 so the carousel sits flush under the fixed Header2
 * - pull-up by --site-header-height so layout padding does not leave a gap
 * Original HeroPinStage remains for rollback.
 */
export function HeroPinStage2({ children, className }) {
  return (
    <div data-hero-pin-track className={cn("relative z-0 w-full", "-mt-[var(--site-header-height)]", "h-[var(--hero-pin-track-height)]", "motion-reduce:mt-0 motion-reduce:h-auto", className)}>
      <div
        data-hero-pin-stage
        className={cn(
          "sticky top-0 z-[1] w-full overflow-hidden",
          "h-[var(--hero-stage-height)] min-h-[380px]",
          "motion-reduce:relative motion-reduce:h-auto",
          "[&_.fluid]:h-full [&_.fluid]:min-h-0",
          "[&_.home-hero-swiper]:h-full [&_.home-hero-swiper]:min-h-0",
          "[&_[data-hero-root]]:h-full",
          "[&_[data-hero-slide]]:min-h-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
