export const getErrorMessage = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.message || error?.message || fallback;

export const buildUploadUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  return apiBaseUrl.replace(/\/api\/?$/, "") + url;
};
