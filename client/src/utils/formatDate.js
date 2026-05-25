export const formatDate = (date, options = {}) => {
  if (!date) return "No date";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options
  }).format(parsed);
};

export const getMonthKey = (date = new Date()) => {
  const parsed = new Date(date);
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};
