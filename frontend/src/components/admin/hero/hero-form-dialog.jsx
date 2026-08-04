"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Field, inputClassName } from "@/components/ui/field";
import { createHeroSlide, updateHeroSlide } from "@/lib/admin-api";
import { heroSlideSchema } from "@/lib/form-schemas";
import { HeroImageField } from "./hero-image-field";
import { HeroTranslateButton } from "./hero-translate-button";

function getDefaultValues(item) {
  return {
    titleTr: item?.titleTr || "",
    titleEn: item?.titleEn || "",
    summaryTr: item?.summaryTr || "",
    summaryEn: item?.summaryEn || "",
    ctaLabelTr: item?.ctaLabelTr || "",
    ctaLabelEn: item?.ctaLabelEn || "",
    ctaHref: item?.ctaHref || "",
    mediaId: item?.mediaId || 0,
    isActive: item?.isActive ?? true,
    sortOrder: item?.sortOrder ?? 0
  };
}

export function HeroFormDialog({
  item,
  itemCount,
  maxItems,
  onOpenChange,
  onSaved,
  open
}) {
  const [submitError, setSubmitError] = useState("");
  const [imagePreview, setImagePreview] = useState(item?.image?.url || "");
  const isEditMode = Boolean(item?.id);
  const form = useForm({
    resolver: zodResolver(heroSlideSchema),
    defaultValues: getDefaultValues(item)
  });

  const {
    getValues,
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = form;
  const mediaId = useWatch({
    control,
    name: "mediaId"
  });

  const isLimitReached = useMemo(
    () => !isEditMode && itemCount >= maxItems,
    [isEditMode, itemCount, maxItems]
  );

  async function onSubmit(values) {
    try {
      setSubmitError("");

      if (isEditMode) {
        await updateHeroSlide(item.id, values);
      } else {
        await createHeroSlide(values);
      }

      onSaved?.();
      onOpenChange(false);
    } catch (error) {
      setSubmitError(error.message || "Hero kaydı kaydedilemedi.");
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[calc(100vh-2rem)] max-w-[min(100%-2rem,68rem)] overflow-y-auto p-0">
        <form className="grid gap-0" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="border-b px-5 py-4">
            <DialogTitle>{isEditMode ? "Hero kaydını düzenle" : "Yeni hero kaydı"}</DialogTitle>
            <DialogDescription>
              Hero içeriklerini Türkçe ve İngilizce olarak tek kayıtta yönetin. En fazla {maxItems} kayıt eklenebilir.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 px-5 py-5">
            {isLimitReached ? (
              <p className="rounded-[8px] border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
                En fazla {maxItems} hero kaydı eklenebilir. Yeni kayıt açmadan önce birini silin.
              </p>
            ) : null}

            <HeroImageField
              error={errors.mediaId?.message}
              initialPreview={imagePreview}
              onChange={({ imageUrl, mediaId }) => {
                setValue("mediaId", mediaId, { shouldDirty: true, shouldValidate: true });
                setImagePreview(imageUrl);
              }}
              value={mediaId}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Field error={errors.titleTr?.message} label="Başlık (TR)">
                <input className={inputClassName()} {...register("titleTr")} />
              </Field>
              <Field error={errors.titleEn?.message} label="Title (EN)">
                <input className={inputClassName()} {...register("titleEn")} />
              </Field>
            </div>

            <HeroTranslateButton getValues={getValues} setValue={setValue} />

            <div className="grid gap-4 md:grid-cols-2">
              <Field error={errors.summaryTr?.message} label="Özet (TR)">
                <textarea className={inputClassName("min-h-32 resize-y")} {...register("summaryTr")} />
              </Field>
              <Field error={errors.summaryEn?.message} label="Summary (EN)">
                <textarea className={inputClassName("min-h-32 resize-y")} {...register("summaryEn")} />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field error={errors.ctaLabelTr?.message} label="Buton metni (TR)">
                <input className={inputClassName()} {...register("ctaLabelTr")} />
              </Field>
              <Field error={errors.ctaLabelEn?.message} label="Button label (EN)">
                <input className={inputClassName()} {...register("ctaLabelEn")} />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <Field
                error={errors.ctaHref?.message}
                hint="İç bağlantılar için / ile başlayan yol kullanın."
                label="CTA bağlantısı"
              >
                <input className={inputClassName()} {...register("ctaHref")} placeholder="/haberler/ornek" />
              </Field>
              <Field error={errors.sortOrder?.message} label="Sıra">
                <input className={inputClassName()} {...register("sortOrder", { valueAsNumber: true })} min={0} type="number" />
              </Field>
              <label className="flex min-h-11 items-center gap-3 rounded-[8px] border border-line bg-surface px-3 text-sm font-semibold text-ink">
                <input className="size-4 accent-primary-dark" type="checkbox" {...register("isActive")} />
                Aktif
              </label>
            </div>

            {submitError ? (
              <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {submitError}
              </p>
            ) : null}
          </div>

          <DialogFooter className="px-5" showCloseButton={false}>
            <Button disabled={isSubmitting || isLimitReached} type="submit">
              {isSubmitting ? "Kaydediliyor" : isEditMode ? "Değişiklikleri kaydet" : "Hero kaydını oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
