import api from "./api.js";


export const loginRequest = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const getProfileRequest = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
