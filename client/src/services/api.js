import axios from "axios";

const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "http://localhost:5000/api";
  }

  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:5000/api`;
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || getDefaultApiBaseUrl();
export const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bebi_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export const resolveFileUrl = (url) => {
  if (!url) {
    return "";
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `${SERVER_BASE_URL}${url}`;
};

export default api;
