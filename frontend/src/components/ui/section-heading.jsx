import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-primary-dark">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold leading-tight text-ink md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

