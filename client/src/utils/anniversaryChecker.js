import { RELATIONSHIP_START_DATE } from "./calculateDaysTogether";

export const getRelationshipYearCount = (today = new Date()) => {
  const start = new Date(`${RELATIONSHIP_START_DATE}T00:00:00`);
  let years = today.getFullYear() - start.getFullYear();
  const hasPassedThisYear =
    today.getMonth() > start.getMonth() ||
    (today.getMonth() === start.getMonth() && today.getDate() >= start.getDate());

  if (!hasPassedThisYear) {
    years -= 1;
  }

  return Math.max(0, years);
};

export const isAnniversaryDay = (today = new Date()) =>
  today.getMonth() === 11 && today.getDate() === 8;

export const isMonthsaryDay = (today = new Date()) => today.getDate() === 8;
