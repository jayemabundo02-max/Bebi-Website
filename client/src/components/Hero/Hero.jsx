import { motion } from "framer-motion";
import CountdownTimer from "../CountdownTimer/CountdownTimer.jsx";
import "./Hero.css";

const Hero = ({ daysTogether, nextMonthsary }) => {
  return (
    <section className="hero">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="hero-copy"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Private relationship archive</p>
        <h1>Bebi Website</h1>
        <p className="hero-lead">
          A soft, private place for the songs, letters, photos, and little milestones that
          make your story feel alive.
        </p>
        <div className="hero-stats">
          <span>
            <strong>{daysTogether}</strong>
            days together
          </span>
          <span>
            <strong>Dec 8</strong>
            anniversary date
          </span>
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <CountdownTimer targetDate={nextMonthsary} />
      </motion.div>
    </section>
  );
};

export default Hero;
