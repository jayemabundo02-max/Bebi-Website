import { requireDatabase } from "../middleware/databaseMiddleware.js";

import express from "express";
import {
  getNotifications,
  markNotificationRead
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router.get("/", getNotifications);
router.patch("/:id/read", markNotificationRead);

export default router;
