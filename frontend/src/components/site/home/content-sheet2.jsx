/**
 * Design-v2 overlap sheet (same math as v1).
 * Kept as a copy so the experiment can diverge without touching the original.
 */
export function HomeContentSheet2({ children }) {
  return (
    <div
      className={[
        "pointer-events-none relative z-10 bg-white pt-20 md:pt-24",
        "-mt-[var(--hero-sheet-overlap)]",
        "motion-reduce:mt-0 motion-reduce:pt-10 motion-reduce:[clip-path:none]",
        "[clip-path:polygon(0_2rem,100%_0,100%_100%,0_100%)]",
        "md:[clip-path:polygon(0_3rem,100%_0,100%_100%,0_100%)]",
      ].join(" ")}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
