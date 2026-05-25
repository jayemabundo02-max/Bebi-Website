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
