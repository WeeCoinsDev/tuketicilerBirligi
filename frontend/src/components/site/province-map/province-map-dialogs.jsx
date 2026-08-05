"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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

export function ProvinceEntriesDialog({ onOpenChange, open, province }) {
  const entries = province?.entries || [];

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{province?.name || "İl seçimi"}</DialogTitle>
          <DialogDescription>
            {entries.length
              ? `${entries.length} tüketici bilgilendirme kaydı listeleniyor.`
              : "Bu il için henüz yayınlanmış kayıt bulunmuyor."}
          </DialogDescription>
        </DialogHeader>

        {entries.length ? (
          <div className="grid gap-3">
            {entries.map((entry) => (
              <article
                className="grid gap-3 rounded-lg border border-line bg-white p-4 shadow-xs"
                key={entry.id}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary-soft text-primary-dark">
                    {entry.categoryLabel || "İçerik"}
                  </Badge>
                  {entry.eventDate ? (
                    <span className="text-xs font-medium text-muted">
                      {formatDate(entry.eventDate)}
                    </span>
                  ) : null}
                </div>
                <div className="grid gap-1">
                  <h3 className="text-base font-semibold tracking-normal text-ink">{entry.title}</h3>
                  {entry.summary ? (
                    <p className="text-sm leading-6 text-muted">{entry.summary}</p>
                  ) : null}
                </div>
                {entry.linkHref ? (
                  <Button
                    className="justify-self-start"
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
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-surface p-6 text-sm text-muted">
            Admin panelinden bu il için haber, duyuru, rehber veya faaliyet kaydı eklediğinizde burada görünür.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ProvinceSearchDialog({ onOpenChange, onSelect, open, provinces }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalized) return provinces;

    return provinces.filter((province) =>
      province.name.toLocaleLowerCase("tr-TR").includes(normalized)
    );
  }, [provinces, query]);

  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setQuery("");
        onOpenChange(nextOpen);
      }}
      open={open}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-hidden sm:max-w-md">
        <DialogHeader>
          <DialogTitle>İl ara</DialogTitle>
          <DialogDescription>İl adına göre arayıp kayıtlara ulaşın.</DialogDescription>
        </DialogHeader>

        <Input
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Örn. Ankara"
          value={query}
        />

        <div className="max-h-72 overflow-y-auto rounded-lg border border-line">
          {filtered.length ? (
            filtered.map((province) => (
              <button
                className="flex w-full items-center justify-between gap-3 border-b border-line px-3 py-2.5 text-left last:border-b-0 hover:bg-primary-soft/50"
                key={province.code}
                onClick={() => {
                  setQuery("");
                  onSelect(province);
                }}
                type="button"
              >
                <span className="text-sm font-medium text-ink">{province.name}</span>
                <span className="text-xs text-muted">{province.count} kayıt</span>
              </button>
            ))
          ) : (
            <p className="p-4 text-sm text-muted">Eşleşen il bulunamadı.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DensityFilterDialog({ densityFilter, onOpenChange, onSelect, open }) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Yoğunluk filtresi</DialogTitle>
          <DialogDescription>Haritada göstermek istediğiniz içerik düzeyini seçin.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {DENSITY_FILTERS.map((option) => (
            <button
              className={cn(
                "rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition",
                densityFilter === option.id
                  ? "border-primary-dark bg-primary-soft text-ink"
                  : "border-line bg-white text-muted hover:border-primary/40 hover:bg-surface"
              )}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
