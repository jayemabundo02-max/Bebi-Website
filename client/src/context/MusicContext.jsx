import { useMusic } from "../hooks/useMusic.js";

import { createContext, useContext } from "react";

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const music = useMusic();
  return <MusicContext.Provider value={music}>{children}</MusicContext.Provider>;
};

export const useMusicContext = () => useContext(MusicContext);
