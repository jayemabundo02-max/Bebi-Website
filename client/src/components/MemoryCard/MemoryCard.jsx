import { resolveFileUrl } from "../../services/api.js";
import { formatDate } from "../../utils/formatDate.js";
import "./MemoryCard.css";

const MemoryCard = ({ memory }) => {
  return (
    <article className="memory-card glass-card">
      {memory.imageUrl ? (
        <img alt={memory.title} src={resolveFileUrl(memory.imageUrl)} />
      ) : (
        <div className="memory-placeholder" />
      )}
      <div>
        <p className="card-kicker">{memory.milestoneType}</p>
        <h3>{memory.title}</h3>
        <p>{memory.caption}</p>
        <time>{formatDate(memory.date || memory.relationshipDate)}</time>
      </div>
    </article>
  );
};

export default MemoryCard;
