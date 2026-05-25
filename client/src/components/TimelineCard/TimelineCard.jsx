import { formatDate } from "../../utils/formatDate";

export default function TimelineCard({ event, index }) {
  return (
    <article className={index % 2 === 0 ? "timeline-card left" : "timeline-card right"}>
      <div className="timeline-dot" aria-hidden="true" />
      <div className="glass-card">
        <p className="eyebrow">{event.type || "Milestone"}</p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <time>{formatDate(event.eventDate)}</time>
      </div>
    </article>
  );
}
