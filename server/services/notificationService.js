import Notification from "../models/Notification.js";
import { sendEmailNotification } from "./emailService.js";
import { sendPushNotification } from "./pushNotificationService.js";
import { sendSmsNotification } from "./smsService.js";

export const dispatchNotification = async (notification) => {
  const results = await Promise.allSettled([
    sendEmailNotification(notification),
    sendSmsNotification(notification),
    sendPushNotification(notification)
  ]);

  results
    .filter((result) => result.status === "rejected")
    .forEach((result) => console.warn(result.reason.message));

  return results;
};

export const createAndDispatchNotification = async ({ body, metadata = {}, title, type }) => {
  const notification = await Notification.create({
    body,
    metadata,
    recipientEmail: process.env.NOTIFICATION_EMAIL_TO || "",
    title,
    type
  });

  await dispatchNotification(notification.toObject());
  return notification;
};
import mongoose from "mongoose";
import Notification from "../models/Notification.js";

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
