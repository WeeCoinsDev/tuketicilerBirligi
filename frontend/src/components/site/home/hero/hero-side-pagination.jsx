"use client";

function padIndex(value) {
  return String(value).padStart(2, "0");
}

/**
 * Vertical slide index — far-right edge, white on photo.
 */
export function HeroSidePagination({ activeIndex, total, onSelect }) {
  if (total < 2) return null;

  const progress = ((activeIndex + 1) / total) * 100;

  return (
    <div className="pointer-events-auto absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:right-5 lg:flex">
      <button
        type="button"
        aria-label={`1 / ${total}`}
        className="focus-ring font-sans text-[10px] font-medium tracking-[0.2em] text-white/80 transition-colors hover:text-white"
        onClick={() => onSelect?.(0)}
      >
        . {padIndex(activeIndex + 1)} .
      </button>

      <div className="relative h-24 w-px bg-white/25">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 w-px bg-white transition-[height] duration-300 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        aria-label={`${total} / ${total}`}
        className="focus-ring font-sans text-[10px] font-medium tracking-[0.2em] text-white/45 transition-colors hover:text-white"
        onClick={() => onSelect?.(total - 1)}
      >
        . {padIndex(total)} .
      </button>
    </div>
  );
}
