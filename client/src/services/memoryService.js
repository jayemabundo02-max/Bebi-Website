import api from "./api.js";


export const getMemories = async (params = {}) => {
  const { data } = await api.get("/memories", { params });
  return data.memories;
};

export const createMemory = async (formData) => {
  const { data } = await api.post("/memories", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data.memory;
};

export const updateMemory = async (id, payload) => {
  const { data } = await api.patch(`/memories/${id}`, payload);
  return data.memory;
};

export const deleteMemory = async (id) => {
  const { data } = await api.delete(`/memories/${id}`);
  return data;
};
