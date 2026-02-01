const router = require("express").Router();
const c = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/user-register", c.register);
router.post("/user-login", c.login);
router.post("/refresh-token", c.refreshToken);
// 🔐 Logout
router.post("/user-logout", auth, c.logout);

module.exports = router;
