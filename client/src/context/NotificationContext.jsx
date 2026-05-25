import { createContext, useCallback, useContext, useMemo, useState } from "react";


const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "info") => {
    setToast({ id: Date.now(), message, type });
    window.setTimeout(() => setToast(null), 3600);
  }, []);

  const value = useMemo(() => ({ toast, notify }), [notify, toast]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (!value) {
    throw new Error("useNotification must be used inside NotificationProvider.");
  }

  return value;
};
