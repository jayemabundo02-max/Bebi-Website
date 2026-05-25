import api from "./api.js";


export const getNotifications = async (params = {}) => {
  const { data } = await api.get("/notifications", { params });
  return data.notifications;
};

export const markNotificationRead = async (id) => {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data.notification;
};
