import { useCallback, useEffect, useState } from "react";

export const useAsyncResource = (loader, fallback = []) => {
  const [items, setItems] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await loader();
      setItems(result);
    } catch (requestError) {
      setError(requestError.message);
      setItems(fallback);
    } finally {
      setLoading(false);
    }
  }, [fallback, loader]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, setItems, loading, error, refresh };
};
