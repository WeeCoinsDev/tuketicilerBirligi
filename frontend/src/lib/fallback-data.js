export const fallbackSettings = {
  locale: "tr",
  organizationName: "Tüketiciler Birliği",
  shortName: "Tüketiciler Birliği",
  description:
    "Kurum tanıtımı, ekip ve çalışma alanları için özgün metinler içerik ekibi tarafından hazırlanacaktır.",
  phone: "Telefon bilgisi eklenecek",
  email: "iletisim@ornek-domain.org",
  kep: "KEP adresi eklenecek",
  address: "Açık adres bilgisi eklenecek",
  workingHours: "Hafta içi çalışma saatleri eklenecek",
  mapQuery: "Ankara",
  socialLinks: {
    x: "",
    facebook: "",
    instagram: "",
    youtube: ""
  }
};

export const fallbackContents = [
  {
    id: 1,
    type: "guide",
    locale: "tr",
    title: "Ayıplı Mal ve Hizmet Başvuruları",
    slug: "ayipli-mal-ve-hizmet-basvurulari",
    summary:
      "Bu rehberin nihai metni hukuk ve içerik ekibi tarafından özgün olarak hazırlanacaktır.",
    body:
      "İçerik ekibi notu: Başvuru şartları, gerekli belgeler, süreler ve tüketicinin izleyeceği adımlar sade bir dille anlatılmalıdır.",
    status: "published",
    is_featured: true,
    published_at: "2026-07-01T09:00:00.000Z"
  },
  {
    id: 2,
    type: "guide",
    locale: "tr",
    title: "Mesafeli Satışlarda Cayma Hakkı",
    slug: "mesafeli-satislarda-cayma-hakki",
    summary:
      "E-ticaret alışverişlerinde cayma hakkına dair özgün kurum içeriği için yer tutucu.",
    body:
      "İçerik ekibi notu: Cayma hakkı süresi, istisnalar, iade süreci ve başvuru kanalları netleştirilmelidir.",
    status: "published",
    is_featured: true,
    published_at: "2026-07-02T09:00:00.000Z"
  },
  {
    id: 3,
    type: "news",
    locale: "tr",
    title: "Tüketici Hakları Bilgilendirme İçerikleri Hazırlanıyor",
    slug: "tuketici-haklari-bilgilendirme-icerikleri-hazirlaniyor",
    summary:
      "Haber alanı için örnek kayıt. Yayına alınmadan önce kurumun gerçek haberiyle değiştirilmelidir.",
    body:
      "Bu alan, kurumun güncel haber ve faaliyet metinleri için ayrılmıştır. Görseller ve metinler ekip tarafından sağlanacaktır.",
    status: "published",
    is_featured: true,
    published_at: "2026-07-10T09:00:00.000Z"
  },
  {
    id: 4,
    type: "announcement",
    locale: "tr",
    title: "İletişim Kanalları Güncellenecek",
    slug: "iletisim-kanallari-guncellenecek",
    summary:
      "Telefon, e-posta, KEP, adres ve sosyal medya bilgileri admin panelinden tamamlanmalıdır.",
    body:
      "İletişim bilgilerinin açık, doğrulanmış ve her sayfadan erişilebilir olması ilk sürümün ana kabul kriteridir.",
    status: "published",
    is_featured: true,
    published_at: "2026-07-12T09:00:00.000Z"
  },
  {
    id: 5,
    type: "faq",
    locale: "tr",
    title: "Başvuru için ücret ödenir mi?",
    slug: "basvuru-icin-ucret-odenir-mi",
    summary:
      "Bu cevap kurumun resmi prosedürüne göre içerik ekibi tarafından netleştirilmelidir.",
    body:
      "İçerik ekibi notu: Başvuru ücreti, belge gereklilikleri ve başvuru sonrasında izlenecek süreç açık şekilde yazılmalıdır.",
    status: "published",
    is_featured: false,
    published_at: "2026-07-12T09:00:00.000Z"
  }
];

export function getFallbackContent(type) {
  return fallbackContents.filter((content) => content.type === type);
}

export function getFallbackHeroSlides(locale = "tr") {
  const isEnglish = locale === "en";

  return [
    {
      id: "fallback-hero-1",
      title: isEnglish
        ? "Consumer Rights Information Content Is Being Prepared"
        : "Tüketici Hakları Bilgilendirme İçerikleri Hazırlanıyor",
      summary: isEnglish
        ? "Sample hero content for the homepage. It should be replaced with real editorial copy from the admin panel."
        : "Ana sayfa için örnek hero içeriği. Yönetim panelinden gerçek editoryal içerikle güncellenmelidir.",
      ctaLabel: isEnglish ? "Read More" : "Devamını Oku",
      href: isEnglish
        ? "/news/tuketici-haklari-bilgilendirme-icerikleri-hazirlaniyor"
        : "/haberler/tuketici-haklari-bilgilendirme-icerikleri-hazirlaniyor",
      image: null
    },
    {
      id: "fallback-hero-2",
      title: isEnglish
        ? "Application Guidance Will Be Managed From The Admin Panel"
        : "Başvuru Rehberi İçeriği Yönetim Panelinden Yönetilecek",
      summary: isEnglish
        ? "Hero slides will become independently manageable with bilingual copy, image selection, and ordering."
        : "Hero slaytları çift dilli metin, görsel seçimi ve sıralama desteğiyle bağımsız olarak yönetilebilecek.",
      ctaLabel: isEnglish ? "Application Guide" : "Başvuru Rehberi",
      href: "/basvuru-rehberi",
      image: null
    }
  ];
}

