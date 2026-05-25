import { getNextMonthsary } from "../../utils/generateMonthsary.js";
import { formatDate } from "../../utils/formatDate.js";
import "./SharedCalendar.css";

const SharedCalendar = () => {
  const nextMonthsary = getNextMonthsary();
  const nextAnniversary = new Date(new Date().getFullYear(), 11, 8);

  if (nextAnniversary < new Date()) {
    nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
  }

  return (
    <section className="shared-calendar glass-card">
      <h2>Relationship Calendar</h2>
      <div>
        <span>
          <strong>Next monthsary</strong>
          {formatDate(nextMonthsary)}
        </span>
        <span>
          <strong>Next anniversary</strong>
          {formatDate(nextAnniversary)}
        </span>
      </div>
    </section>
  );
};

export default SharedCalendar;
