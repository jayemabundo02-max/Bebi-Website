import api from "./api";

export const getGalleryItems = async (params = {}) => {
  const { data } = await api.get("/gallery", { params });
  return data;
};

export const createGalleryItem = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const { data } = await api.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

export const deleteGalleryItem = async (id) => {
  const { data } = await api.delete(`/gallery/${id}`);
  return data;
};
