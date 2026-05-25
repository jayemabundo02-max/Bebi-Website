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
