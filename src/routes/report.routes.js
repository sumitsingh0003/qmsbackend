const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const c = require("../controllers/report.controller");

router.post("/", auth, role("SUPER_ADMIN", "ADMIN", "VENDOR", "USER"),
  upload.array("report-images"),
  c.createReport
);

router.get("/", auth, c.getReports);

module.exports = router;
