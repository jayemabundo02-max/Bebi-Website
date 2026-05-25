export const getErrorMessage = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.message || error?.message || fallback;

export const buildUploadUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  return apiBaseUrl.replace(/\/api\/?$/, "") + url;
};
export const classNames = (...values) => values.filter(Boolean).join(" ");

export const groupByMonth = (items, dateKey = "createdAt") => {
  return items.reduce((groups, item) => {
    const date = new Date(item[dateKey] || item.date || item.uploadDate);
    const key = Number.isNaN(date.getTime())
      ? "Undated"
      : `${date.toLocaleString("en", { month: "long" })} ${date.getFullYear()}`;
    return {
      ...groups,
      [key]: [...(groups[key] || []), item]
    };
  }, {});
};
