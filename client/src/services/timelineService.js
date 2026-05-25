import api from "./api";

export const getTimelineEvents = async (params = {}) => {
  const { data } = await api.get("/timeline", { params });
  return data;
};

export const createTimelineEvent = async (payload) => {
  const { data } = await api.post("/timeline", payload);
  return data;
};
