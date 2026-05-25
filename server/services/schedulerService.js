import { handleDailyRelationshipEvents } from "./anniversaryScheduler.js";

import cron from "node-cron";

export const startSchedulers = () => {
  if (process.env.NODE_ENV === "test") {
    return [];
  }

  const jobs = [
    cron.schedule("5 8 * * *", () => {
      handleDailyRelationshipEvents().catch((error) => {
        console.error(`Relationship scheduler failed: ${error.message}`);
      });
    })
  ];

  console.log("Relationship schedulers registered.");
  return jobs;
};
