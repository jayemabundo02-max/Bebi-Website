import { useCallback, useEffect, useMemo, useState } from "react";
import { sampleMessages } from "../data/messages";
import { getMessages } from "../services/messageService";

export const useMessage = (params = {}) => {
  const queryKey = JSON.stringify(params);
  const query = useMemo(() => JSON.parse(queryKey), [queryKey]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getMessages(query);
      setMessages(response.data);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Using sample messages until the API is ready.");
      setMessages(sampleMessages);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return { error, isLoading, loadMessages, messages };
};
