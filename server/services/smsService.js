export const sendSmsNotification = async (notification) => {
  const webhookUrl = process.env.NOTIFICATION_SMS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { skipped: true, channel: "sms" };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: process.env.NOTIFICATION_SMS_TO,
      message: `${notification.title}: ${notification.body}`,
      metadata: notification.metadata
    })
  });

  if (!response.ok) {
    throw new Error(`SMS webhook failed with ${response.status}`);
  }

  return { skipped: false, channel: "sms" };
};
