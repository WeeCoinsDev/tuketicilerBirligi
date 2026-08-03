"use client";

function padIndex(value) {
  return String(value).padStart(2, "0");
}

/**
 * Vertical pagination — vertically centered on the right edge.
 */
export function HeroSidePagination({ activeIndex, total, onSelect, className = "" }) {
  if (total < 2) return null;

  const progress = ((activeIndex + 1) / total) * 100;

  return (
    <div className={`pointer-events-auto flex flex-col items-center gap-2.5 sm:gap-3 ${className}`}>
      <button
        type="button"
        aria-label={`${activeIndex + 1} / ${total}`}
        className="focus-ring font-sans text-[10px] font-medium tracking-[0.2em] text-white/85 transition-colors hover:text-white"
        onClick={() => onSelect?.(0)}
      >
        . {padIndex(activeIndex + 1)} .
      </button>

      <div className="relative h-16 w-px bg-white/25 sm:h-24 md:h-28">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 w-px bg-white transition-[height] duration-300 ease-out" style={{ height: `${progress}%` }} />
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
