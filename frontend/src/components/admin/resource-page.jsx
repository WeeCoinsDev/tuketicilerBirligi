import { StaticCard } from "@/components/ui/card";

export function ResourcePage({ title, description, actions, children }) {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-primary-dark">
            Yönetim
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>
        </div>
        {actions}
      </div>
      <StaticCard>{children}</StaticCard>
    </div>
  );
}

