const express = require("express");
const publicController = require("../controllers/publicController");
const { publicFormLimiter } = require("../middlewares/rateLimiters");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/site-settings", publicController.getSiteSettings);
router.get("/home", publicController.getHome);
router.get("/content", publicController.getContentList);
router.get("/content/:slug", publicController.getContentBySlug);
router.post("/contact", publicFormLimiter, publicController.createContact);
router.post(
  "/pre-applications",
  publicFormLimiter,
  upload.array("files", 5),
  publicController.createPreApplication
);

module.exports = router;

