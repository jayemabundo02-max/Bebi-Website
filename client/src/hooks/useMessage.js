import { useCallback } from "react";
import { fallbackMessages } from "../data/messages.js";
import { getMessages } from "../services/messageService.js";

import { useAsyncResource } from "./useAsyncResource.js";

export const useMessage = () => {
  const loader = useCallback(() => getMessages(), []);
  return useAsyncResource(loader, fallbackMessages);
};
