const { z } = require("zod");
const { saveUploadedFile } = require("../helpers/mediaStorage");
const pool = require("../db/pool");
const asyncHandler = require("../utils/asyncHandler");
const { parseJson } = require("../utils/clean");
const { validateUploadFile } = require("../utils/validateImage");

const contactSchema = z.object({
  fullName: z.string().trim().min(3).max(160),
  email: z.string().trim().email().max(190),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(220),
  message: z.string().trim().min(20).max(5000),
  privacy: z.union([z.literal(true), z.literal("true")]),
  companyName: z.string().optional()
});

const preApplicationSchema = z.object({
  fullName: z.string().trim().min(3).max(160),
  email: z.string().trim().email().max(190),
  phone: z.string().trim().min(7).max(40),
  category: z.string().trim().min(2).max(120),
  subject: z.string().trim().min(3).max(220),
  message: z.string().trim().min(50).max(10000),
  privacy: z.union([z.literal(true), z.literal("true")]),
  companyName: z.string().optional()
});

function mapContent(row) {
  return {
    id: row.id,
    type: row.type,
    locale: row.locale,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    body: row.body,
    status: row.status,
    is_featured: Boolean(row.is_featured),
    published_at: row.published_at,
    meta_title: row.meta_title,
    meta_description: row.meta_description
  };
}

function mapHeroSlide(row, locale) {
  const isEnglish = locale === "en";

  return {
    id: row.id,
    title: isEnglish ? row.title_en : row.title_tr,
    summary: isEnglish ? row.summary_en : row.summary_tr,
    ctaLabel: isEnglish ? row.cta_label_en : row.cta_label_tr,
    href: row.cta_href,
    image: row.public_url
  };
}

async function readSettings(locale = "tr") {
  const [rows] = await pool.execute(
    `SELECT locale, key_name, value, value_type
     FROM site_settings
     WHERE locale IN ('global', ?)
     ORDER BY locale = ? DESC`,
    [locale, locale]
  );

  return rows.reduce(
    (settings, row) => {
      settings[row.key_name] =
        row.value_type === "json" ? parseJson(row.value, {}) : row.value;
      return settings;
    },
    { locale }
  );
}

const getSiteSettings = asyncHandler(async (req, res) => {
  const settings = await readSettings(req.query.locale || "tr");
  res.json({ settings });
});

const getHome = asyncHandler(async (req, res) => {
  const locale = req.query.locale || "tr";
  const settings = await readSettings(locale);
  const [heroRows] = await pool.execute(
    `SELECT hs.*, ma.public_url
     FROM hero_slides hs
     JOIN media_assets ma ON ma.id = hs.media_id
     WHERE hs.is_active = 1
     ORDER BY hs.sort_order ASC, hs.id ASC
     LIMIT 8`
  );

  const [contentRows] = await pool.execute(
    `SELECT * FROM content_items
     WHERE locale = ? AND status = 'published'
     ORDER BY is_featured DESC, published_at DESC, id DESC
     LIMIT 30`,
    [locale]
  );

  const items = contentRows.map(mapContent);

  res.json({
    settings,
    heroSlides: heroRows.map((row) => mapHeroSlide(row, locale)),
    guides: items.filter((item) => item.type === "guide").slice(0, 6),
    news: items.filter((item) => item.type === "news").slice(0, 6),
    announcements: items.filter((item) => item.type === "announcement").slice(0, 6)
  });
});

const getContentList = asyncHandler(async (req, res) => {
  const locale = req.query.locale || "tr";
  const type = req.query.type || "";
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 12), 1), 50);
  const offset = (page - 1) * limit;
  const params = [locale];
  let where = "WHERE locale = ? AND status = 'published'";

  if (type) {
    where += " AND type = ?";
    params.push(type);
  }

  const [rows] = await pool.query(
    `SELECT * FROM content_items
     ${where}
     ORDER BY sort_order ASC, published_at DESC, id DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  res.json({
    items: rows.map(mapContent),
    page,
    limit
  });
});

const getContentBySlug = asyncHandler(async (req, res) => {
  const locale = req.query.locale || "tr";
  const [rows] = await pool.execute(
    `SELECT * FROM content_items
     WHERE locale = ? AND slug = ? AND status = 'published'
     LIMIT 1`,
    [locale, req.params.slug]
  );

  if (!rows[0]) {
    return res.status(404).json({ message: "İçerik bulunamadı." });
  }

  return res.json({ item: mapContent(rows[0]) });
});

async function saveSubmission(values, formType, payload = {}) {
  const [result] = await pool.execute(
    `INSERT INTO form_submissions
      (form_type, subject, full_name, email, phone, category, message, payload_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      formType,
      values.subject,
      values.fullName,
      values.email,
      values.phone || null,
      values.category || null,
      values.message,
      JSON.stringify(payload)
    ]
  );

  return result.insertId;
}

const createContact = asyncHandler(async (req, res) => {
  const values = contactSchema.parse(req.body);

  if (values.companyName) {
    return res.status(202).json({ ok: true });
  }

  const id = await saveSubmission(values, "contact");
  return res.status(201).json({ id });
});

const createPreApplication = asyncHandler(async (req, res) => {
  const values = preApplicationSchema.parse(req.body);

  if (values.companyName) {
    return res.status(202).json({ ok: true });
  }

  const files = [];

  for (const file of req.files || []) {
    const validated = await validateUploadFile(file);
    const stored = await saveUploadedFile(validated, "pre-applications");
    files.push({
      originalName: file.originalname,
      mimeType: validated.mimetype,
      size: file.size,
      ...stored
    });
  }

  const id = await saveSubmission(values, "pre_application", { files });
  return res.status(201).json({ id });
});

module.exports = {
  createContact,
  createPreApplication,
  getContentBySlug,
  getContentList,
  getHome,
  getSiteSettings
};

