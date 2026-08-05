"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { DENSITY_FILTERS } from "./province-map-utils";

const densityMeta = {
  all: {
    color: "bg-secondary",
    description: "Haritadaki tüm yoğunluk seviyelerini birlikte gösterir."
  },
  high: {
    color: "bg-primary-dark",
    description: "Kayıt sayısı daha yüksek olan illeri öne çıkarır."
  },
  medium: {
    color: "bg-primary",
    description: "Orta seviyede içerik bulunan illeri görünür bırakır."
  },
  empty: {
    color: "bg-line",
    description: "Henüz kayıt bulunmayan illeri ayrı değerlendirir."
  }
};

function ProvinceDialogHeader({ description, title }) {
  return (
    <DialogHeader className="gap-2 border-b border-line/80 px-5 pb-4 pt-5 sm:px-6">
      <DialogTitle className="font-heading text-[1.18rem] font-semibold tracking-normal text-ink">
        {title}
      </DialogTitle>
      <DialogDescription className="max-w-2xl text-sm leading-6 text-muted">
        {description}
      </DialogDescription>
    </DialogHeader>
  );
}

function ProvinceEmptyState({ description, title }) {
  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="grid min-h-40 place-items-center border border-dashed border-line bg-surface/45 px-5 py-9 text-center">
        <div className="grid max-w-md gap-1.5">
          <p className="font-medium text-ink">{title}</p>
          <p className="text-sm leading-6 text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProvinceSearchRow({ isHovered, onHover, onSelect, province }) {
  return (
    <button
      className={cn(
        "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-line/70 px-3 py-3 text-left transition last:border-b-0 sm:px-4",
        isHovered ? "bg-primary-soft/35" : "bg-white hover:bg-surface"
      )}
      onClick={onSelect}
      onFocus={onHover}
      onMouseEnter={onHover}
      type="button"
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-ink">{province.name}</span>
        <span className="mt-0.5 block truncate text-xs text-muted">
          {province.count > 0 ? "Yayındaki kayıtları görüntüle" : "Henüz yayınlanmış kayıt yok"}
        </span>
      </span>
      <span className="inline-flex items-center gap-3">
        <span
          className={cn(
            "whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
            province.count > 0 ? "bg-primary-soft/70 text-primary-dark" : "bg-surface text-muted"
          )}
        >
          {province.count} kayıt
        </span>
        <span
          className={cn(
            "inline-flex size-4 items-center justify-center rounded-full border transition",
            isHovered ? "border-primary-dark bg-primary-dark text-white" : "border-line bg-white text-transparent"
          )}
        >
          <Check aria-hidden="true" className="size-2.5" />
        </span>
      </span>
    </button>
  );
}

function ProvinceFilterOption({ active, option, onSelect }) {
  const meta = densityMeta[option.id] || densityMeta.all;

  return (
    <button
      className={cn(
        "grid gap-1.5 border-b border-line/70 px-5 py-4 text-left transition last:border-b-0 sm:px-6",
        active ? "bg-primary-soft/35" : "bg-white hover:bg-surface"
      )}
      onClick={onSelect}
      type="button"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="inline-flex min-w-0 items-center gap-3">
          <span className={cn("size-2.5 shrink-0 rounded-full", meta.color)} />
          <span className="truncate text-sm font-semibold text-ink">{option.label}</span>
        </span>
        <span
          className={cn(
            "inline-flex size-4 shrink-0 items-center justify-center rounded-full border",
            active ? "border-primary-dark bg-primary-dark text-white" : "border-line bg-white text-transparent"
          )}
        >
          <Check aria-hidden="true" className="size-2.5" />
        </span>
      </span>
      <span className="pl-5 text-xs leading-5 text-muted sm:pl-5">{meta.description}</span>
    </button>
  );
}

