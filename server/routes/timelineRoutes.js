import express from "express";
import { createTimelineEvent, getTimeline } from "../controllers/timelineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getTimeline).post(createTimelineEvent);

export default router;
import express from "express";
import {
  createTimelineEvent,
  deleteTimelineEvent,
  getTimelineEvents,
  updateTimelineEvent
} from "../controllers/timelineController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireDatabase } from "../middleware/databaseMiddleware.js";

const router = express.Router();

router.use(protect, requireDatabase);

router.route("/").get(getTimelineEvents).post(createTimelineEvent);
router.route("/:id").patch(updateTimelineEvent).delete(deleteTimelineEvent);

export default router;
