"use client";

import Cropper from "react-easy-crop";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { uploadAdminMedia } from "@/lib/admin-api";
import { getCroppedImageFile } from "@/lib/crop-image";

const HERO_ASPECT = 16 / 9;

export function HeroImageField({ error, initialPreview, onChange, value }) {
  const [sourceImage, setSourceImage] = useState("");
  const [sourceFileName, setSourceFileName] = useState("hero-image.jpg");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(
    () => () => {
      if (sourceImage.startsWith("blob:")) {
        URL.revokeObjectURL(sourceImage);
      }
    },
    [sourceImage]
  );

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setUploadError("");
    setSourceFileName(file.name.replace(/\.[^.]+$/, "") || "hero-image");
    setSourceImage(URL.createObjectURL(file));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"]
    },
    maxFiles: 1,
    multiple: false,
    onDrop
  });

  async function handleApplyCrop() {
    if (!sourceImage || !croppedAreaPixels) {
      setUploadError("Önce bir görsel seçip kırpma alanını belirleyin.");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");

      const file = await getCroppedImageFile(
        sourceImage,
        croppedAreaPixels,
        `${sourceFileName}.jpg`
      );
      const formData = new FormData();
      formData.append("file", file);
      const data = await uploadAdminMedia(formData);

      setSourceImage("");
      onChange({
        mediaId: data.id,
        imageUrl: data.publicUrl
      });
    } catch (cropError) {
      setUploadError(cropError.message || "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
    }
  }

  const helperText = useMemo(
    () =>
      value
        ? "16:9 oranında kırpılmış görsel kullanılıyor. Yeni bir dosya bırakarak değiştirebilirsiniz."
        : "Hero görselleri 16:9 oranında kırpılır. Böylece carousel tüm ekranlarda daha stabil görünür.",
    [value]
  );
  const previewUrl = initialPreview || "";

  return (
    <Field error={error || uploadError} hint={helperText} label="Hero görseli">
      <div className="grid gap-4">
        {previewUrl ? (
          <div className="overflow-hidden rounded-[12px] border border-line bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="aspect-[16/9] h-auto w-full object-cover" src={previewUrl} />
          </div>
        ) : null}

        <div
          {...getRootProps()}
          className={`rounded-[12px] border border-dashed p-5 text-center transition ${
            isDragActive
              ? "border-primary-dark bg-primary-soft"
              : "border-line bg-white hover:border-primary-dark hover:bg-primary-soft/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-sm text-muted">
            <ImagePlus aria-hidden="true" className="size-6 text-ink" />
            <p className="font-semibold text-ink">
              Görseli sürükleyip bırakın veya seçmek için tıklayın
            </p>
            <p>JPG, PNG, WEBP veya AVIF. Yüklemeden önce 16:9 oranında kırpılacaktır.</p>
          </div>
        </div>

        {sourceImage ? (
          <div className="grid gap-3 rounded-[12px] border border-line bg-surface p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-ink/10">
              <Cropper
                aspect={HERO_ASPECT}
                crop={crop}
                image={sourceImage}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                onZoomChange={setZoom}
              />
            </div>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              <span>Yakınlaştırma</span>
              <input
                className="w-full accent-primary-dark"
                max={3}
                min={1}
                onChange={(event) => setZoom(Number(event.target.value))}
                step={0.1}
                type="range"
                value={zoom}
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <Button disabled={uploading} onClick={handleApplyCrop} type="button">
                {uploading ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
                {uploading ? "Yükleniyor" : "Kırp ve yükle"}
              </Button>
              <Button
                disabled={uploading}
                onClick={() => {
                  if (sourceImage.startsWith("blob:")) {
                    URL.revokeObjectURL(sourceImage);
                  }
                  setSourceImage("");
                  setUploadError("");
                }}
                type="button"
                variant="ghost"
              >
                Vazgeç
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Field>
  );
}
