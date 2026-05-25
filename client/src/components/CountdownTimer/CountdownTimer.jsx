import { useEffect, useState } from "react";
import "./CountdownTimer.css";

const getTimeParts = (targetDate) => {
  const target = new Date(targetDate).getTime();
  const distance = Math.max(0, target - Date.now());

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
};

const CountdownTimer = ({ targetDate, label = "Next monthsary" }) => {
  const [parts, setParts] = useState(() => getTimeParts(targetDate));

  useEffect(() => {
    const interval = window.setInterval(() => setParts(getTimeParts(targetDate)), 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="countdown glass-card">
      <p>{label}</p>
      <div className="countdown-grid">
        {Object.entries(parts).map(([key, value]) => (
          <span key={key}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <small>{key}</small>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
