import { absoluteUrl } from "@/lib/utils";

export default function sitemap() {
  return [
    "",
    "/kurumsal",
    "/hak-rehberleri",
    "/haberler",
    "/duyurular",
    "/basvuru-rehberi",
    "/sss",
    "/iletisim",
    "/gizlilik",
    "/aydinlatma-metni"
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date()
  }));
}

