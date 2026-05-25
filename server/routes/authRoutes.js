import { protect } from "../middleware/authMiddleware.js";

import express from "express";
import { getMe, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
