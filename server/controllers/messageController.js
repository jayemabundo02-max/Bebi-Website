import Message from "../models/Message.js";
import { createAndDispatchNotification } from "../services/notificationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

const getPagination = (query) => {
  const limit = Math.min(Number(query.limit) || 24, 60);
  const page = Math.max(Number(query.page) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
};

export const getMessages = asyncHandler(async (req, res) => {
  const { limit, page, skip } = getPagination(req.query);
  const filter = req.query.monthKey ? { monthKey: req.query.monthKey } : {};

  const [items, total] = await Promise.all([
    Message.find(filter).sort({ isPinned: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Message.countDocuments(filter)
  ]);

  res.json({ data: items, meta: { limit, page, total } });
});

export const createMessage = asyncHandler(async (req, res) => {
  assert(req.body.title, 400, "Message title is required.");
  assert(req.body.body, 400, "Message body is required.");

  const message = await Message.create({
    authorName: req.body.authorName || "Bebi",
    body: req.body.body,
    isPinned: Boolean(req.body.isPinned),
    title: req.body.title
  });

  await createAndDispatchNotification({
    body: `${message.authorName} posted a new message.`,
    metadata: { messageId: message._id },
    title: "New message posted",
    type: "message"
  });

  res.status(201).json({ data: message });
});

export const updateMessage = asyncHandler(async (req, res) => {
  const updates = {
    ...(req.body.title !== undefined && { title: req.body.title }),
    ...(req.body.body !== undefined && { body: req.body.body }),
    ...(req.body.isPinned !== undefined && { isPinned: Boolean(req.body.isPinned) })
  };

  const message = await Message.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });
  assert(message, 404, "Message not found.");

  res.json({ data: message });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  assert(message, 404, "Message not found.");

  res.json({ data: { id: req.params.id } });
});
import mongoose from "mongoose";
import Message from "../models/Message.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createNotification } from "../services/notificationService.js";
import { getMonthKey } from "../utils/dateUtils.js";

export const getMessages = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.monthKey) {
    query.monthKey = req.query.monthKey;
  }

  const messages = await Message.find(query).sort({ isPinned: -1, createdAt: -1 }).limit(100);
  res.json({ messages });
});

export const createMessage = asyncHandler(async (req, res) => {
  const message = await Message.create({
    title: req.body.title,
    body: req.body.body,
    authorName: req.body.authorName || req.user?.displayName || "Bebi",
    monthKey: req.body.monthKey || getMonthKey(),
    isPinned: req.body.isPinned === true || req.body.isPinned === "true"
  });

  await createNotification({
    title: "New message posted",
    message: `${message.authorName} added a new letter.`,
    type: "message",
    metadata: { messageId: String(message._id) }
  });

  res.status(201).json({ message });
});

export const updateMessage = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid message id.");
  }

  const updates = {
    title: req.body.title,
    body: req.body.body,
    authorName: req.body.authorName,
    monthKey: req.body.monthKey,
    isPinned: req.body.isPinned
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const message = await Message.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!message) {
    res.status(404);
    throw new Error("Message not found.");
  }

  res.json({ message });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid message id.");
  }

  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found.");
  }

  res.json({ message: "Message deleted." });
});
