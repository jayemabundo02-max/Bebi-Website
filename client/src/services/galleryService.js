import api from "./api.js";


export const getGallery = async (params = {}) => {
  const { data } = await api.get("/gallery", { params });
  return data.gallery;
};

export const createGalleryItem = async (formData) => {
  const { data } = await api.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data.item;
};

export const updateGalleryItem = async (id, payload) => {
  const { data } = await api.patch(`/gallery/${id}`, payload);
  return data.item;
};

export const deleteGalleryItem = async (id) => {
  const { data } = await api.delete(`/gallery/${id}`);
  return data;
};
