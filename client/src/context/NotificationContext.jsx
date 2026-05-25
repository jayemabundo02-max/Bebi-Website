import { createContext, useCallback, useMemo, useState } from "react";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((payload) => {
    setNotification({
      id: crypto.randomUUID(),
      tone: "info",
      ...payload
    });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const value = useMemo(
    () => ({ clearNotification, notification, showNotification }),
    [clearNotification, notification, showNotification]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
