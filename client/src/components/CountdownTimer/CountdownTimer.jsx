import { useEffect, useMemo, useState } from "react";
import { getNextMonthsary } from "../../utils/generateMonthsary";

const getTimeParts = (targetDate) => {
  const distance = Math.max(0, targetDate.getTime() - Date.now());

  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
};

export default function CountdownTimer() {
  const targetDate = useMemo(() => getNextMonthsary(), []);
  const [parts, setParts] = useState(() => getTimeParts(targetDate));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setParts(getTimeParts(targetDate));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [targetDate]);

  return (
    <div className="countdown" aria-label="Countdown to next monthsary">
      {Object.entries(parts).map(([label, value]) => (
        <span key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <small>{label}</small>
        </span>
      ))}
    </div>
  );
}
