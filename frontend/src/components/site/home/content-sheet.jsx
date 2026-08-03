/**
 * Overlap sheet that climbs over the pinned hero (Flexio-lite).
 * Top edge uses a tilted clip-path shape divider.
 */
export function HomeContentSheet({ children }) {
  return (
    <div className="pointer-events-none relative z-10 -mt-[65vh] bg-white pt-20 md:-mt-[72vh] md:pt-24 motion-reduce:mt-0 motion-reduce:pt-10 motion-reduce:[clip-path:none] [clip-path:polygon(0_2rem,100%_0,100%_100%,0_100%)] md:[clip-path:polygon(0_3rem,100%_0,100%_100%,0_100%)]">
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
