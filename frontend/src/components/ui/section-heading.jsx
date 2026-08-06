import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-primary-dark sm:mb-3.5 md:mb-4">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-muted sm:mt-3.5 md:mt-4 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

