"use client";

import { Controller } from "react-hook-form";
import { AdminFormField } from "@/components/admin/common/admin-form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function HeroPublishFields({ control, errors, register }) {
  return (
    <section className="grid gap-5 rounded-lg border border-line bg-white p-4">
      <div className="grid gap-1">
        <h3 className="text-base font-semibold text-ink">Yayın ayarları</h3>
        <p className="text-sm leading-6 text-muted">Gösterim sırasını ve yayın durumunu buradan yönetin.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <AdminFormField
          error={errors.sortOrder?.message}
          hint="Küçük sayı daha önce gösterilir."
          label="Sıra"
        >
          <Input
            {...register("sortOrder", { valueAsNumber: true })}
            aria-invalid={Boolean(errors.sortOrder)}
            min={0}
            type="number"
          />
        </AdminFormField>

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <label className="flex min-h-20 items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink">
              <Checkbox
                checked={Boolean(field.value)}
                className="mt-0.5"
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
              <span className="grid gap-1">
                <span className="font-semibold">Aktif olarak yayınla</span>
                <span className="text-xs leading-5 text-muted">
                  Pasif kayıtlar panelde kalır ancak anasayfa hero alanında gösterilmez.
                </span>
              </span>
            </label>
          )}
        />
      </div>
    </section>
  );
}
