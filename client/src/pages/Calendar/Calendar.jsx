import SharedCalendar from "../../components/SharedCalendar/SharedCalendar.jsx";
import "./Calendar.css";

const Calendar = () => {
  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Dates</p>
        <h1>Calendar</h1>
        <p>Important relationship dates and upcoming monthly milestones.</p>
      </header>
      <SharedCalendar />
    </section>
  );
};

export default Calendar;
