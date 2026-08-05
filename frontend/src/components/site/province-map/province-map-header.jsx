"use client";

import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DENSITY_FILTERS } from "./province-map-utils";

function LegendItem({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-muted">
      <span className="size-2 rounded-full ring-2 ring-white" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function ProvinceMapHeader({ densityFilter, onFilterOpen, onSearchOpen }) {
  const activeFilter = DENSITY_FILTERS.find((filter) => filter.id === densityFilter);

  return (
    <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,auto)] lg:items-end">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft/80 px-3 py-1.5 text-xs font-semibold text-primary-dark shadow-xs">
          <span aria-hidden="true" className="size-2 rounded-full bg-secondary" />
          İl bazlı içerik ağı
        </span>
        <h2 className="mt-5 max-w-3xl text-balance font-heading text-3xl font-semibold leading-[1.1] tracking-normal text-ink md:text-5xl">
          Türkiye Tüketici Bilgilendirme Haritası
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          İllere göre yayınlanan haber, duyuru ve tüketici rehberlerini tek bakışta görünür kılan interaktif bir bilgilendirme alanı.
        </p>
      </div>

      <div className="grid gap-4 rounded-[20px] border border-line bg-white/80 p-3 shadow-xs sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:justify-self-end">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
          <LegendItem color="#254f9f" label="Yoğun içerik" />
          <LegendItem color="#87aee8" label="Orta düzey" />
          <LegendItem color="#dbe3ee" label="Kayıt bulunmuyor" />
        </div>

        <div className="flex flex-col gap-2 min-[420px]:flex-row sm:justify-end">
          <Button
            className="h-10 justify-start rounded-full border-line bg-white px-4 text-sm font-semibold text-ink/72 shadow-xs hover:border-primary/35 hover:bg-primary-soft/70 sm:justify-center"
            onClick={onFilterOpen}
            variant="outline"
          >
            <Filter aria-hidden="true" className="size-4" />
            {activeFilter?.label || "Tümü"}
          </Button>
          <Button
            className="h-10 justify-start rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-xs hover:bg-ink/90 sm:justify-center"
            onClick={onSearchOpen}
          >
            <Search aria-hidden="true" className="size-4" />
            İl ara
          </Button>
        </div>
      </div>
    </header>
  );
}
