"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AdminAlert } from "@/components/admin/common/admin-alert";
import { ImageUploadCropField } from "@/components/admin/common/image-upload-crop-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createHeroSlide, updateHeroSlide, uploadAdminMedia } from "@/lib/admin-api";
import { heroSlideSchema } from "@/lib/form-schemas";
import { HeroLinkField } from "./hero-link-field";
import { HeroPublishFields } from "./hero-publish-fields";
import { HeroTextFields } from "./hero-text-fields";

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
    sortOrder: item?.sortOrder ?? 0,
  };
}

export function HeroFormDialog({ item, itemCount, maxItems, onOpenChange, onSaved, open }) {
  const [submitError, setSubmitError] = useState("");
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const isEditMode = Boolean(item?.id);

  const form = useForm({
    resolver: zodResolver(heroSlideSchema),
    defaultValues: getDefaultValues(item),
  });

  const {
    clearErrors,
    control,
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const ctaHref = useWatch({ control, name: "ctaHref" });
  const mediaId = useWatch({ control, name: "mediaId" });
  const isLimitReached = useMemo(
    () => !isEditMode && itemCount >= maxItems,
    [isEditMode, itemCount, maxItems],
  );

  async function uploadPendingImage() {
    if (!pendingImageFile) return null;

    const formData = new FormData();
    formData.append("file", pendingImageFile);
    return uploadAdminMedia(formData);
  }

  async function onSubmit(values) {
    if (isLimitReached) return;

    try {
      setSubmitError("");
      let payload = { ...values };

      if (pendingImageFile) {
        const uploadedImage = await uploadPendingImage();
        payload = {
          ...payload,
          mediaId: uploadedImage.id,
        };
      }

      if (!payload.mediaId) {
        setError("mediaId", {
          type: "manual",
          message: "Hero görseli seçmelisiniz.",
        });
        return;
      }

      if (isEditMode) {
        await updateHeroSlide(item.id, payload);
      } else {
        await createHeroSlide(payload);
      }

      onSaved?.();
      onOpenChange(false);
    } catch (error) {
      setSubmitError(error.message || "Hero kaydı kaydedilemedi.");
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-hidden p-0 sm:max-w-5xl">
        <form className="flex max-h-[calc(100dvh-2rem)] flex-col" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="border-b border-line bg-white px-5 py-4 sm:px-6">
            <DialogTitle>{isEditMode ? "Hero kaydını düzenle" : "Yeni hero kaydı"}</DialogTitle>
            <DialogDescription>
              Hero içeriklerini Türkçe ve İngilizce olarak tek kayıtta yönetin. En fazla {maxItems} kayıt eklenebilir.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto bg-surface/70">
            <div className="grid gap-5 px-5 py-5 sm:px-6">
              <input type="hidden" {...register("mediaId", { valueAsNumber: true })} />

              {isLimitReached ? (
                <AdminAlert icon={AlertCircle} title="Hero limiti dolu" variant="warning">
                  En fazla {maxItems} hero kaydı eklenebilir. Yeni kayıt açmadan önce mevcut kayıtlardan birini silin.
                </AdminAlert>
              ) : null}

              <section className="grid gap-4 rounded-lg border border-line bg-white p-4">
                <div className="grid gap-1">
                  <h3 className="text-base font-semibold text-ink">Hero görseli</h3>
                  <p className="text-sm leading-6 text-muted">
                    Görseli istediğiniz anda seçip kırpabilirsiniz. Upload işlemi kayıt sırasında yapılır.
                  </p>
                </div>

                <ImageUploadCropField
                  error={errors.mediaId?.message}
                  helperText="Carousel görünümünün dengeli kalması için görsel 16:9 oranında önizlenir."
                  initialPreview={item?.image?.url || ""}
                  label="Hero görseli"
                  onChange={({ file, mediaId: nextMediaId }) => {
                    setPendingImageFile(file);
                    setValue("mediaId", nextMediaId || mediaId || 0, {
                      shouldDirty: true,
                      shouldValidate: false,
                    });
                    clearErrors("mediaId");
                  }}
                  value={mediaId}
                />
              </section>

              <HeroTextFields
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={setValue}
              />

              <HeroLinkField
                ctaHref={ctaHref}
                error={errors.ctaHref?.message}
                register={register}
                setValue={setValue}
              />

              <HeroPublishFields control={control} errors={errors} register={register} />

              {submitError ? (
                <AdminAlert icon={AlertCircle} title="Kayıt kaydedilemedi" variant="destructive">
                  {submitError}
                </AdminAlert>
              ) : null}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="text-sm leading-6 text-muted">
              {isEditMode
                ? "Kaydettiğinizde değişiklikler hero kaydına uygulanır."
                : "Kayıt oluşturulduğunda liste otomatik yenilenir."}
            </div>
            <Button className="w-full sm:w-auto" disabled={isSubmitting || isLimitReached} type="submit">
              {isSubmitting ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
              {isSubmitting ? "Kaydediliyor" : isEditMode ? "Değişiklikleri kaydet" : "Hero kaydını oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
