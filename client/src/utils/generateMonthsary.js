export const getNextMonthsary = (fromDate = new Date(), day = 8) => {
  const now = new Date(fromDate);
  const next = new Date(now.getFullYear(), now.getMonth(), day, 0, 0, 0, 0);

  if (next <= now) {
    next.setMonth(next.getMonth() + 1);
  }

  return next;
};

export const isMonthsaryToday = (fromDate = new Date(), day = 8) => {
  return new Date(fromDate).getDate() === day;
};
