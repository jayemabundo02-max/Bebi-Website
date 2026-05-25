import { handleDailyRelationshipEvents } from "../services/anniversaryScheduler.js";

export const runMonthsaryJob = async () => {
  return handleDailyRelationshipEvents();
};
