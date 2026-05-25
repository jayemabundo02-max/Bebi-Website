import api from "./api.js";


export const getSongs = async (params = {}) => {
  const { data } = await api.get("/songs", { params });
  return data.songs;
};

export const createSong = async (formData) => {
  const { data } = await api.post("/songs", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data.song;
};

export const updateSong = async (id, payload) => {
  const { data } = await api.patch(`/songs/${id}`, payload);
  return data.song;
};

export const deleteSong = async (id) => {
  const { data } = await api.delete(`/songs/${id}`);
  return data;
};
