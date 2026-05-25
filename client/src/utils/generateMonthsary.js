export const getNextMonthsary = (fromDate = new Date()) => {
  const next = new Date(fromDate);
  next.setHours(0, 0, 0, 0);

  if (next.getDate() >= 8) {
    next.setMonth(next.getMonth() + 1);
  }

  next.setDate(8);
  return next;
};

export const getDaysUntilNextMonthsary = (fromDate = new Date()) => {
  const start = new Date(fromDate);
  start.setHours(0, 0, 0, 0);
  const next = getNextMonthsary(start);

  return Math.ceil((next - start) / 86400000);
};
