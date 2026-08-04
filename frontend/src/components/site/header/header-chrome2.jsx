"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import CornerShape from "@/components/common/cornerShape";

const UTILITY_HIDE_SCROLL = 70;

export function HeaderChrome2({ utility, children, className }) {
  const barRef = useRef(null);
  const [utilityHidden, setUtilityHidden] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    setUtilityHidden(scrollY.get() > UTILITY_HIDE_SCROLL);
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setUtilityHidden(latest > UTILITY_HIDE_SCROLL);
  });

  return (
    <div className={cn("pointer-events-none", className)}>
      <div className="gridContainer pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-end">
          <div ref={barRef} className="w-full rounded-xl bg-white text-ink">
            {children}
          </div>

          {/* <div className="perspective-[900px]">
            <motion.article
              initial={false}
              animate={{
                rotateX: utilityHidden ? -88 : 0,
                opacity: utilityHidden ? 0 : 1,
              }}
              transition={reduceMotion ? { duration: 0 } : { type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={utilityHidden}
              style={{ transformOrigin: "top center" }}
              className={cn("relative mr-7 origin-top rounded-b-xl bg-white px-4 text-ink transform-3d", utilityHidden && "pointer-events-none")}
            >
              <CornerShape className="-left-3.5 h-3.5 w-3.5 -rotate-180 text-white" />
              <CornerShape className="left-auto -right-3.5 h-3.5 w-3.5 rotate-90 text-white" />
              <div className="relative flex min-h-9 items-center justify-end gap-4 whitespace-nowrap py-1.5">{utility}</div>
            </motion.article>
          </div> */}
        </div>
      </div>
    </div>
  );
}
