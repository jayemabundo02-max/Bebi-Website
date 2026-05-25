import api from "./api";

export const getMemories = async (params = {}) => {
  const { data } = await api.get("/memories", { params });
  return data;
};

export const createMemory = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await api.post("/memories", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const deleteMemory = async (id) => {
  const { data } = await api.delete(`/memories/${id}`);
  return data;
};
