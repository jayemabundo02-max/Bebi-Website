import { useCallback } from "react";
import { fallbackGallery } from "../data/gallery.js";
import { getGallery } from "../services/galleryService.js";

import { useAsyncResource } from "./useAsyncResource.js";

export const useGallery = () => {
  const loader = useCallback(() => getGallery(), []);
  return useAsyncResource(loader, fallbackGallery);
};
