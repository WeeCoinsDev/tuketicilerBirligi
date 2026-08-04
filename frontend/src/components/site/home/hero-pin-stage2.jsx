import { cn } from "@/lib/utils";

/**
 * Design-v2 hero stage in normal document flow.
 * Keeps the hero flush under Header2 without sticky pinning.
 */
export function HeroPinStage2({ children, className }) {
  return (
    <div
      data-hero-pin-track
      className={cn(
        "relative z-0 w-full",
        "-mt-[var(--site-header-height)]",
        className
      )}
    >
      <div
        data-hero-pin-stage
        className={cn(
          "relative z-[1] w-full overflow-hidden",
          "h-[var(--hero-stage-height)] min-h-[380px]",
          "[&_.fluid]:min-h-0",
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
