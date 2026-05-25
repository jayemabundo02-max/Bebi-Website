export const sendSmsNotification = async ({ message }) => {
  if (!process.env.SMS_TO) {
    return { skipped: true, reason: "SMS_TO is not configured." };
  }

  console.log(`SMS notification queued: ${message}`);
  return { skipped: false };
};
