export const RELATIONSHIP_START_DATE =
  import.meta.env.VITE_RELATIONSHIP_START_DATE || "2024-12-08";

export const calculateDaysTogether = (startDate = RELATIONSHIP_START_DATE) => {
  const start = new Date(`${startDate}T00:00:00`);
  const now = new Date();

  if (Number.isNaN(start.getTime())) {
    return 0;
  }

  const diff = now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor(diff / 86400000));
};
