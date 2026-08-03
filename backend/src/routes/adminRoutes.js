const express = require("express");
const adminContentController = require("../controllers/adminContentController");
const formSubmissionController = require("../controllers/formSubmissionController");
const mediaController = require("../controllers/mediaController");
const settingsController = require("../controllers/settingsController");
const userController = require("../controllers/userController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.use(requireAuth);

router.get("/content", adminContentController.listContent);
router.post("/content", adminContentController.createContent);
router.patch("/content/:id", adminContentController.updateContent);
router.delete("/content/:id", adminContentController.deleteContent);

router.get("/media", mediaController.listMedia);
router.post("/media", upload.single("file"), mediaController.uploadMedia);
router.delete("/media/:id", mediaController.deleteMedia);

router.get("/settings", settingsController.listSettings);
router.patch("/settings", settingsController.updateSettings);

router.get("/form-submissions", formSubmissionController.listSubmissions);
router.patch("/form-submissions/:id", formSubmissionController.updateSubmission);

router.get("/users", requireRole(["super_admin"]), userController.listUsers);
router.post("/users", requireRole(["super_admin"]), userController.createUser);
router.patch("/users/:id", requireRole(["super_admin"]), userController.updateUser);

module.exports = router;

