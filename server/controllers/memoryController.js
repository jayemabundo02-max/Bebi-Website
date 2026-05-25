import { getMonthKey } from "../utils/dateUtils.js";

import mongoose from "mongoose";
import Memory from "../models/Memory.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { toPublicFileUrl } from "../middleware/uploadMiddleware.js";
import { createNotification } from "../services/notificationService.js";

export const getMemories = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.monthKey) {
    query.monthKey = req.query.monthKey;
  }

  const memories = await Memory.find(query).sort({ date: -1 }).limit(100);
  res.json({ memories });
});

export const createMemory = asyncHandler(async (req, res) => {
  const memoryDate = req.body.date ? new Date(req.body.date) : new Date();

  if (Number.isNaN(memoryDate.getTime())) {
    res.status(400);
    throw new Error("Memory date is invalid.");
  }

  const memory = await Memory.create({
    title: req.body.title,
    caption: req.body.caption,
    imageUrl: toPublicFileUrl(req.file) || req.body.imageUrl,
    date: memoryDate,
    relationshipDate: req.body.relationshipDate || memoryDate,
    userId: req.user?.id || "private-archive",
    monthKey: req.body.monthKey || getMonthKey(memoryDate),
    milestoneType: req.body.milestoneType || "ordinary",
    createdBy: req.body.createdBy || req.user?.displayName || "Bebi"
  });

  await createNotification({
    title: "New memory added",
    message: `${memory.title} was added to your timeline.`,
    type: "memory",
    metadata: { memoryId: String(memory._id) }
  });

  res.status(201).json({ memory });
});

export const updateMemory = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid memory id.");
  }

  const updates = {
    title: req.body.title,
    caption: req.body.caption,
    date: req.body.date,
    relationshipDate: req.body.relationshipDate,
    monthKey: req.body.monthKey,
    milestoneType: req.body.milestoneType
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const memory = await Memory.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!memory) {
    res.status(404);
    throw new Error("Memory not found.");
  }

  res.json({ memory });
});

export const deleteMemory = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid memory id.");
  }

  const memory = await Memory.findByIdAndDelete(req.params.id);

  if (!memory) {
    res.status(404);
    throw new Error("Memory not found.");
  }

  res.json({ message: "Memory deleted." });
});
