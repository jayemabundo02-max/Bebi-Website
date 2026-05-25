import api from "./api";

export const login = async (accessCode) => {
  const { data } = await api.post("/auth/login", { accessCode });
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
