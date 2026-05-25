import { useCallback } from "react";
import { getRelationshipStatus } from "../services/anniversaryService.js";

import { useAsyncResource } from "./useAsyncResource.js";

export const useAnniversary = () => {
  const loader = useCallback(() => getRelationshipStatus(), []);
  return useAsyncResource(loader, null);
};
