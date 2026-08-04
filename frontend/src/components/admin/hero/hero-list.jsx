/* eslint-disable @next/next/no-img-element */
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HeroList({ items, onDelete, onEdit }) {
  if (!items.length) {
    return (
      <div className="rounded-[8px] border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-muted">
        Henüz hero kaydı yok. İlk kaydı ekleyerek carousel içeriğini yönetmeye başlayabilirsiniz.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card
          className="grid gap-4 border-line/80 p-4 md:grid-cols-[220px_minmax(0,1fr)_auto]"
          key={item.id}
        >
          <div className="overflow-hidden rounded-[10px] border border-line bg-surface">
            {item.image?.url ? (
              <img alt="" className="aspect-[16/9] h-auto w-full object-cover" src={item.image.url} />
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center text-sm text-muted">
                Görsel yok
              </div>
            )}
          </div>

          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              <span>Sıra {item.sortOrder}</span>
              <span
                className={`rounded-full px-2 py-1 text-[11px] ${
                  item.isActive ? "bg-primary-soft text-primary-dark" : "bg-surface text-muted"
                }`}
              >
                {item.isActive ? "Aktif" : "Pasif"}
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-dark">Türkçe</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{item.titleTr}</h3>
                {item.summaryTr ? (
                  <p className="mt-2 text-sm leading-6 text-muted">{item.summaryTr}</p>
                ) : null}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary-dark">English</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{item.titleEn}</h3>
                {item.summaryEn ? (
                  <p className="mt-2 text-sm leading-6 text-muted">{item.summaryEn}</p>
                ) : null}
              </div>
            </div>

            {item.ctaHref ? (
              <p className="text-xs font-semibold text-muted">
                CTA: <span className="text-ink">{item.ctaHref}</span>
              </p>
            ) : null}
          </div>

          <div className="flex flex-row gap-2 md:flex-col">
            <Button onClick={() => onEdit(item)} type="button" variant="outline">
              <Pencil aria-hidden="true" className="size-4" />
              Düzenle
            </Button>
            <Button onClick={() => onDelete(item)} type="button" variant="ghost">
              <Trash2 aria-hidden="true" className="size-4" />
              Sil
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
