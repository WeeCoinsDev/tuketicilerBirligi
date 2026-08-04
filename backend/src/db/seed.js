const bcrypt = require("bcryptjs");
const env = require("../config/env");
const pool = require("./pool");
const { slugify } = require("../utils/clean");
const { getProvinceName } = require("../constants/provinces");

const settings = [
  ["tr", "organizationName", "Tüketiciler Birliği", "string"],
  ["tr", "shortName", "Tüketiciler Birliği", "string"],
  [
    "tr",
    "description",
    "Kurum tanıtımı, ekip ve çalışma alanları için özgün metinler içerik ekibi tarafından hazırlanacaktır.",
    "string"
  ],
  ["tr", "phone", "Telefon bilgisi eklenecek", "string"],
  ["tr", "email", "iletisim@ornek-domain.org", "string"],
  ["tr", "kep", "KEP adresi eklenecek", "string"],
  ["tr", "address", "Açık adres bilgisi eklenecek", "string"],
  ["tr", "workingHours", "Hafta içi çalışma saatleri eklenecek", "string"],
  ["tr", "mapQuery", "Ankara", "string"],
  ["tr", "socialLinks", JSON.stringify({ x: "", facebook: "", instagram: "", youtube: "" }), "json"]
];

const contents = [
  {
    type: "guide",
    title: "Ayıplı Mal ve Hizmet Başvuruları",
    summary:
      "Bu rehberin nihai metni hukuk ve içerik ekibi tarafından özgün olarak hazırlanacaktır.",
    body:
      "İçerik ekibi notu: Başvuru şartları, gerekli belgeler, süreler ve tüketicinin izleyeceği adımlar sade bir dille anlatılmalıdır.",
    isFeatured: true
  },
  {
    type: "guide",
    title: "Mesafeli Satışlarda Cayma Hakkı",
    summary:
      "E-ticaret alışverişlerinde cayma hakkına dair özgün kurum içeriği için yer tutucu.",
    body:
      "İçerik ekibi notu: Cayma hakkı süresi, istisnalar, iade süreci ve başvuru kanalları netleştirilmelidir.",
    isFeatured: true
  },
  {
    type: "news",
    title: "Tüketici Hakları Bilgilendirme İçerikleri Hazırlanıyor",
    summary:
      "Haber alanı için örnek kayıt. Yayına alınmadan önce kurumun gerçek haberiyle değiştirilmelidir.",
    body:
      "Bu alan, kurumun güncel haber ve faaliyet metinleri için ayrılmıştır. Görseller ve metinler ekip tarafından sağlanacaktır.",
    isFeatured: true
  },
  {
    type: "announcement",
    title: "İletişim Kanalları Güncellenecek",
    summary:
      "Telefon, e-posta, KEP, adres ve sosyal medya bilgileri admin panelinden tamamlanmalıdır.",
    body:
      "İletişim bilgilerinin açık, doğrulanmış ve her sayfadan erişilebilir olması ilk sürümün ana kabul kriteridir.",
    isFeatured: true
  },
  {
    type: "faq",
    title: "Başvuru için ücret ödenir mi?",
    summary:
      "Bu cevap kurumun resmi prosedürüne göre içerik ekibi tarafından netleştirilmelidir.",
    body:
      "İçerik ekibi notu: Başvuru ücreti, belge gereklilikleri ve başvuru sonrasında izlenecek süreç açık şekilde yazılmalıdır.",
    isFeatured: false
  }
];

const heroSlides = [
  {
    titleTr: "Tüketici Hakları Bilgilendirme İçerikleri Hazırlanıyor",
    titleEn: "Consumer Rights Information Content Is Being Prepared",
    summaryTr:
      "Hero alanı için örnek Türkçe kayıt. Yönetim panelinden gerçek metin ve görselle güncellenmelidir.",
    summaryEn:
      "Sample English record for the hero area. It should be replaced with the real copy and image from the admin panel.",
    ctaLabelTr: "Devamını Oku",
    ctaLabelEn: "Read More",
    ctaHref: "/haberler/tuketici-haklari-bilgilendirme-icerikleri-hazirlaniyor",
    sortOrder: 0
  },
  {
    titleTr: "Başvuru Rehberi İçeriği Editoryal Olarak Yönetilecek",
    titleEn: "Application Guide Content Will Be Managed Editorially",
    summaryTr:
      "Hero slaytları artık içerik tiplerinden türetilmek yerine ayrı bir yönetim ekranı üzerinden düzenlenebilir olacak.",
    summaryEn:
      "Hero slides will no longer be inferred from content types and will instead be manageable from a dedicated admin screen.",
    ctaLabelTr: "Başvuru Rehberi",
    ctaLabelEn: "Application Guide",
    ctaHref: "/basvuru-rehberi",
    sortOrder: 1
  }
];

