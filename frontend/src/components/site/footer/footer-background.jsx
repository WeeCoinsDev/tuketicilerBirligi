import { GridPattern } from "@/components/ui/grid-pattern";

export function FooterBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <GridPattern
        className="fill-primary/5 stroke-primary-dark/10 [mask-image:linear-gradient(180deg,transparent_0%,#000_16%,#000_82%,transparent_100%)]"
        height={56}
        strokeDasharray="3 8"
        width={56}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(237,243,255,0.82),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.78))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />
      <div className="absolute left-1/2 top-24 h-60 w-60 -translate-x-1/2 rounded-full bg-primary-soft/55 blur-3xl" />
    </div>
  );
}
