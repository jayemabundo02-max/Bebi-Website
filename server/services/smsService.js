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
export const sendSmsNotification = async ({ message }) => {
  if (!process.env.SMS_TO) {
    return { skipped: true, reason: "SMS_TO is not configured." };
  }

  console.log(`SMS notification queued: ${message}`);
  return { skipped: false };
};
