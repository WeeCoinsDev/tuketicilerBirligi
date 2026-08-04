"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { cloneElement, useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { provinces as provinceList } from "@/lib/provinces";
import { cn, formatDate } from "@/lib/utils";

const TurkeyMap = dynamic(() => import("turkey-map-react"), { ssr: false });

const emptyProvinceData = {
  count: 0,
  entries: []
};

function getProvinceColor(count) {
  if (count >= 5) return "#870b18";
  if (count >= 3) return "#ad1f2f";
  if (count >= 2) return "#d84f5d";
  if (count === 1) return "#e99aa4";
  return "#d7e1ec";
}

function normalizeProvinceMap(data) {
  const provinceDataByCode = new Map(
    (data?.provinces || []).map((province) => [
      Number(province.code),
      {
        ...province,
        code: Number(province.code),
        name: province.name,
        count: province.count || province.entries?.length || 0,
        entries: province.entries || []
      }
    ])
  );

  return provinceList.map((province) => {
    const apiProvince = provinceDataByCode.get(province.code);
    return {
      ...province,
      ...apiProvince,
      name: apiProvince?.name || province.name,
      count: apiProvince?.count || 0,
      entries: apiProvince?.entries || []
    };
  });
}

function ProvinceEntriesDialog({ onOpenChange, open, province }) {
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

export function ProvinceMapClient({ compact = false, data }) {
  const provinces = useMemo(() => normalizeProvinceMap(data), [data]);
  const provinceByCode = useMemo(
    () => new Map(provinces.map((province) => [province.code, province])),
    [provinces]
  );
  const [selectedProvince, setSelectedProvince] = useState(null);
  const stats = data?.stats || {};
  const latestEntries = data?.latestEntries || [];

  function openProvince(code, fallbackName = "") {
    const province = provinceByCode.get(Number(code)) || {
      ...emptyProvinceData,
      code: Number(code),
      name: fallbackName
    };
    setSelectedProvince(province);
  }

  function renderCity(cityComponent, city) {
    const province = provinceByCode.get(Number(city.plateNumber));
    const count = province?.count || 0;
    const fill = getProvinceColor(count);
    const path = cityComponent.props.children;

    return cloneElement(
      cityComponent,
      {
        "aria-label": `${city.name}: ${count} kayıt`,
        className: "outline-none",
        onKeyDown: (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          openProvince(city.plateNumber, city.name);
        },
        onMouseLeave: (event) => {
          cityComponent.props.onMouseLeave?.(event);
          const cityPath = event.currentTarget.querySelector("path");
          if (cityPath) cityPath.style.fill = fill;
        },
        role: "button",
        tabIndex: 0
      },
      cloneElement(path, {
        style: {
          ...path.props.style,
          cursor: "pointer",
          fill,
          stroke: "#ffffff",
          strokeLinejoin: "round",
          strokeWidth: 1.4,
          transition: "fill 180ms ease, opacity 180ms ease"
        }
      })
    );
  }

  return (
    <section className={cn("bg-white", compact ? "py-14 md:py-18" : "py-16 md:py-24")}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-6">
        <div className="grid gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-dark">
            İl bazlı bilgilendirme
          </p>
          <div className="grid gap-3 lg:grid-cols-[minmax(0,0.72fr)_minmax(22rem,0.28fr)] lg:items-end">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-normal text-ink md:text-4xl">
                Türkiye Tüketici Bilgilendirme Haritası
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                İllere göre yayınlanan haber, duyuru, rehber ve faaliyet kayıtlarına harita üzerinden hızlıca ulaşın.
              </p>
            </div>
            <NativeSelect
              aria-label="İl seç"
              className="lg:hidden"
              onChange={(event) => {
                if (event.target.value) openProvince(event.target.value);
              }}
              value=""
            >
              <NativeSelectOption value="">İl seç</NativeSelectOption>
              {provinces.map((province) => (
                <NativeSelectOption key={province.code} value={province.code}>
                  {province.name} {province.count ? `(${province.count})` : ""}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-stretch">
          <div className="overflow-hidden rounded-xl border border-line bg-surface p-3 shadow-soft md:p-5">
            <div className="rounded-lg bg-white p-2 md:p-4">
              <TurkeyMap
                cityWrapper={renderCity}
                customStyle={{ hoverColor: "#870b18", idleColor: "#d7e1ec" }}
                hoverable
                onClick={(city) => openProvince(city.plateNumber, city.name)}
                showTooltip
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#d7e1ec]" />
                Kayıt yok
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#e99aa4]" />
                Az kayıt
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#870b18]" />
                Yoğun içerik
              </span>
            </div>
          </div>

          <aside className="grid gap-4 rounded-xl border border-line bg-white p-5 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg bg-primary-soft p-4">
                <MapPin aria-hidden="true" className="mb-4 size-5 text-primary-dark" />
                <p className="text-sm font-medium text-muted">Yayınlanan kayıt</p>
                <p className="mt-1 text-3xl font-bold tracking-normal text-ink">
                  {stats.totalEntries || 0}
                </p>
              </div>
              <div className="rounded-lg bg-surface p-4">
                <Newspaper aria-hidden="true" className="mb-4 size-5 text-secondary-dark" />
                <p className="text-sm font-medium text-muted">Aktif il</p>
                <p className="mt-1 text-3xl font-bold tracking-normal text-ink">
                  {stats.activeProvinceCount || 0}
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <h3 className="text-base font-semibold tracking-normal text-ink">Son eklenenler</h3>
              {latestEntries.length ? (
                <div className="grid gap-2">
                  {latestEntries.slice(0, 4).map((entry) => (
                    <button
                      className="grid gap-1 rounded-lg border border-line bg-white p-3 text-left transition hover:border-primary/40 hover:bg-primary-soft/40"
                      key={entry.id}
                      onClick={() => openProvince(entry.provinceCode, entry.provinceName)}
                      type="button"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark">
                        {entry.provinceName}
                      </span>
                      <span className="line-clamp-2 text-sm font-semibold text-ink">{entry.title}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-dashed border-line bg-surface p-4 text-sm text-muted">
                  Harita kayıtları eklendiğinde burada son içerikler görünür.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      <ProvinceEntriesDialog
        onOpenChange={(open) => {
          if (!open) setSelectedProvince(null);
        }}
        open={Boolean(selectedProvince)}
        province={selectedProvince}
      />
    </section>
  );
}
