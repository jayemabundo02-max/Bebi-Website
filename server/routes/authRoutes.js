import express from "express";
import { login, me } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { loginRateLimit } from "../middleware/loginRateLimit.js";

const router = express.Router();

router.post("/login", loginRateLimit, login);
router.get("/me", protect, me);

export default router;
import express from "express";
import { getMe, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
