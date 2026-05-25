import Timeline from "../models/Timeline.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

export const getTimeline = asyncHandler(async (_req, res) => {
  const items = await Timeline.find().sort({ eventDate: 1 }).lean();
  res.json({ data: items, meta: { total: items.length } });
});

export const createTimelineEvent = asyncHandler(async (req, res) => {
  assert(req.body.title, 400, "Timeline title is required.");
  assert(req.body.description, 400, "Timeline description is required.");
  assert(req.body.eventDate, 400, "Timeline event date is required.");

  const event = await Timeline.create({
    description: req.body.description,
    eventDate: req.body.eventDate,
    title: req.body.title,
    type: req.body.type || "custom"
  });

  res.status(201).json({ data: event });
});
