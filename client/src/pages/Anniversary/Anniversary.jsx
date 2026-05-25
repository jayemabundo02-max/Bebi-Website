import { useAnniversary } from "../../hooks/useAnniversary";
import { calculateDaysTogether } from "../../utils/calculateDaysTogether";

export default function Anniversary() {
  const { daysUntilMonthsary, isAnniversary, isMonthsary, relationshipYears } = useAnniversary();

  return (
    <main className="page-shell">
      <section className={isAnniversary ? "page-hero anniversary-page" : "page-hero compact"}>
        <p className="eyebrow">Special dates</p>
        <h1>{isAnniversary ? "Happy Anniversary" : "Anniversary System"}</h1>
        <p>
          December 8 activates yearly celebration mode. Every 8th day activates monthsary mode and
          notification scheduling.
        </p>
      </section>

      <section className="stats-grid">
        <article className="glass-card stat-card">
          <span>Days together</span>
          <strong>{calculateDaysTogether()}</strong>
        </article>
        <article className="glass-card stat-card">
          <span>Completed years</span>
          <strong>{relationshipYears}</strong>
        </article>
        <article className="glass-card stat-card">
          <span>Days to monthsary</span>
          <strong>{daysUntilMonthsary}</strong>
        </article>
        <article className="glass-card stat-card">
          <span>Current mode</span>
          <strong>{isAnniversary ? "Anniversary" : isMonthsary ? "Monthsary" : "Archive"}</strong>
        </article>
      </section>

      <section className="glass-card recap-card">
        <p className="eyebrow">Recap ready</p>
        <h2>Yearly memories can be filtered by date</h2>
        <p>
          The backend stores month keys and indexed dates across songs, messages, gallery photos,
          memories, and timeline events. That keeps future anniversary recaps fast even when the
          archive grows.
        </p>
      </section>
    </main>
  );
}
