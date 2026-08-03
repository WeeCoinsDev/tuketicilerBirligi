import Image from "next/image";

/**
 * Overlap sheet that climbs over the pinned hero (Flexio-lite).
 */
export function HomeContentSheet({ children }) {
  return <div className="relative z-10 -mt-[75vh] bg-surface pt-10 md:-mt-[88vh] md:pt-14 motion-reduce:mt-0 motion-reduce:rounded-none motion-reduce:pt-0">{children}</div>;
}
