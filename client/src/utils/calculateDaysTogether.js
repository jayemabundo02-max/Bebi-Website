export const RELATIONSHIP_START_DATE =
  import.meta.env.VITE_RELATIONSHIP_START_DATE || "2024-12-08";

export const calculateDaysTogether = (startDate = RELATIONSHIP_START_DATE) => {
  const start = new Date(startDate);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;

  if (Number.isNaN(start.getTime())) {
    return 0;
  }

  return Math.max(0, Math.floor((now - start) / dayMs));
};
