import Notification from "../models/Notification.js";

import mongoose from "mongoose";

export const createNotification = async ({ title, message, type = "system", metadata = {} }) => {
  if (mongoose.connection.readyState !== 1) {
    return null;
  }

  return Notification.create({
    title,
    message,
    type,
    metadata,
    deliveredAt: new Date()
  });
};

export const listNotifications = async ({ limit = 20 } = {}) => {
  return Notification.find({})
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit) || 20, 50));
};
