import { getPublicUploadUrl } from "../middleware/uploadMiddleware.js";
import Memory from "../models/Memory.js";
import Timeline from "../models/Timeline.js";
import { createAndDispatchNotification } from "../services/notificationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

const getPagination = (query) => {
  const limit = Math.min(Number(query.limit) || 24, 60);
  const page = Math.max(Number(query.page) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
};

export const getMemories = asyncHandler(async (req, res) => {
  const { limit, page, skip } = getPagination(req.query);
  const filter = {};

  if (req.query.monthKey) filter.monthKey = req.query.monthKey;
  if (req.query.milestone === "true") filter.milestone = true;

  const [items, total] = await Promise.all([
    Memory.find(filter).sort({ date: -1 }).skip(skip).limit(limit).lean(),
    Memory.countDocuments(filter)
  ]);

  res.json({ data: items, meta: { limit, page, total } });
});

export const createMemory = asyncHandler(async (req, res) => {
  assert(req.body.title, 400, "Memory title is required.");
  assert(req.body.caption, 400, "Memory caption is required.");
  assert(req.body.date, 400, "Memory date is required.");

  const memory = await Memory.create({
    caption: req.body.caption,
    date: req.body.date,
    imageUrl: getPublicUploadUrl(req.file),
    milestone: req.body.milestone === "true",
    title: req.body.title
  });

  if (memory.milestone) {
    await Timeline.create({
      description: memory.caption,
      eventDate: memory.date,
      title: memory.title,
      type: "milestone"
    });
  }

  await createAndDispatchNotification({
    body: `${memory.title} was added to memories.`,
    metadata: { memoryId: memory._id },
    title: "New memory added",
    type: "memory"
  });

  res.status(201).json({ data: memory });
});

export const deleteMemory = asyncHandler(async (req, res) => {
  const memory = await Memory.findByIdAndDelete(req.params.id);
  assert(memory, 404, "Memory not found.");

  res.json({ data: { id: req.params.id } });
});
import mongoose from "mongoose";
import Memory from "../models/Memory.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { toPublicFileUrl } from "../middleware/uploadMiddleware.js";
import { createNotification } from "../services/notificationService.js";
import { getMonthKey } from "../utils/dateUtils.js";

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
