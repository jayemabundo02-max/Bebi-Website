import { useGallery } from "../hooks/useGallery.js";

import { createContext, useContext } from "react";

const GalleryContext = createContext(null);

export const GalleryProvider = ({ children }) => {
  const gallery = useGallery();
  return <GalleryContext.Provider value={gallery}>{children}</GalleryContext.Provider>;
};

export const useGalleryContext = () => useContext(GalleryContext);
