import Anniversary from "../models/Anniversary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const startDate = () => new Date(`${process.env.RELATIONSHIP_START_DATE || "2024-12-08"}T00:00:00`);

const getRelationshipYears = (date = new Date()) => {
  const start = startDate();
  let years = date.getFullYear() - start.getFullYear();
  const hasPassed =
    date.getMonth() > start.getMonth() ||
    (date.getMonth() === start.getMonth() && date.getDate() >= start.getDate());

  if (!hasPassed) years -= 1;
  return Math.max(0, years);
};

const getNextMonthsary = (date = new Date()) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  if (next.getDate() >= 8) next.setMonth(next.getMonth() + 1);
  next.setDate(8);
  return next;
};

export const getEvents = asyncHandler(async (_req, res) => {
  const events = await Anniversary.find().sort({ eventDate: -1 }).limit(50).lean();
  res.json({ data: events, meta: { total: events.length } });
});

export const getStatus = asyncHandler(async (_req, res) => {
  const today = new Date();
  const nextMonthsary = getNextMonthsary(today);

  res.json({
    data: {
      isAnniversary: today.getMonth() === 11 && today.getDate() === 8,
      isMonthsary: today.getDate() === 8,
      nextMonthsary,
      relationshipYears: getRelationshipYears(today)
    }
  });
});
