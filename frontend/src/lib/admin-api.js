"use client";

import { getClientApiBaseUrl } from "./api";

const API_BASE_URL = getClientApiBaseUrl();

async function adminRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "İşlem tamamlanamadı.");
  }

  return data;
}

export function listHeroSlides() {
  return adminRequest("/api/admin/hero-slides");
}

export function createHeroSlide(values) {
  return adminRequest("/api/admin/hero-slides", {
    method: "POST",
    body: JSON.stringify(values)
  });
}

export function updateHeroSlide(id, values) {
  return adminRequest(`/api/admin/hero-slides/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values)
  });
}

export function deleteHeroSlide(id) {
  return adminRequest(`/api/admin/hero-slides/${id}`, {
    method: "DELETE"
  });
}

export function translateHeroSlide(values) {
  return adminRequest("/api/admin/hero-slides/translate", {
    method: "POST",
    body: JSON.stringify(values)
  });
}

export function uploadAdminMedia(formData) {
  return adminRequest("/api/admin/media", {
    method: "POST",
    body: formData
  });
}
