export const sendPushNotification = async (notification) => {
  const webhookUrl = process.env.NOTIFICATION_PUSH_WEBHOOK_URL;

  if (!webhookUrl) {
    return { skipped: true, channel: "push" };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification)
  });

  if (!response.ok) {
    throw new Error(`Push notification webhook failed with ${response.status}`);
  }

  return { skipped: false, channel: "push" };
};
