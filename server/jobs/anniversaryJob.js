import Anniversary from "../models/Anniversary.js";
import { createAndDispatchNotification } from "../services/notificationService.js";

const relationshipStart = () =>
  new Date(`${process.env.RELATIONSHIP_START_DATE || "2024-12-08"}T00:00:00`);

const getYearCount = (date) => {
  const start = relationshipStart();
  return Math.max(0, date.getFullYear() - start.getFullYear());
};

export const runAnniversaryJob = async (eventDate = new Date()) => {
  const normalizedDate = new Date(eventDate);
  normalizedDate.setHours(0, 0, 0, 0);

  const yearCount = getYearCount(normalizedDate);
  const event = await Anniversary.findOneAndUpdate(
    { eventDate: normalizedDate, type: "anniversary" },
    {
      $setOnInsert: {
        eventDate: normalizedDate,
        message: "Anniversary mode is live. Review the recap and save today's memory.",
        title: "Happy anniversary",
        type: "anniversary",
        yearCount
      },
      $set: { processedAt: new Date() }
    },
    { new: true, setDefaultsOnInsert: true, upsert: true }
  );

  await createAndDispatchNotification({
    body: event.message,
    metadata: { eventId: event._id, yearCount },
    title: event.title,
    type: "anniversary"
  });

  return event;
};
import { handleDailyRelationshipEvents } from "../services/anniversaryScheduler.js";

export const runAnniversaryJob = async () => {
  return handleDailyRelationshipEvents();
};
