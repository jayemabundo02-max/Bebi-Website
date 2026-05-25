export const getMonthKey = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export const getNextMonthsary = (fromDate = new Date(), day = 8) => {
  const date = new Date(fromDate);
  const target = new Date(date.getFullYear(), date.getMonth(), day, 0, 0, 0, 0);

  if (target <= date) {
    target.setMonth(target.getMonth() + 1);
  }

  return target;
};

export const getAnniversaryDetails = (fromDate = new Date()) => {
  const anniversaryMonth = Number(process.env.ANNIVERSARY_MONTH || 12) - 1;
  const anniversaryDay = Number(process.env.ANNIVERSARY_DAY || 8);
  const startDate = new Date(process.env.RELATIONSHIP_START_DATE || "2024-12-08");
  const now = new Date(fromDate);
  const anniversaryDate = new Date(now.getFullYear(), anniversaryMonth, anniversaryDay);
  const yearCount = Math.max(0, now.getFullYear() - startDate.getFullYear());

  return {
    isToday:
      now.getMonth() === anniversaryMonth &&
      now.getDate() === anniversaryDay,
    anniversaryDate,
    yearCount
  };
};
