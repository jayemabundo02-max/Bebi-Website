import { getNextMonthsary } from "../../utils/generateMonthsary";
import { formatDate } from "../../utils/formatDate";

export default function SharedCalendar() {
  const nextMonthsary = getNextMonthsary();
  const anniversary = new Date(`${new Date().getFullYear()}-12-08T00:00:00`);

  return (
    <section className="calendar-grid">
      <article className="glass-card">
        <p className="eyebrow">Next monthsary</p>
        <h3>{formatDate(nextMonthsary, { weekday: "long" })}</h3>
        <p>Automatic greeting and notification job run every 8th day when the server is online.</p>
      </article>
      <article className="glass-card">
        <p className="eyebrow">Anniversary</p>
        <h3>{formatDate(anniversary, { weekday: "long" })}</h3>
        <p>December 8 turns on anniversary mode, recap content, and yearly notification delivery.</p>
      </article>
    </section>
  );
}
