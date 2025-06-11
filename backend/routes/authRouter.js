const { Signup, Login, verifyEmail } = require("../controllers/authController");
const router = require("express").Router();
const { verifyUser } = require("../middlewares/authMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/verify-email", verifyEmail);
router.post("/", verifyUser);

module.exports = router;
