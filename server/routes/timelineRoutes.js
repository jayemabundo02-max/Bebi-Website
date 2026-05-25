import express from "express";
import { createTimelineEvent, getTimeline } from "../controllers/timelineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getTimeline).post(createTimelineEvent);

export default router;
