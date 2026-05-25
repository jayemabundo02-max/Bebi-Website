import api from "./api.js";


export const getMessages = async (params = {}) => {
  const { data } = await api.get("/messages", { params });
  return data.messages;
};

export const createMessage = async (payload) => {
  const { data } = await api.post("/messages", payload);
  return data.message;
};

export const updateMessage = async (id, payload) => {
  const { data } = await api.patch(`/messages/${id}`, payload);
  return data.message;
};

export const deleteMessage = async (id) => {
  const { data } = await api.delete(`/messages/${id}`);
  return data;
};
