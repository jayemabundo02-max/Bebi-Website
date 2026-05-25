import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";

export default function NotificationPopup() {
  const { clearNotification, notification } = useNotification();

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(clearNotification, 4200);
    return () => window.clearTimeout(timeoutId);
  }, [clearNotification, notification]);

  return (
    <AnimatePresence>
      {notification ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={`toast toast-${notification.tone}`}
          exit={{ opacity: 0, y: -16 }}
          initial={{ opacity: 0, y: -16 }}
          role="status"
        >
          <strong>{notification.title}</strong>
          <span>{notification.message}</span>
          <button aria-label="Dismiss notification" onClick={clearNotification} type="button">
            x
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
