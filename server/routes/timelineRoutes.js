import { requireDatabase } from "../middleware/databaseMiddleware.js";

import express from "express";
import {
  createTimelineEvent,
  deleteTimelineEvent,
  getTimelineEvents,
  updateTimelineEvent
} from "../controllers/timelineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router.route("/").get(getTimelineEvents).post(createTimelineEvent);
router.route("/:id").patch(updateTimelineEvent).delete(deleteTimelineEvent);

export default router;
