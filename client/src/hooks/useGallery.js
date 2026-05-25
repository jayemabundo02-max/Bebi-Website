import { useCallback, useEffect, useMemo, useState } from "react";
import { sampleGallery } from "../data/gallery";
import { getGalleryItems } from "../services/galleryService";

export const useGallery = (params = {}) => {
  const queryKey = JSON.stringify(params);
  const query = useMemo(() => JSON.parse(queryKey), [queryKey]);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadGallery = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getGalleryItems(query);
      setGallery(response.data);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Using sample gallery until the API is ready.");
      setGallery(sampleGallery);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  return { error, gallery, isLoading, loadGallery };
};
