import api from "./api.js";


export const getTimelineEvents = async (params = {}) => {
  const { data } = await api.get("/timeline", { params });
  return data.events;
};

export const createTimelineEvent = async (payload) => {
  const { data } = await api.post("/timeline", payload);
  return data.event;
};
