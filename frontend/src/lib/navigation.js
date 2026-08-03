/**
 * Desktop mega/dropdown menu data for Tüketiciler Birliği.
 * Real routes use existing paths; placeholders use "#" (non-navigating).
 */
export const navigationMenu = [
  {
    item: "Anasayfa",
    href: "/"
  },
  {
    item: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/kurumsal" },
      { label: "Misyon ve Vizyon", href: "#" },
      { label: "Yönetim Kurulu", href: "#" },
      { label: "Organizasyon Şeması", href: "#" },
      {
        label: "Mevzuat",
        href: "#",
        submenu: [
          { label: "Kanunlar", href: "#" },
          { label: "Yönetmelikler", href: "#" },
          { label: "Esas ve Usuller", href: "#" },
          { label: "Yönergeler", href: "#" }
        ]
      },
      {
        label: "Stratejik Yönetim",
        href: "#",
        submenu: [
          { label: "Stratejik Plan", href: "#" },
          { label: "Performans Programı", href: "#" },
          { label: "Faaliyet Raporları", href: "#" }
        ]
      },
      { label: "Kariyer", href: "#" }
    ]
  },
  {
    item: "Hak Rehberleri",
    href: "/hak-rehberleri",
    links: [
      { label: "Tüm Rehberler", href: "/hak-rehberleri" },
      { label: "Ayıplı Mal ve Hizmet", href: "#" },
      { label: "Cayma Hakkı", href: "#" },
      { label: "Mesafeli Satış", href: "#" },
      { label: "Garanti, İade ve Değişim", href: "#" },
      { label: "Tüketici Kredileri", href: "#" }
    ]
  },
  {
    item: "Başvurular",
    links: [
      { label: "Başvuru Rehberi", href: "/basvuru-rehberi" },
      { label: "Online Ön Başvuru", href: "/basvuru-rehberi" },
      { label: "Başvuru Süreci", href: "#" },
      { label: "Gerekli Belgeler", href: "#" },
      { label: "Sıkça Sorulan Sorular", href: "/sss" }
    ]
  },
  {
    item: "Yayınlar",
    links: [
      { label: "Haberler", href: "/haberler" },
      { label: "Duyurular", href: "/duyurular" },
      { label: "Raporlar", href: "#" },
      { label: "Broşür ve Yayınlar", href: "#" },
      { label: "İstatistikler", href: "#" }
    ]
  },
  {
    item: "Basın Odası",
    links: [
      { label: "Basın Bültenleri", href: "#" },
      { label: "Medya Kiti", href: "#" },
      { label: "Görsel Arşiv", href: "#" },
      { label: "Basın İletişim", href: "/iletisim" }
    ]
  },
  {
    item: "İletişim",
    href: "/iletisim"
  }
];

/** Flat links used by search, footer and mobile fallbacks (real routes only). */
export const publicNavigation = [
  { key: "home", href: "/", title: "Anasayfa" },
  { key: "corporate", href: "/kurumsal", title: "Kurumsal" },
  { key: "guides", href: "/hak-rehberleri", title: "Hak Rehberleri" },
  { key: "news", href: "/haberler", title: "Haberler" },
  { key: "announcements", href: "/duyurular", title: "Duyurular" },
  { key: "applicationGuide", href: "/basvuru-rehberi", title: "Başvuru Rehberi" },
  { key: "contact", href: "/iletisim", title: "İletişim" }
];

export const adminNavigation = [
  { title: "Özet", href: "/admin" },
  { title: "İçerikler", href: "/admin/icerikler" },
  { title: "Formlar", href: "/admin/formlar" },
  { title: "Medya", href: "/admin/medya" },
  { title: "Ayarlar", href: "/admin/ayarlar" },
  { title: "Kullanıcılar", href: "/admin/kullanicilar" }
];
