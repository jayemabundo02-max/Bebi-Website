import { useCallback, useEffect, useMemo, useState } from "react";
import { sampleSongs } from "../data/songs";
import { getSongs } from "../services/musicService";

export const useMusic = (params = {}) => {
  const queryKey = JSON.stringify(params);
  const query = useMemo(() => JSON.parse(queryKey), [queryKey]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSongs = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getSongs(query);
      setSongs(response.data);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Using sample songs until the API is ready.");
      setSongs(sampleSongs);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  return { error, isLoading, loadSongs, songs };
};
