import { handleDailyRelationshipEvents } from "../services/anniversaryScheduler.js";

export const runAnniversaryJob = async () => {
  return handleDailyRelationshipEvents();
};
