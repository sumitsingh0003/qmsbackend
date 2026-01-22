const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// TEMP APIs (taaki server start ho)
router.get("/", auth, role("ADMIN", "SUPER_ADMIN"), (req, res) => {
  res.json({ success: true, message: "Vendor route working" });
});

module.exports = router;
