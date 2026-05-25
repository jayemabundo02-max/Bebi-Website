import { getAnniversaryDetails, getNextMonthsary } from "../utils/dateUtils.js";

import asyncHandler from "../middleware/asyncHandler.js";

export const getRelationshipStatus = asyncHandler(async (req, res) => {
  const now = new Date();
  const startDate = new Date(process.env.RELATIONSHIP_START_DATE || "2024-12-08");
  const dayMs = 24 * 60 * 60 * 1000;
  const daysTogether = Math.max(0, Math.floor((now - startDate) / dayMs));
  const anniversary = getAnniversaryDetails(now);

  res.json({
    startDate,
    daysTogether,
    nextMonthsary: getNextMonthsary(now, Number(process.env.ANNIVERSARY_DAY || 8)),
    anniversary
  });
});
