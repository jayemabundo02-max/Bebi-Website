import { getAnniversaryDetails, getNextMonthsary } from "../utils/dateUtils.js";

import { createNotification } from "./notificationService.js";
import { sendEmailNotification } from "./emailService.js";
import { sendSmsNotification } from "./smsService.js";

export const handleDailyRelationshipEvents = async () => {
  const now = new Date();
  const day = Number(process.env.ANNIVERSARY_DAY || 8);
  const anniversary = getAnniversaryDetails(now);

  if (now.getDate() === day) {
    const message = "Happy monthsary, love. A new month of memories is ready to begin.";
    await createNotification({
      title: "Happy Monthsary",
      message,
      type: "monthsary",
      metadata: { date: now.toISOString() }
    });
    await sendEmailNotification({ subject: "Happy Monthsary", message });
    await sendSmsNotification({ message });
  }

  if (anniversary.isToday) {
    const message = `Happy anniversary. Year ${anniversary.yearCount} of your story starts today.`;
    await createNotification({
      title: "Happy Anniversary",
      message,
      type: "anniversary",
      metadata: { yearCount: String(anniversary.yearCount) }
    });
    await sendEmailNotification({ subject: "Happy Anniversary", message });
    await sendSmsNotification({ message });
  }

  return {
    nextMonthsary: getNextMonthsary(now, day),
    anniversary
  };
};
