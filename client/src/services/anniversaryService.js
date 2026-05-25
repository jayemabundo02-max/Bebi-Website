import api from "./api";

export const getRelationshipEvents = async () => {
  const { data } = await api.get("/anniversary");
  return data;
};

export const getAnniversaryStatus = async () => {
  const { data } = await api.get("/anniversary/status");
  return data;
};
