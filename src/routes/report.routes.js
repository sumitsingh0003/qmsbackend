const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const c = require("../controllers/report.controller");

// CREATE report (with images)
router.post(
  "/",
  auth,
  role("SUPER_ADMIN", "ADMIN", "VENDOR", "USER"),
  upload.array("report-images"),
  c.createReport
);

// GET all reports
router.get("/", auth, c.getReports);

// GET single report by ID ✅
router.get("/:id", auth, c.getSingleReport);

// DELETE report by ID ✅
router.delete(
  "/:id",
  auth,
  // role("SUPER_ADMIN", "ADMIN"),
  c.deleteReport
);

module.exports = router;
