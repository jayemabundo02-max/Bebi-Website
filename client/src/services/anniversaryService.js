import api from "./api.js";


export const getRelationshipStatus = async () => {
  const { data } = await api.get("/anniversary/status");
  return data;
};
