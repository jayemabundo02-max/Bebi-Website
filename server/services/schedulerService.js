import cron from "node-cron";
import { runAnniversaryJob } from "../jobs/anniversaryJob.js";
import { runMonthsaryJob } from "../jobs/monthsaryJob.js";

export const startSchedulers = () => {
  const timezone = process.env.SCHEDULER_TIMEZONE || "Asia/Singapore";

  const monthsaryTask = cron.schedule(
    "0 9 8 * *",
    () => {
      runMonthsaryJob().catch((error) => console.error("Monthsary job failed:", error));
    },
    { timezone }
  );

  const anniversaryTask = cron.schedule(
    "0 9 8 12 *",
    () => {
      runAnniversaryJob().catch((error) => console.error("Anniversary job failed:", error));
    },
    { timezone }
  );

  return [monthsaryTask, anniversaryTask];
};
