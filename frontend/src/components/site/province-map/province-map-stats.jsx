"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CutoutCorner } from "@/components/ui/cutout-card";
import { cn } from "@/lib/utils";
import { formatCount } from "./province-map-utils";

function AnimatedCount({ value }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const shouldAnimate = !reduceMotion && value > 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView || !shouldAnimate) return undefined;

    let animationFrame = 0;
    const duration = 900;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    }

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, shouldAnimate, value]);

  return (
    <span ref={ref}>
      {formatCount(shouldAnimate ? displayValue : value)}
    </span>
  );
}

function ProvinceMapStatCard({ accent = "primary", description, label, value }) {
  const accentClassName =
    accent === "secondary"
      ? "bg-secondary text-white"
      : "bg-primary-dark text-white";
  const cornerClassName = accent === "secondary" ? "text-secondary" : "text-primary-dark";

  return (
    <motion.article
      className="group relative min-h-[8.25rem] overflow-hidden rounded-[22px] border border-line bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_42px_rgba(22,32,51,0.08)]"
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ amount: 0.35, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className={cn("absolute right-0 top-0 rounded-bl-[16px] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em]", accentClassName)}>
        {label}
        <CutoutCorner className={cn("absolute -bottom-[19px] right-0 -rotate-90", cornerClassName)} size={20} />
        <CutoutCorner className={cn("absolute -left-[19px] top-0 -rotate-90", cornerClassName)} size={20} />
      </div>

      <div className="grid h-full content-between gap-5 pr-16">
        <p className="max-w-[13rem] text-sm leading-6 text-muted">{description}</p>
        <p className="font-heading text-4xl font-semibold leading-none tracking-normal text-ink">
          <AnimatedCount value={value} />
        </p>
      </div>
    </motion.article>
  );
}

export function ProvinceMapStats({ activeProvinceCount, categoryCount, latestCount, totalEntries }) {
  const stats = [
    {
      accent: "primary",
      description: "Yayında olan haber, duyuru ve rehber kayıtları.",
      label: "Toplam",
      value: totalEntries
    },
    {
      accent: "secondary",
      description: "Haritada en az bir içeriği bulunan şehirler.",
      label: "Şehir",
      value: activeProvinceCount
    },
    {
      accent: "primary",
      description: "Ziyaretçiye öne çıkarılan güncel bilgilendirmeler.",
      label: "Yeni",
      value: latestCount
    },
    {
      accent: "secondary",
      description: "Haritada gruplanan farklı içerik türleri.",
      label: "Tür",
      value: categoryCount
    }
  ];

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <ProvinceMapStatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
