import Anniversary from "../models/Anniversary.js";
import { createAndDispatchNotification } from "../services/notificationService.js";

const startDate = () => new Date(`${process.env.RELATIONSHIP_START_DATE || "2024-12-08"}T00:00:00`);

const getMonthCount = (date) => {
  const start = startDate();
  return Math.max(0, (date.getFullYear() - start.getFullYear()) * 12 + date.getMonth() - start.getMonth());
};

export const runMonthsaryJob = async (eventDate = new Date()) => {
  const normalizedDate = new Date(eventDate);
  normalizedDate.setHours(0, 0, 0, 0);

  const monthCount = getMonthCount(normalizedDate);
  const event = await Anniversary.findOneAndUpdate(
    { eventDate: normalizedDate, type: "monthsary" },
    {
      $setOnInsert: {
        eventDate: normalizedDate,
        message: "A new monthsary has arrived. Add a letter, song, or memory to mark it.",
        monthCount,
        title: "Happy monthsary",
        type: "monthsary"
      },
      $set: { processedAt: new Date() }
    },
    { new: true, setDefaultsOnInsert: true, upsert: true }
  );

  await createAndDispatchNotification({
    body: event.message,
    metadata: { eventId: event._id, monthCount },
    title: event.title,
    type: "monthsary"
  });

  return event;
};
