export const sendEmailNotification = async ({ subject, message }) => {
  if (!process.env.EMAIL_TO) {
    return { skipped: true, reason: "EMAIL_TO is not configured." };
  }

  console.log(`Email notification queued: ${subject} - ${message}`);
  return { skipped: false };
};
