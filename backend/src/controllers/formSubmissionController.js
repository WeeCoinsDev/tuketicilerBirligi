const { z } = require("zod");
const pool = require("../db/pool");
const asyncHandler = require("../utils/asyncHandler");
const { parseJson } = require("../utils/clean");
const httpError = require("../utils/httpError");

const updateSchema = z.object({
  status: z.enum(["new", "in_review", "resolved", "spam"])
});

function mapSubmission(row) {
  return {
    id: row.id,
    formType: row.form_type,
    status: row.status,
    subject: row.subject,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    category: row.category,
    message: row.message,
    payload: parseJson(row.payload_json, {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

const listSubmissions = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(
    `SELECT * FROM form_submissions
     ORDER BY created_at DESC, id DESC
     LIMIT 200`
  );

  res.json({ items: rows.map(mapSubmission) });
});

const updateSubmission = asyncHandler(async (req, res) => {
  const values = updateSchema.parse(req.body);
  const [result] = await pool.execute("UPDATE form_submissions SET status = ? WHERE id = ?", [
    values.status,
    req.params.id
  ]);

  if (!result.affectedRows) {
    throw httpError(404, "Form kaydı bulunamadı.");
  }

  res.json({ ok: true });
});

module.exports = {
  listSubmissions,
  updateSubmission
};

