/**
 * Design-v2 content wrapper in normal flow.
 */
export function HomeContentSheet2({ children }) {
  return (
    <div
      className={[
        "pointer-events-none relative z-10 bg-white pt-16 md:pt-20",
      ].join(" ")}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
