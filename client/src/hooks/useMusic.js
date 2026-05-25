import { useCallback } from "react";
import { fallbackSongs } from "../data/songs.js";
import { getSongs } from "../services/musicService.js";

import { useAsyncResource } from "./useAsyncResource.js";

export const useMusic = () => {
  const loader = useCallback(() => getSongs(), []);
  return useAsyncResource(loader, fallbackSongs);
};
