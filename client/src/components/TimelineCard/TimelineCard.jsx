import { formatDate } from "../../utils/formatDate.js";
import "./TimelineCard.css";

const TimelineCard = ({ event }) => {
  return (
    <article className="timeline-card glass-card">
      <span className="timeline-dot" />
      <p className="card-kicker">{event.type}</p>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <time>{formatDate(event.eventDate || event.relationshipDate)}</time>
    </article>
  );
};

export default TimelineCard;
