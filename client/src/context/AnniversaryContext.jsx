import { useAnniversary } from "../hooks/useAnniversary.js";

import { createContext, useContext } from "react";

const AnniversaryContext = createContext(null);

export const AnniversaryProvider = ({ children }) => {
  const anniversary = useAnniversary();
  return <AnniversaryContext.Provider value={anniversary}>{children}</AnniversaryContext.Provider>;
};

export const useAnniversaryContext = () => useContext(AnniversaryContext);
