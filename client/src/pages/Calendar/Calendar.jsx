import SharedCalendar from "../../components/SharedCalendar/SharedCalendar";

export default function Calendar() {
  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Relationship calendar</p>
        <h1>Calendar</h1>
        <p>Track recurring monthsary and anniversary dates used by the scheduler.</p>
      </section>
      <SharedCalendar />
    </main>
  );
}