const provinceMapEntries = [
  {
    provinceCode: 6,
    category: "news",
    title: "Ankara'da tüketici hakları bilgilendirme çalışması",
    summary: "Başkentte tüketici başvuru yolları ve temel haklara yönelik bilgilendirme içeriği.",
    contentSlug: "tuketici-haklari-bilgilendirme-icerikleri-hazirlaniyor",
    linkLabel: "Habere git",
    eventDate: "2026-07-10",
    sortOrder: 0
  },
  {
    provinceCode: 34,
    category: "guide",
    title: "İstanbul için ayıplı mal başvuru rehberi",
    summary: "Ayıplı mal ve hizmet süreçlerinde izlenecek adımlar için il bazlı rehber bağlantısı.",
    contentSlug: "ayipli-mal-ve-hizmet-basvurulari",
    linkLabel: "Rehbere git",
    eventDate: "2026-07-01",
    sortOrder: 1
  },
  {
    provinceCode: 35,
    category: "guide",
    title: "İzmir'de mesafeli satışlarda cayma hakkı bilgilendirmesi",
    summary: "E-ticaret alışverişlerinde cayma hakkı ve iade sürecine dair özet içerik.",
    contentSlug: "mesafeli-satislarda-cayma-hakki",
    linkLabel: "Rehbere git",
    eventDate: "2026-07-02",
    sortOrder: 2
  },
  {
    provinceCode: 42,
    category: "activity",
    title: "Konya tüketici bilgilendirme buluşması",
    summary: "Tüketicilerin sık yaşadığı başvuru sorunlarına yönelik yerel bilgilendirme kaydı.",
    contentSlug: "tuketici-haklari-bilgilendirme-icerikleri-hazirlaniyor",
    linkLabel: "Habere git",
    eventDate: "2026-07-12",
    sortOrder: 3
  },
  {
    provinceCode: 16,
    category: "announcement",
    title: "Bursa iletişim kanalları duyurusu",
    summary: "Başvuru ve iletişim kanallarının güncellenmesine dair duyuru bağlantısı.",
    contentSlug: "iletisim-kanallari-guncellenecek",
    linkLabel: "Duyuruya git",
    eventDate: "2026-07-12",
    sortOrder: 4
  }
];

async function upsertUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, 12);

  await pool.execute(
    `INSERT INTO admin_users (name, email, password_hash, role)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), is_active = 1`,
    [name, email, passwordHash, role]
  );
}

async function seedSettings() {
  for (const [locale, keyName, value, valueType] of settings) {
    await pool.execute(
      `INSERT INTO site_settings (locale, key_name, value, value_type)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE value = VALUES(value), value_type = VALUES(value_type)`,
      [locale, keyName, value, valueType]
    );
  }
}

async function seedContent() {
  for (const item of contents) {
    const slug = slugify(item.title);

    await pool.execute(
      `INSERT INTO content_items
        (type, locale, title, slug, summary, body, status, is_featured, published_at, meta_title, meta_description)
       VALUES (?, 'tr', ?, ?, ?, ?, 'published', ?, NOW(), ?, ?)
       ON DUPLICATE KEY UPDATE
        summary = VALUES(summary),
        body = VALUES(body),
        status = VALUES(status),
        is_featured = VALUES(is_featured),
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description)`,
      [
        item.type,
        item.title,
        slug,
        item.summary,
        item.body,
        item.isFeatured ? 1 : 0,
        item.title,
        item.summary
      ]
    );
  }
}

async function seedHeroSlides() {
  const [heroRows] = await pool.execute(
    `SELECT id FROM hero_slides
     ORDER BY id ASC
     LIMIT 1`
  );

  if (heroRows[0]) {
    return;
  }

  const [mediaRows] = await pool.execute(
    `SELECT id FROM media_assets
     ORDER BY created_at ASC, id ASC
     LIMIT 1`
  );

  if (!mediaRows[0]) {
    return;
  }

  for (const item of heroSlides) {
    await pool.execute(
      `INSERT INTO hero_slides
        (title_tr, title_en, summary_tr, summary_en, cta_label_tr, cta_label_en, cta_href, media_id, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [
        item.titleTr,
        item.titleEn,
        item.summaryTr,
        item.summaryEn,
        item.ctaLabelTr,
        item.ctaLabelEn,
        item.ctaHref,
        mediaRows[0].id,
        item.sortOrder
      ]
    );
  }
}

async function seedProvinceMapEntries() {
  const [existingRows] = await pool.execute(
    `SELECT id FROM province_map_entries
     ORDER BY id ASC
     LIMIT 1`
  );

  if (existingRows[0]) {
    return;
  }

  for (const item of provinceMapEntries) {
    const [contentRows] = await pool.execute(
      `SELECT id
       FROM content_items
       WHERE locale = 'tr' AND slug = ?
       LIMIT 1`,
      [item.contentSlug]
    );

    await pool.execute(
      `INSERT INTO province_map_entries
        (locale, province_code, province_name, title, summary, category, content_item_id,
         link_label, event_date, status, sort_order)
       VALUES ('tr', ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`,
      [
        item.provinceCode,
        getProvinceName(item.provinceCode),
        item.title,
        item.summary,
        item.category,
        contentRows[0]?.id || null,
        item.linkLabel,
        item.eventDate,
        item.sortOrder
      ]
    );
  }
}

async function seed() {
  await upsertUser({
    name: "Sistem Yöneticisi",
    email: env.seed.adminEmail,
    password: env.seed.adminPassword,
    role: "super_admin"
  });

  await upsertUser({
    name: "İçerik Editörü",
    email: env.seed.editorEmail,
    password: env.seed.editorPassword,
    role: "editor"
  });

  await seedSettings();
  await seedContent();
  await seedHeroSlides();
  await seedProvinceMapEntries();
}

if (require.main === module) {
  seed()
    .then(async () => {
      console.log("Seed tamamlandı.");
      await pool.end();
    })
    .catch(async (error) => {
      console.error(error);
      await pool.end();
      process.exit(1);
    });
}

module.exports = seed;
