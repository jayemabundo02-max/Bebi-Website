const postWebhook = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Notification webhook failed with ${response.status}`);
  }
};

export const sendEmailNotification = async (notification) => {
  const webhookUrl = process.env.NOTIFICATION_EMAIL_WEBHOOK_URL;

  if (!webhookUrl) {
    return { skipped: true, channel: "email" };
  }

  await postWebhook(webhookUrl, {
    to: process.env.NOTIFICATION_EMAIL_TO,
    subject: notification.title,
    text: notification.body,
    metadata: notification.metadata
  });

  return { skipped: false, channel: "email" };
};
export const sendEmailNotification = async ({ subject, message }) => {
  if (!process.env.EMAIL_TO) {
    return { skipped: true, reason: "EMAIL_TO is not configured." };
  }

  console.log(`Email notification queued: ${subject} - ${message}`);
  return { skipped: false };
};
