import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { calculateDaysTogether } from "../../utils/calculateDaysTogether";
import { useAnniversary } from "../../hooks/useAnniversary";

const hearts = Array.from({ length: 16 }, (_, index) => index);

export default function Hero() {
  const { daysUntilMonthsary, isAnniversary, isMonthsary, relationshipYears } = useAnniversary();
  const daysTogether = calculateDaysTogether();

  return (
    <section className={isAnniversary || isMonthsary ? "hero celebration-mode" : "hero"}>
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span key={heart} style={{ "--delay": `${heart * 0.35}s`, "--left": `${8 + heart * 6}%` }} />
        ))}
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="eyebrow">Private relationship memory archive</p>
        <h1>Bebi Website</h1>
        <p className="hero-copy">
          A soft, private space for our songs, messages, pictures, milestones, and monthly letters.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/memories">
            Add a memory
          </Link>
          <Link className="ghost-button" to="/songs">
            Open songs
          </Link>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="hero-panel glass-card"
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <span className="metric-label">Days together</span>
          <strong>{daysTogether}</strong>
        </div>
        <div>
          <span className="metric-label">Years archived</span>
          <strong>{relationshipYears}</strong>
        </div>
        <div>
          <span className="metric-label">Next monthsary</span>
          <strong>{daysUntilMonthsary}d</strong>
        </div>
        <CountdownTimer />
      </motion.div>
    </section>
  );
}
