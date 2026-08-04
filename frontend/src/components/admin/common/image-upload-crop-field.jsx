"use client";

import Cropper from "react-easy-crop";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, LoaderCircle, RotateCcw, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCroppedImageFile } from "@/lib/crop-image";
import { cn } from "@/lib/utils";

export function ImageUploadCropField({
  aspect = 16 / 9,
  error,
  helperText,
  initialPreview = "",
  label = "Görsel",
  onChange,
  value,
}) {
  const [sourceImage, setSourceImage] = useState("");
  const [sourceFileName, setSourceFileName] = useState("image");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");
  const [cropError, setCropError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(
    () => () => {
      if (sourceImage.startsWith("blob:")) {
        URL.revokeObjectURL(sourceImage);
      }
      if (localPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    },
    [sourceImage, localPreviewUrl],
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      if (sourceImage.startsWith("blob:")) {
        URL.revokeObjectURL(sourceImage);
      }

      setCropError("");
      setSourceFileName(file.name.replace(/\.[^.]+$/, "") || "image");
      setSourceImage(URL.createObjectURL(file));
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    },
    [sourceImage],
  );

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: {
      "image/avif": [".avif"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  async function applyCrop() {
    if (!sourceImage || !croppedAreaPixels) {
      setCropError("Önce görsel üzerinde kırpma alanını belirleyin.");
      return;
    }

    try {
      setProcessing(true);
      setCropError("");

      const file = await getCroppedImageFile(sourceImage, croppedAreaPixels, `${sourceFileName}.jpg`);
      const nextPreviewUrl = URL.createObjectURL(file);

      if (localPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(localPreviewUrl);
      }
      if (sourceImage.startsWith("blob:")) {
        URL.revokeObjectURL(sourceImage);
      }

      setLocalPreviewUrl(nextPreviewUrl);
      setSourceImage("");
      onChange?.({ file, imageUrl: nextPreviewUrl, mediaId: value || 0 });
    } catch (applyError) {
      setCropError(applyError.message || "Görsel kırpılamadı.");
    } finally {
      setProcessing(false);
    }
  }

  function clearDraft() {
    if (sourceImage.startsWith("blob:")) {
      URL.revokeObjectURL(sourceImage);
    }
    setSourceImage("");
    setCropError("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }

  const previewUrl = localPreviewUrl || initialPreview;
  const hasPreview = Boolean(previewUrl);
  const isCropping = Boolean(sourceImage);

  const resolvedHelperText = useMemo(() => {
    if (helperText) return helperText;
    if (value || previewUrl) {
      return "Kırpılmış görsel önizlemede görünüyor. Kaydettiğinizde seçili görsel kullanılacak.";
    }
    return "JPG, PNG, WEBP veya AVIF yükleyin. Görsel kayıttan önce kırpılır.";
  }, [helperText, previewUrl, value]);

  return (
    <div className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      <input {...getInputProps()} />

      {!hasPreview && !isCropping ? (
        <div
          {...getRootProps()}
          className={cn(
            "grid min-h-52 place-items-center rounded-lg border border-dashed bg-white p-6 text-center transition",
            isDragActive
              ? "border-primary-dark bg-primary-soft"
              : "border-line hover:border-primary-dark hover:bg-primary-soft/50",
          )}
        >
          <div className="flex max-w-sm flex-col items-center gap-3">
            <div className="grid size-11 place-items-center rounded-md bg-primary-soft text-primary-dark">
              <ImagePlus aria-hidden="true" className="size-5" />
            </div>
            <div className="grid gap-1">
              <p className="font-semibold text-ink">Görseli sürükleyip bırakın</p>
              <p className="text-sm font-normal leading-6 text-muted">veya dosya seçerek kırpma adımına geçin.</p>
            </div>
            <Button onClick={open} type="button" variant="outline">
              <UploadCloud aria-hidden="true" className="size-4" />
              Görsel seç
            </Button>
          </div>
        </div>
      ) : null}

      {hasPreview && !isCropping ? (
        <div className="grid gap-3 rounded-lg border border-line bg-white p-3">
          <div className="overflow-hidden rounded-md border border-line bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="aspect-video h-auto w-full object-cover" src={previewUrl} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={open} type="button" variant="outline">
              <UploadCloud aria-hidden="true" className="size-4" />
              Görseli değiştir
            </Button>
          </div>
        </div>
      ) : null}

      {isCropping ? (
        <div className="grid gap-4 rounded-lg border border-line bg-white p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-ink">Görseli kırp</p>
              <p className="mt-1 text-xs font-normal leading-5 text-muted">Carousel oranı için kadrajı seçin.</p>
            </div>
            <Button disabled={processing} onClick={open} type="button" variant="outline">
              Başka görsel seç
            </Button>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-md bg-ink/10">
            <Cropper
              aspect={aspect}
              crop={crop}
              image={sourceImage}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
              onZoomChange={setZoom}
            />
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
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

          <div className="flex flex-wrap gap-2">
            <Button disabled={processing} onClick={applyCrop} type="button">
              {processing ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
              {processing ? "Hazırlanıyor" : "Kırp ve önizle"}
            </Button>
            <Button disabled={processing} onClick={clearDraft} type="button" variant="ghost">
              <RotateCcw aria-hidden="true" className="size-4" />
              Vazgeç
            </Button>
          </div>
        </div>
      ) : null}

      <span className="text-xs font-normal leading-5 text-muted">{resolvedHelperText}</span>
      {error || cropError ? (
        <span className="text-xs font-semibold leading-5 text-destructive">{error || cropError}</span>
      ) : null}
    </div>
  );
}
