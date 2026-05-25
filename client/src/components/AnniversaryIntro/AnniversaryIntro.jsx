import { motion } from "framer-motion";
import "./AnniversaryIntro.css";

const AnniversaryIntro = ({ yearCount = 0, isAnniversary = false }) => {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className={`anniversary-intro glass-card ${isAnniversary ? "active" : ""}`}
      initial={{ opacity: 0, y: 16 }}
    >
      <p className="card-kicker">December 8</p>
      <h2>{isAnniversary ? "Anniversary mode is live" : "Anniversary mode"}</h2>
      <p>
        Year {yearCount} is tracked here with a recap, countdowns, and automatic relationship
        notifications.
      </p>
    </motion.section>
  );
};

export default AnniversaryIntro;
