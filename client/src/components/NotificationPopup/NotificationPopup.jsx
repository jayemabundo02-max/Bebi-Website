import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../context/NotificationContext.jsx";
import "./NotificationPopup.css";

const NotificationPopup = () => {
  const { toast } = useNotification();

  return (
    <AnimatePresence>
      {toast ? (
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className={`notification-popup ${toast.type}`}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
        >
          {toast.message}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
};

export default NotificationPopup;
