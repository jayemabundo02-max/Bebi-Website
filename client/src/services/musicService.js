import api from "./api";

export const getSongs = async (params = {}) => {
  const { data } = await api.get("/songs", { params });
  return data;
};

export const createSong = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await api.post("/songs", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const deleteSong = async (id) => {
  const { data } = await api.delete(`/songs/${id}`);
  return data;
};
