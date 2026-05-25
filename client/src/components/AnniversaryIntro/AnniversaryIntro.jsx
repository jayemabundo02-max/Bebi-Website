import { motion } from "framer-motion";
import { useAnniversary } from "../../hooks/useAnniversary";

export default function AnniversaryIntro() {
  const { isAnniversary, isMonthsary, relationshipYears } = useAnniversary();

  if (!isAnniversary && !isMonthsary) {
    return null;
  }

  return (
    <motion.section
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card anniversary-banner"
      initial={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <p className="eyebrow">{isAnniversary ? "Anniversary mode" : "Monthsary mode"}</p>
      <h2>{isAnniversary ? `Happy year ${relationshipYears}` : "Happy monthsary"}</h2>
      <p>
        Today gets the special theme: a softer glow, a little more motion, and a reminder to save
        one new piece of the story.
      </p>
    </motion.section>
  );
}