function ProvinceEntryListItem({ entry }) {
  return (
    <article className="grid gap-3 border-b border-line/80 px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-6">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge className="bg-primary-soft/70 text-primary-dark">
            {entry.categoryLabel || "İçerik"}
          </Badge>
          {entry.eventDate ? (
            <span className="text-[11px] font-medium text-muted">{formatDate(entry.eventDate)}</span>
          ) : null}
        </div>
        <h3 className="text-base font-semibold tracking-normal text-ink">{entry.title}</h3>
        {entry.summary ? <p className="mt-1 text-sm leading-6 text-muted">{entry.summary}</p> : null}
      </div>
      {entry.linkHref ? (
        <Button
          className="justify-self-start sm:justify-self-end"
          render={
            <Link href={entry.linkHref}>
              {entry.linkLabel || "İçeriğe git"}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          }
          size="sm"
          variant="outline"
        />
      ) : null}
    </article>
  );
}

export function ProvinceEntriesDialog({ onOpenChange, open, province }) {
  const entries = province?.entries || [];
  const provinceName = province?.name || "İl seçimi";

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden rounded-[22px] border border-line bg-white p-0 shadow-soft sm:max-w-3xl">
        <ProvinceDialogHeader
          description={
            entries.length
              ? `${entries.length} tüketici bilgilendirme kaydı listeleniyor.`
              : "Bu il için henüz yayınlanmış kayıt bulunmuyor."
          }
          title={provinceName}
        />

        {entries.length ? (
          <div className="site-search-scroll max-h-[min(30rem,60vh)] overflow-y-auto">
            {entries.map((entry) => (
              <ProvinceEntryListItem entry={entry} key={entry.id} />
            ))}
          </div>
        ) : (
          <ProvinceEmptyState
            description="Admin panelinden bu il için haber, duyuru, rehber veya faaliyet kaydı eklendiğinde burada listelenecek."
            title="Henüz yayınlanmış içerik yok"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ProvinceSearchDialog({ onOpenChange, onSelect, open, provinces }) {
  const [query, setQuery] = useState("");
  const [hoveredCode, setHoveredCode] = useState(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) return provinces;

    return provinces.filter((province) =>
      province.name.toLocaleLowerCase("tr-TR").includes(normalized)
    );
  }, [provinces, query]);

  function selectProvince(province) {
    setQuery("");
    setHoveredCode(null);
    onSelect(province);
  }

  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setQuery("");
          setHoveredCode(null);
        }
        onOpenChange(nextOpen);
      }}
      open={open}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden rounded-[22px] border border-line bg-white p-0 shadow-soft sm:max-w-[38rem]">
        <ProvinceDialogHeader
          description="Yayındaki kayıtları il adına göre filtreleyin."
          title="İl ara"
        />

        <div className="border-b border-line/80 px-5 py-4 sm:px-6">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <Input
              autoFocus
              className="h-11 rounded-lg border-line bg-white pl-10 pr-4 text-[15px] shadow-none placeholder:text-muted focus-visible:border-primary/35 focus-visible:ring-3 focus-visible:ring-primary/10"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filtered[0]) {
                  event.preventDefault();
                  selectProvince(filtered[0]);
                }
              }}
              placeholder="İl adına göre arayın"
              value={query}
            />
          </div>
        </div>

        <div className="site-search-scroll max-h-[min(25rem,54dvh)] overflow-y-auto">
          {filtered.length ? (
            filtered.map((province) => (
              <ProvinceSearchRow
                isHovered={hoveredCode === province.code}
                key={province.code}
                onHover={() => setHoveredCode(province.code)}
                onSelect={() => selectProvince(province)}
                province={province}
              />
            ))
          ) : (
            <ProvinceEmptyState
              description="Farklı bir il adı deneyin ya da listedeki şehirlerden birini seçin."
              title="Eşleşen il bulunamadı"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DensityFilterDialog({ densityFilter, onOpenChange, onSelect, open }) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-0 overflow-hidden rounded-[22px] border border-line bg-white p-0 shadow-soft sm:max-w-[28rem]">
        <ProvinceDialogHeader
          description="Haritada vurgulamak istediğiniz içerik seviyesini seçin."
          title="Yoğunluk filtresi"
        />

        <div>
          {DENSITY_FILTERS.map((option) => (
            <ProvinceFilterOption
              active={densityFilter === option.id}
              key={option.id}
              onSelect={() => onSelect(option.id)}
              option={option}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line/80 bg-surface/25 px-5 py-3 sm:px-6">
          <p className="text-[11px] leading-5 text-muted">Seçim haritada anında uygulanır.</p>
          <Button onClick={() => onOpenChange(false)} size="sm" variant="outline">
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
