import { protect } from "../middleware/authMiddleware.js";

import express from "express";
import { getRelationshipStatus } from "../controllers/anniversaryController.js";

const router = express.Router();

router.get("/status", protect, getRelationshipStatus);

export default router;
