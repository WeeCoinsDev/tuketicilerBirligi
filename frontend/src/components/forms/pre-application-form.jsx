"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, inputClassName } from "@/components/ui/field";
import { getClientApiBaseUrl } from "@/lib/api";
import { preApplicationSchema } from "@/lib/form-schemas";

const categories = [
  "Ayıplı mal veya hizmet",
  "Mesafeli satış / e-ticaret",
  "Abonelik ve sözleşme",
  "Fiyat etiketi / kasa farkı",
  "Garanti ve servis",
  "Diğer"
];

export function PreApplicationForm() {
  const [status, setStatus] = useState("idle");
  const [files, setFiles] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(preApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
      privacy: false,
      companyName: ""
    }
  });

  async function onSubmit(values) {
    setStatus("idle");
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(`${getClientApiBaseUrl()}/api/public/pre-applications`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    reset();
    setFiles([]);
    setStatus("success");
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("companyName")}
        autoComplete="off"
        className="hidden"
        tabIndex={-1}
        type="text"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field error={errors.fullName?.message} label="Ad Soyad">
          <input className={inputClassName()} {...register("fullName")} autoComplete="name" />
        </Field>
        <Field error={errors.email?.message} label="E-posta">
          <input className={inputClassName()} {...register("email")} autoComplete="email" type="email" />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field error={errors.phone?.message} label="Telefon">
          <input className={inputClassName()} {...register("phone")} autoComplete="tel" />
        </Field>
        <Field error={errors.category?.message} label="Kategori">
          <select className={inputClassName()} {...register("category")}>
            <option value="">Seçiniz</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field error={errors.subject?.message} label="Konu">
        <input className={inputClassName()} {...register("subject")} />
      </Field>

      <Field
        error={errors.message?.message}
        hint="Başvuru öncesi yaşanan olayı, tarihleri ve varsa karşı taraf bilgilerini net şekilde yazın."
        label="Ön başvuru açıklaması"
      >
        <textarea className={inputClassName("min-h-40 resize-y")} {...register("message")} />
      </Field>

      <div className="rounded-[8px] border border-dashed border-primary-dark bg-primary-soft p-4">
        <label className="focus-ring flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[8px] text-center text-sm font-semibold text-ink">
          <FileUp size={24} aria-hidden="true" />
          Belge veya görsel ekle
          <span className="text-xs font-normal text-muted">PDF, JPG, PNG, WEBP veya AVIF; en fazla 5 dosya.</span>
          <input
            className="sr-only"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 5))}
            type="file"
            accept=".pdf,image/jpeg,image/png,image/webp,image/avif"
          />
        </label>
        {files.length ? (
          <ul className="mt-3 grid gap-1 text-xs text-muted">
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`}>{file.name}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input className="mt-1 size-4 accent-primary-dark" type="checkbox" {...register("privacy")} />
        <span>Kişisel verilerimin ön başvuru talebim kapsamında işlenmesine ilişkin aydınlatma metnini okudum.</span>
      </label>
      {errors.privacy ? (
        <p className="text-xs font-semibold text-red-700">{errors.privacy.message}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button disabled={isSubmitting} type="submit">
          <Send size={18} aria-hidden="true" />
          {isSubmitting ? "Gönderiliyor" : "Ön Başvuru Gönder"}
        </Button>
        {status === "success" ? (
          <p className="text-sm font-semibold text-secondary-dark">Ön başvurunuz alındı.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm font-semibold text-red-700">Ön başvuru gönderilemedi. Lütfen tekrar deneyin.</p>
        ) : null}
      </div>
    </form>
  );
}

