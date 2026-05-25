import Notification from "../models/Notification.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { assert } from "../utils/httpError.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 30, 80);
  const filter = req.query.unread === "true" ? { isRead: false } : {};
  const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(limit).lean();

  res.json({ data: notifications, meta: { total: notifications.length } });
});

export const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  assert(notification, 404, "Notification not found.");

  res.json({ data: notification });
});
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({})
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(req.query.limit) || 20, 50));

  res.json({ notifications });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid notification id.");
  }

  const reader = req.user?.displayName || "Bebi";
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { readBy: reader } },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found.");
  }

  res.json({ notification });
});
