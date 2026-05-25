import { getMonthKey } from "../utils/dateUtils.js";

import mongoose from "mongoose";
import Timeline from "../models/Timeline.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getTimelineEvents = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.type) {
    query.type = req.query.type;
  }

  const events = await Timeline.find(query).sort({ eventDate: -1 }).limit(120);
  res.json({ events });
});

export const createTimelineEvent = asyncHandler(async (req, res) => {
  const eventDate = req.body.eventDate ? new Date(req.body.eventDate) : new Date();

  if (Number.isNaN(eventDate.getTime())) {
    res.status(400);
    throw new Error("Timeline event date is invalid.");
  }

  const event = await Timeline.create({
    title: req.body.title,
    description: req.body.description,
    eventDate,
    relationshipDate: req.body.relationshipDate || eventDate,
    userId: req.user?.id || "private-archive",
    monthKey: req.body.monthKey || getMonthKey(eventDate),
    type: req.body.type || "custom",
    icon: req.body.icon,
    createdBy: req.body.createdBy || req.user?.displayName || "Bebi"
  });

  res.status(201).json({ event });
});

export const updateTimelineEvent = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid timeline event id.");
  }

  const updates = {
    title: req.body.title,
    description: req.body.description,
    eventDate: req.body.eventDate,
    relationshipDate: req.body.relationshipDate,
    monthKey: req.body.monthKey,
    type: req.body.type,
    icon: req.body.icon
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const event = await Timeline.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!event) {
    res.status(404);
    throw new Error("Timeline event not found.");
  }

  res.json({ event });
});

export const deleteTimelineEvent = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid timeline event id.");
  }

  const event = await Timeline.findByIdAndDelete(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Timeline event not found.");
  }

  res.json({ message: "Timeline event deleted." });
});
