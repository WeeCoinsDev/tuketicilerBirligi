import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Telefon numarası çok kısa.")
  .max(30, "Telefon numarası çok uzun.");

export const contactSchema = z.object({
  fullName: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalı."),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  phone: phoneSchema.optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Konu en az 3 karakter olmalı."),
  message: z.string().trim().min(20, "Mesaj en az 20 karakter olmalı."),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Aydınlatma metnini onaylamalısınız." })
  }),
  companyName: z.string().optional()
});

export const preApplicationSchema = z.object({
  fullName: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalı."),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  phone: phoneSchema,
  category: z.string().trim().min(2, "Başvuru kategorisi seçin."),
  subject: z.string().trim().min(3, "Konu en az 3 karakter olmalı."),
  message: z
    .string()
    .trim()
    .min(50, "Ön başvuru açıklaması en az 50 karakter olmalı."),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Aydınlatma metnini onaylamalısınız." })
  }),
  companyName: z.string().optional()
});

