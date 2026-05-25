import { getMonthKey } from "../utils/dateUtils.js";

import mongoose from "mongoose";
import Message from "../models/Message.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createNotification } from "../services/notificationService.js";

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
    userId: req.user?.id || "private-archive",
    monthKey: req.body.monthKey || getMonthKey(),
    relationshipDate: req.body.relationshipDate || new Date(),
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
    relationshipDate: req.body.relationshipDate,
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
